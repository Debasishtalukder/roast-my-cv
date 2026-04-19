const API_KEY = import.meta.env.VITE_ELEVENLABS_API_KEY;
const VOICE_ID = "21m00Tcm4TlvDq8ikWAM"; // Rachel voice

/**
 * Generate speech audio from text using ElevenLabs TTS
 * Returns an audio URL (blob URL) that can be played in the browser
 */
export async function generateSpeech(text) {
  const response = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
    {
      method: "POST",
      headers: {
        "xi-api-key": API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text,
        model_id: "eleven_turbo_v2_5",
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75,
        },
      }),
    }
  );

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.detail?.message || "ElevenLabs API request failed");
  }

  const audioBlob = await response.blob();
  return URL.createObjectURL(audioBlob);
}
