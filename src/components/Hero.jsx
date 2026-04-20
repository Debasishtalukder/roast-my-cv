import React from "react";

const FLOATING_EMOJIS = ["🔥", "💀", "😅", "🔥", "💀", "😅", "🔥", "💀"];

function FloatingEmoji({ emoji, delay, left }) {
  return (
    <span
      className="absolute text-2xl sm:text-3xl pointer-events-none select-none opacity-0"
      style={{
        left: `${left}%`,
        bottom: "-40px",
        animation: `float-up ${8 + Math.random() * 6}s linear ${delay}s infinite`,
      }}
      aria-hidden="true"
    >
      {emoji}
    </span>
  );
}

function SocialProofCounter() {
  const [count, setCount] = React.useState(2847);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => prev + Math.floor(Math.random() * 3));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-3 px-5 py-3 rounded-full bg-white/[0.06] border border-white/[0.08] backdrop-blur-sm">
      <span className="text-lg">🔥</span>
      <span className="text-white/80 text-sm font-medium">
        <span className="text-white font-bold tabular-nums">{count.toLocaleString()}</span> CVs roasted this week
      </span>
    </div>
  );
}

function CVMockup() {
  return (
    <div className="relative" style={{ perspective: "800px" }}>
      {/* Shadow */}
      <div
        className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 w-48 h-6 bg-primary/20 rounded-full blur-xl"
        style={{ animation: "cv-shadow 6s ease-in-out infinite" }}
      />
      {/* CV Card */}
      <div className="animate-cv-float" style={{ transformStyle: "preserve-3d" }}>
        <div className="w-56 sm:w-64 bg-gradient-to-br from-[#1a1a2e] to-[#16162a] rounded-2xl p-5 border border-white/[0.08] shadow-2xl shadow-primary/10">
          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-roast" />
            <div className="flex-1">
              <div className="h-2.5 w-20 bg-white/20 rounded-full" />
              <div className="h-2 w-14 bg-white/10 rounded-full mt-1.5" />
            </div>
          </div>
          {/* Content lines */}
          <div className="space-y-2.5 mb-4">
            <div className="h-2 w-full bg-white/10 rounded-full" />
            <div className="h-2 w-4/5 bg-white/10 rounded-full" />
            <div className="h-2 w-full bg-white/10 rounded-full" />
            <div className="h-2 w-3/5 bg-white/10 rounded-full" />
          </div>
          {/* Roast overlay */}
          <div className="bg-roast/10 border border-roast/20 rounded-lg p-2.5 mb-3">
            <p className="text-[9px] text-roast/80 leading-relaxed font-medium">
              "Detail-oriented" — yet you misspelled "experience" twice...
            </p>
          </div>
          {/* Tips overlay */}
          <div className="bg-tips/10 border border-tips/20 rounded-lg p-2.5">
            <p className="text-[9px] text-tips/80 leading-relaxed font-medium">
              ✓ Quantify achievements with real metrics
            </p>
          </div>
          {/* Score badge */}
          <div className="absolute -top-3 -right-3 w-12 h-12 rounded-full bg-gradient-to-br from-roast to-orange-500 flex items-center justify-center shadow-lg shadow-roast/30">
            <span className="text-white text-xs font-bold">3/10</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Hero({ onFileSelect }) {
  const [isDragging, setIsDragging] = React.useState(false);
  const fileInputRef = React.useRef(null);

  function handleDragOver(e) {
    e.preventDefault();
    setIsDragging(true);
  }

  function handleDragLeave(e) {
    e.preventDefault();
    setIsDragging(false);
  }

  function handleDrop(e) {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) onFileSelect(file);
  }

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (file) onFileSelect(file);
  }

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-hero-dark">
      {/* Animated gradient mesh background */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute w-[500px] h-[500px] rounded-full blur-[120px]"
          style={{
            background: "radial-gradient(circle, rgba(124,111,205,0.4) 0%, transparent 70%)",
            top: "10%",
            left: "15%",
            animation: "gradient-mesh-1 12s ease-in-out infinite",
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full blur-[100px]"
          style={{
            background: "radial-gradient(circle, rgba(226,75,74,0.3) 0%, transparent 70%)",
            top: "40%",
            right: "10%",
            animation: "gradient-mesh-2 15s ease-in-out infinite",
          }}
        />
        <div
          className="absolute w-[350px] h-[350px] rounded-full blur-[100px]"
          style={{
            background: "radial-gradient(circle, rgba(255,107,53,0.25) 0%, transparent 70%)",
            bottom: "10%",
            left: "40%",
            animation: "gradient-mesh-3 10s ease-in-out infinite",
          }}
        />
      </div>

      {/* Floating emojis */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {FLOATING_EMOJIS.map((emoji, i) => (
          <FloatingEmoji
            key={i}
            emoji={emoji}
            delay={i * 1.5}
            left={10 + i * 11}
          />
        ))}
      </div>

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 lg:gap-16 items-center px-4 sm:px-6 lg:px-8 py-28">
        {/* Left content */}
        <div className="animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.06] border border-white/[0.08] text-white/60 text-xs font-medium mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-tips animate-pulse" />
            AI-Powered CV Roaster
          </div>

          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold leading-[1.05] tracking-tight">
            <span className="animate-ember">Roast</span>
            <br />
            <span className="text-white">My CV</span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-white/50 max-w-lg leading-relaxed">
            Upload your CV and let AI brutally roast it — then actually fix it.
            No mercy. No filter. Just truth.
          </p>

          {/* Upload dropzone */}
          <div
            className={`mt-10 relative rounded-2xl border-2 border-dashed transition-all duration-500 cursor-pointer p-6 sm:p-8 text-center backdrop-blur-sm ${
              isDragging
                ? "border-roast bg-roast/10 scale-[1.02]"
                : "border-white/[0.12] bg-white/[0.03] hover:bg-white/[0.06] animate-glow-border"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            role="button"
            tabIndex={0}
            aria-label="Upload your CV file"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") fileInputRef.current?.click();
            }}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.docx,.doc"
              className="hidden"
              onChange={handleFileChange}
            />
            <div className="flex flex-col items-center gap-3">
              <div className="w-14 h-14 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center">
                <svg className="w-7 h-7 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                </svg>
              </div>
              <p className="font-medium text-white/80">
                {isDragging ? "Drop it like it's hot! 🔥" : "Drag & drop your CV here"}
              </p>
              <p className="text-sm text-white/30">PDF & DOCX supported</p>
            </div>
          </div>

          {/* CTA Button */}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="mt-6 group relative px-8 py-4 rounded-xl text-white font-bold text-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(124,111,205,0.4)] active:scale-95"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-roast to-orange-500 opacity-90 group-hover:opacity-100 transition-opacity" />
            <span className="relative z-10 flex items-center gap-2">
              🔥 Upload & Get Roasted
            </span>
          </button>

          {/* Social proof */}
          <div className="mt-8 animate-slide-up [animation-delay:0.5s]">
            <SocialProofCounter />
          </div>
        </div>

        {/* Right side — 3D CV Mockup */}
        <div className="hidden lg:flex justify-center animate-slide-up [animation-delay:0.3s]">
          <CVMockup />
        </div>
      </div>

      {/* Bottom fade to page bg */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg to-transparent" />
    </section>
  );
}
