import React from "react";
import { generateSpeech } from "../utils/elevenLabsApi.js";

export default function ResultTabs({ roast, tips, onReset }) {
  const [activeTab, setActiveTab] = React.useState("roast");
  const [audioUrl, setAudioUrl] = React.useState(null);
  const [isGeneratingAudio, setIsGeneratingAudio] = React.useState(false);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const audioRef = React.useRef(null);

  async function handlePlayRoast() {
    if (audioUrl) {
      if (isPlaying) {
        audioRef.current?.pause();
        setIsPlaying(false);
      } else {
        audioRef.current?.play();
        setIsPlaying(true);
      }
      return;
    }

    setIsGeneratingAudio(true);
    try {
      const url = await generateSpeech(roast);
      setAudioUrl(url);
      const audio = new Audio(url);
      audioRef.current = audio;
      audio.onended = () => setIsPlaying(false);
      audio.play();
      setIsPlaying(true);
    } catch (err) {
      console.error("Audio generation failed:", err);
      alert("Voice roast failed. Check your ElevenLabs API key.");
    } finally {
      setIsGeneratingAudio(false);
    }
  }

  function handleShare() {
    const text = encodeURIComponent(
      "I just got my CV roasted by AI 🔥😂 Try it yourself at RoastMyCV!"
    );
    window.open(`https://twitter.com/intent/tweet?text=${text}`, "_blank");
  }

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-card rounded-3xl shadow-xl overflow-hidden animate-slide-up">
          {/* Tab header */}
          <div className="flex border-b border-bg">
            <button
              onClick={() => setActiveTab("roast")}
              className={`flex-1 py-4 px-6 text-sm font-semibold transition-colors duration-200 ${
                activeTab === "roast"
                  ? "text-roast border-b-2 border-roast bg-roast/5"
                  : "text-text-secondary hover:text-text"
              }`}
            >
              🔥 The Roast
            </button>
            <button
              onClick={() => setActiveTab("tips")}
              className={`flex-1 py-4 px-6 text-sm font-semibold transition-colors duration-200 ${
                activeTab === "tips"
                  ? "text-tips border-b-2 border-tips bg-tips/5"
                  : "text-text-secondary hover:text-text"
              }`}
            >
              💡 Fix It
            </button>
          </div>

          {/* Tab content */}
          <div className="p-6 sm:p-8 min-h-[300px]">
            {activeTab === "roast" ? (
              <div className="animate-fade-in">
                <div className="prose prose-sm max-w-none">
                  <p className="text-roast/90 leading-relaxed whitespace-pre-wrap text-[15px]">
                    {roast}
                  </p>
                </div>
              </div>
            ) : (
              <div className="animate-fade-in">
                <div className="prose prose-sm max-w-none">
                  <p className="text-tips/90 leading-relaxed whitespace-pre-wrap text-[15px]">
                    {tips}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="px-6 sm:px-8 pb-6 flex flex-wrap gap-3">
            <button
              onClick={handlePlayRoast}
              disabled={isGeneratingAudio}
              className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGeneratingAudio ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Generating...
                </>
              ) : isPlaying ? (
                <>⏸ Pause Roast</>
              ) : (
                <>🎙️ {audioUrl ? "Play" : "Voice"} Roast</>
              )}
            </button>

            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#1DA1F2] text-white rounded-xl text-sm font-medium hover:bg-[#1a8cd8] transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              Share on X
            </button>

            <button
              onClick={onReset}
              className="flex items-center gap-2 px-5 py-2.5 bg-bg text-text-secondary rounded-xl text-sm font-medium hover:bg-primary/10 hover:text-primary transition-colors ml-auto"
            >
              ↩ Roast Another
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
