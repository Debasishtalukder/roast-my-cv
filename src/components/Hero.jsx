import React from "react";
import { LiquidMetalButton } from "./ui/liquid-metal-button.jsx";

const FLOATING_EMOJIS = ["🔥", "💀", "😅", "🔥", "💀", "😅", "🔥", "💀"];

function FloatingEmoji({ emoji, delay, left }) {
  return (
    <span className="absolute text-2xl pointer-events-none select-none"
      style={{ left: `${left}%`, bottom: "-40px", animation: `float-up ${8 + Math.random() * 6}s linear ${delay}s infinite` }}
      aria-hidden="true">{emoji}</span>
  );
}

function SocialProofCounter() {
  const [count, setCount] = React.useState(2880);
  React.useEffect(() => { const i = setInterval(() => setCount((p) => p + Math.floor(Math.random() * 3)), 4000); return () => clearInterval(i); }, []);
  return (
    <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-card border border-border shadow-sm">
      <span className="text-lg">🔥</span>
      <span className="text-text-body text-sm font-medium">
        <span className="text-text font-bold tabular-nums">{count.toLocaleString()}</span> CVs roasted this week
      </span>
    </div>
  );
}

/* ── Card data ── */
const cards = [
  { name: "Alex T.", score: "4/10", bg: "#FFF3E8", gradient: "from-orange-400 to-pink-400", roast: '"Synergy expert" — that\'s not a real job title...', tip: "✓ Use specific, measurable role titles" },
  { name: "Priya S.", score: "7/10", bg: "#F0FFF4", gradient: "from-emerald-400 to-teal-400", roast: '"Passionate learner" — everyone says that...', tip: "✓ Show learning through certifications" },
  { name: "Mike R.", score: "2/10", bg: "#EEF2FF", gradient: "from-blue-400 to-indigo-400", roast: '"Proficient in Word" — it\'s 2026, come on...', tip: "✓ List modern, relevant technical skills" },
  { name: "Sarah K.", score: "5/10", bg: "#FFF8E8", gradient: "from-amber-400 to-orange-400", roast: '"Hard worker" — that\'s a baseline, not a skill...', tip: "✓ Replace soft claims with hard results" },
  { name: "John D.", score: "3/10", bg: "#FFFFFF", gradient: "from-purple-400 to-pink-400", roast: '"Detail-oriented" — yet you misspelled "experience" twice...', tip: "✓ Quantify achievements with real metrics" },
];

