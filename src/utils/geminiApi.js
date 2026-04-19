const API_KEY = import.meta.env.VITE_GROQ_API_KEY;
const API_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = "llama-3.3-70b-versatile";

async function callGroq(systemPrompt, userContent) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userContent },
      ],
      temperature: 0.9,
      max_tokens: 1024,
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error?.message || "Groq API request failed");
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || "No response generated.";
}

/**
 * Generate a brutal roast of the CV
 */
export async function generateRoast(cvText) {
  const systemPrompt =
    "You are a brutally honest, witty, sarcastic career coach. Roast this CV like a comedian — be funny but not mean. Point out every weak point, vague claim, and cringe phrase. Keep it under 300 words.";
  return callGroq(systemPrompt, cvText);
}

/**
 * Generate actionable improvement tips
 */
export async function generateTips(cvText) {
  const systemPrompt =
    "Now give 5 specific, actionable improvement tips for this CV. Be direct and helpful. Format each tip with a number and bold title.";
  return callGroq(systemPrompt, cvText);
}
