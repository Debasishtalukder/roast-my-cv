import React from "react";
import { LiquidMetalButton } from "./ui/liquid-metal-button.jsx";

const funnyMessages = ["Reading your CV...", "Cringing already...", "Finding the weak spots...", "Preparing the roast...", "This is going to hurt...", "Almost done judging you..."];

export default function UploadSection({ onFileSelect, isLoading }) {
  const [isDragging, setIsDragging] = React.useState(false);
  const [msgIdx, setMsgIdx] = React.useState(0);
  const fileInputRef = React.useRef(null);

  React.useEffect(() => {
    if (!isLoading) return;
    const i = setInterval(() => setMsgIdx((p) => (p + 1) % funnyMessages.length), 2000);
    return () => clearInterval(i);
  }, [isLoading]);

  if (isLoading) {
    return (
      <section id="upload" className="py-24 px-4 sm:px-6 lg:px-8" style={{ background: "linear-gradient(135deg, #EEF2FF, #F5F0FF)" }}>
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-card rounded-3xl p-12 border border-border" style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.08)" }}>
            <div className="w-20 h-20 mx-auto mb-6 relative">
              <div className="absolute inset-0 rounded-full border-4 border-primary/20" />
              <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary animate-spin-slow" />
              <div className="absolute inset-0 flex items-center justify-center text-3xl">🔥</div>
            </div>
            <p className="text-xl font-semibold text-text animate-pulse">{funnyMessages[msgIdx]}</p>
            <p className="text-sm text-text-muted mt-2">This usually takes 10–20 seconds</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="upload" className="py-24 px-4 sm:px-6 lg:px-8" style={{ background: "linear-gradient(135deg, #EEF2FF, #F5F0FF)" }}>
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4 text-text font-display">
          Ready to Get <span className="animate-ember">Roasted</span>?
        </h2>
        <p className="text-text-body text-center mb-10">Upload your CV below and brace yourself.</p>

        <div
          className={`rounded-3xl border-2 border-dashed transition-all duration-300 cursor-pointer p-12 text-center ${
            isDragging ? "border-primary bg-primary/5 scale-[1.02]" : "border-[#CBD5E1] bg-card hover:border-primary hover:bg-card-hover"
          }`}
          style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.08)" }}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={(e) => { e.preventDefault(); setIsDragging(false); }}
          onDrop={(e) => { e.preventDefault(); setIsDragging(false); const f = e.dataTransfer.files[0]; if (f) onFileSelect(f); }}
          onClick={() => fileInputRef.current?.click()}
          role="button" tabIndex={0} aria-label="Upload your CV"
          onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") fileInputRef.current?.click(); }}
        >
          <input ref={fileInputRef} type="file" accept=".pdf,.docx,.doc" className="hidden" onChange={(e) => { const f = e.target.files[0]; if (f) onFileSelect(f); }} />
          <div className="flex flex-col items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
              <svg className="w-10 h-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
              </svg>
            </div>
            <p className="text-lg font-semibold text-text">{isDragging ? "Drop it like it's hot! 🔥" : "Drag & drop your CV here"}</p>
            <p className="text-sm text-text-muted">Supports PDF & DOCX • Max 10MB</p>
          </div>
        </div>

        <div className="text-center mt-6">
          <LiquidMetalButton label="🔥 Upload & Get Roasted" onClick={() => fileInputRef.current?.click()} />
        </div>
      </div>
    </section>
  );
}