/* ── Pure CSS Card Stack ── */
function CardStack() {
  // Inject styles once
  React.useEffect(() => {
    const id = "card-stack-css";
    if (document.getElementById(id)) return;
    const style = document.createElement("style");
    style.id = id;
    style.textContent = `
      @keyframes heroFloat {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-12px); }
      }
      @keyframes cardEntry {
        from { opacity: 0; transform: translateY(60px) rotate(0deg) !important; }
      }

      .card-stack {
        position: relative;
        width: 340px;
        height: 380px;
        cursor: pointer;
        animation: heroFloat 5s ease-in-out infinite;
      }
      .card-stack:hover {
        animation-play-state: paused;
      }

      .cv-card {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 280px;
        margin-left: -140px;
        margin-top: -170px;
        border-radius: 20px;
        padding: 22px;
        border: 1px solid rgba(255,255,255,0.8);
        box-shadow: 0 8px 32px rgba(0,0,0,0.10);
        transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1),
                    box-shadow 0.5s ease,
                    opacity 0.5s ease;
        will-change: transform;
      }

      .cv-card-1 { z-index: 1; opacity: 0.7; transform: rotate(-12deg) translate(-40px, 30px); animation: cardEntry 0.7s cubic-bezier(0.34,1.56,0.64,1) 0s both; }
      .cv-card-2 { z-index: 2; opacity: 0.75; transform: rotate(-6deg) translate(-20px, 15px); animation: cardEntry 0.7s cubic-bezier(0.34,1.56,0.64,1) 0.1s both; }
      .cv-card-3 { z-index: 3; opacity: 0.8; transform: rotate(-2deg) translate(-8px, 6px); animation: cardEntry 0.7s cubic-bezier(0.34,1.56,0.64,1) 0.2s both; }
      .cv-card-4 { z-index: 4; opacity: 0.85; transform: rotate(3deg) translate(8px, -4px); animation: cardEntry 0.7s cubic-bezier(0.34,1.56,0.64,1) 0.3s both; }
      .cv-card-5 { z-index: 5; opacity: 1; transform: rotate(0deg) translate(0, 0); animation: cardEntry 0.7s cubic-bezier(0.34,1.56,0.64,1) 0.4s both; }

      .card-stack:hover .cv-card-1 { transform: rotate(-18deg) translate(-110px, 25px) scale(0.93); opacity: 1; box-shadow: 0 16px 48px rgba(0,0,0,0.15); }
      .card-stack:hover .cv-card-2 { transform: rotate(-9deg) translate(-60px, 12px) scale(0.95); opacity: 1; box-shadow: 0 16px 48px rgba(0,0,0,0.15); }
      .card-stack:hover .cv-card-3 { transform: rotate(-2deg) translate(-15px, 2px) scale(0.97); opacity: 1; box-shadow: 0 16px 48px rgba(0,0,0,0.15); }
      .card-stack:hover .cv-card-4 { transform: rotate(7deg) translate(35px, -8px) scale(0.97); opacity: 1; box-shadow: 0 16px 48px rgba(0,0,0,0.15); }
      .card-stack:hover .cv-card-5 { transform: rotate(14deg) translate(80px, -15px) scale(0.95); opacity: 1; box-shadow: 0 16px 48px rgba(0,0,0,0.15); }
    `;
    document.head.appendChild(style);
  }, []);

  return (
    <div className="card-stack">
      {cards.map((card, i) => (
        <div key={i} className={`cv-card cv-card-${i + 1}`} style={{ background: card.bg }}>
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${card.gradient} flex-shrink-0`} />
              <span className="text-xs text-[#64748B] font-medium">{card.name}</span>
            </div>
            <div className="w-9 h-9 rounded-full bg-[#FF4500] flex items-center justify-center shadow-sm">
              <span className="text-white text-[13px] font-extrabold">{card.score}</span>
            </div>
          </div>
          {/* Skeleton lines */}
          <div className="space-y-1.5 mb-3">
            <div className="h-2 w-full bg-[#E8EBF0] rounded" />
            <div className="h-2 w-[85%] bg-[#E8EBF0] rounded" />
            <div className="h-2 w-[60%] bg-[#E8EBF0] rounded" />
          </div>
          {/* Roast pill */}
          <div className="rounded-lg p-2 mb-2" style={{ background: "#FFF1F0", border: "1px solid #FFD5D0" }}>
            <p className="text-[11px] text-[#DC2626] leading-relaxed">{card.roast}</p>
          </div>
          {/* Tip pill */}
          <div className="rounded-lg p-2" style={{ background: "#F0FDF4", border: "1px solid #BBF7D0" }}>
            <p className="text-[11px] text-[#16A34A] leading-relaxed">{card.tip}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Hero ── */
export default function Hero({ onFileSelect }) {
  const [isDragging, setIsDragging] = React.useState(false);
  const fileInputRef = React.useRef(null);

  return (
    <section className="relative flex items-center overflow-hidden" style={{ background: "linear-gradient(135deg, #F8F9FF 0%, #EEF2FF 50%, #F5F0FF 100%)", minHeight: "85vh", padding: "80px 0" }}>
      {/* Blobs */}
      <div className="absolute top-[10%] right-[10%] w-[500px] h-[500px] rounded-full blur-[80px] animate-blob" style={{ background: "rgba(108,58,237,0.08)" }} />
      <div className="absolute bottom-[10%] left-[5%] w-[400px] h-[400px] rounded-full blur-[80px] animate-blob [animation-delay:3s]" style={{ background: "rgba(255,69,0,0.06)" }} />

      {/* Floating emojis */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {FLOATING_EMOJIS.map((e, i) => <FloatingEmoji key={i} emoji={e} delay={i * 1.5} left={10 + i * 11} />)}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center px-4 sm:px-6 lg:px-8 gap-12 lg:gap-16">
        {/* Left — content */}
        <div className="flex-1 flex flex-col justify-center animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-card border border-primary/20 text-primary text-xs font-medium mb-8 shadow-sm self-start">
            <span className="w-1.5 h-1.5 rounded-full bg-tips animate-pulse" />
            AI-Powered CV Roaster
          </div>

          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold leading-[1.05] tracking-tight">
            <span className="animate-ember">Roast</span><br />
            <span className="text-text">My CV</span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-text-body max-w-lg leading-relaxed">
            Upload your CV and let AI brutally roast it — then actually fix it. No mercy. No filter. Just truth.
          </p>

          {/* Upload dropzone */}
          <div
            className={`mt-10 relative rounded-2xl border-2 border-dashed transition-all duration-300 cursor-pointer p-6 sm:p-8 text-center ${
              isDragging ? "border-primary bg-primary/5 scale-[1.02]" : "border-border bg-card hover:border-primary hover:bg-card-hover"
            }`}
            style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={(e) => { e.preventDefault(); setIsDragging(false); }}
            onDrop={(e) => { e.preventDefault(); setIsDragging(false); const f = e.dataTransfer.files[0]; if (f) onFileSelect(f); }}
            onClick={() => fileInputRef.current?.click()}
            role="button" tabIndex={0} aria-label="Upload your CV"
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") fileInputRef.current?.click(); }}
          >
            <input ref={fileInputRef} type="file" accept=".pdf,.docx,.doc" className="hidden" onChange={(e) => { const f = e.target.files[0]; if (f) onFileSelect(f); }} />
            <div className="flex flex-col items-center gap-3">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                <svg className="w-7 h-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                </svg>
              </div>
              <p className="font-medium text-text">{isDragging ? "Drop it like it's hot! 🔥" : "Drag & drop your CV here"}</p>
              <p className="text-sm text-text-muted">PDF & DOCX supported</p>
            </div>
          </div>

          <div className="mt-6">
            <LiquidMetalButton label="🔥 Upload & Get Roasted" onClick={() => fileInputRef.current?.click()} />
          </div>

          <div className="mt-8 animate-slide-up [animation-delay:0.5s]">
            <SocialProofCounter />
          </div>
        </div>

        {/* Right — Card Stack */}
        <div className="hidden lg:flex flex-1 items-center justify-center" style={{ paddingLeft: "40px" }}>
          <CardStack />
        </div>
      </div>
    </section>
  );
}
