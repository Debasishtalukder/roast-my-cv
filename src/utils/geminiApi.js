const API_KEY = import.meta.env.VITE_GROQ_API_KEY;
const API_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = "llama-3.3-70b-versatile";

async function callGroq(systemPrompt, userContent, jsonMode = false) {
  const body = {
    model: MODEL,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userContent },
    ],
    temperature: 0.9,
    max_tokens: 2048,
  };

  if (jsonMode) {
    body.response_format = { type: "json_object" };
  }

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error?.message || "Groq API request failed");
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || "No response generated.";
}

/**
 * Generate structured roast data with individual roast cards and a severity score.
 * Returns: { score, roastText, cards: [{ quote, burn, severity }], highlights: [string] }
 */
export async function generateRoast(cvText) {
  const systemPrompt = `You are a brutally honest, witty, sarcastic career coach. Roast this CV like a comedian — be funny but not mean.

Return a JSON object with this exact structure:
{
  "score": <number 0-100, how brutal the roast is — higher = worse CV>,
  "roastText": "<full roast as a single paragraph, under 250 words>",
  "cards": [
    {
      "quote": "<exact short phrase from the CV being roasted>",
      "burn": "<the roast/burn comment about that phrase>",
      "severity": <1=mild, 2=medium, 3=brutal>
    }
  ],
  "highlights": ["<exact phrase from CV to highlight as problematic>"]
}

Generate 4-6 roast cards. The "quote" must be actual text from the CV. The "highlights" array should list 4-8 short phrases from the CV that are weak/cringe. Keep it funny.`;

  const raw = await callGroq(systemPrompt, cvText, true);
  try {
    return JSON.parse(raw);
  } catch {
    // Fallback: return unstructured
    return {
      score: 65,
      roastText: raw,
      cards: [{ quote: "Your entire CV", burn: raw, severity: 2 }],
      highlights: [],
    };
  }
}

/**
 * Generate structured improvement tips.
 * Returns: { tips: [{ title, description, priority }] }
 */
export async function generateTips(cvText) {
  const systemPrompt = `Give 5 specific, actionable improvement tips for this CV. Be direct and helpful.

Return a JSON object with this exact structure:
{
  "tips": [
    {
      "title": "<short bold title>",
      "description": "<2-3 sentence actionable advice>",
      "priority": "<high|medium|low>"
    }
  ]
}`;

  const raw = await callGroq(systemPrompt, cvText, true);
  try {
    return JSON.parse(raw);
  } catch {
    return {
      tips: [{ title: "General Improvements", description: raw, priority: "high" }],
    };
  }
}
