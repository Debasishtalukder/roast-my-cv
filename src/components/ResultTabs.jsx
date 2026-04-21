import React from "react";
import { generateSpeech } from "../utils/elevenLabsApi.js";

/* ── Premium Severity Ring ── */
function SeverityRing({ score }) {
  const [animatedScore, setAnimatedScore] = React.useState(0);

  React.useEffect(() => {
    const start = performance.now();
    function tick(now) {
      const p = Math.min((now - start) / 1500, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setAnimatedScore(Math.floor(eased * score));
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [score]);

  const circumference = 2 * Math.PI * 80; // r=80
  const offset = circumference - (animatedScore / 100) * circumference;

  // Color + verdict based on score
  let numberColor, verdict, emoji, glowColor;
  if (animatedScore < 40) {
    numberColor = "#10B981"; verdict = "Mild Roast"; emoji = "😬"; glowColor = "rgba(16,185,129,0.2)";
  } else if (animatedScore <= 70) {
    numberColor = "#F59E0B"; verdict = "Medium Burn"; emoji = "🔥"; glowColor = "rgba(245,158,11,0.2)";
  } else {
    numberColor = "#EF4444"; verdict = "Brutally Honest"; emoji = "💀"; glowColor = "rgba(239,68,68,0.2)";
  }

  return (
    <div className="flex flex-col items-center gap-3" style={{ margin: "32px auto" }}>
      {/* Ring */}
      <div className="relative" style={{ width: "180px", height: "180px" }}>
        <svg viewBox="0 0 200 200" width="180" height="180" className="absolute top-0 left-0">
          <defs>
            <linearGradient id="severityGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="50%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#EF4444" />
            </linearGradient>
          </defs>
          {/* Background track */}
          <circle cx="100" cy="100" r="80" fill="none" stroke="#F1F5F9" strokeWidth="12" />
          {/* Progress arc */}
          <circle
            cx="100" cy="100" r="80" fill="none"
            stroke="url(#severityGradient)"
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            transform="rotate(-90 100 100)"
            style={{ transition: "stroke-dashoffset 0.1s linear" }}
          />
        </svg>
        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="font-display tabular-nums leading-none" style={{ fontSize: "42px", fontWeight: 800, color: numberColor, letterSpacing: "-2px" }}>
            {animatedScore}
          </span>
          <span className="uppercase font-semibold" style={{ fontSize: "9px", color: "#94A3B8", letterSpacing: "1.5px" }}>
            Severity
          </span>
          <span className="mt-0.5" style={{ fontSize: "16px" }}>{emoji}</span>
        </div>
        {/* Glow under ring */}
        <div className="absolute left-1/2 -translate-x-1/2" style={{ bottom: "-10px", width: "100px", height: "20px", background: glowColor, filter: "blur(12px)", borderRadius: "50%" }} />
      </div>
      {/* Verdict pill */}
      <div className="rounded-full px-3.5 py-1" style={{ fontSize: "13px", fontWeight: 500, color: numberColor, background: animatedScore > 70 ? "#FFF1F0" : animatedScore > 40 ? "#FFFBEB" : "#F0FDF4", border: `1px solid ${animatedScore > 70 ? "#FFD5D0" : animatedScore > 40 ? "#FDE68A" : "#BBF7D0"}` }}>
        {verdict}
      </div>
    </div>
  );
}

/* ── CV Viewer ── */
function CVViewer({ cvText, highlights }) {
  const [tip, setTip] = React.useState(null);
  function render() {
    if (!highlights?.length) return <span className="text-text-body">{cvText}</span>;
    const sorted = [...highlights].map((h) => ({ text: h, index: cvText.toLowerCase().indexOf(h.toLowerCase()) })).filter((h) => h.index !== -1).sort((a, b) => a.index - b.index);
    const parts = []; let last = 0, k = 0;
    for (const { text: hl, index } of sorted) {
      if (index < last) continue;
      if (index > last) parts.push(<span key={k++} className="text-text-body">{cvText.slice(last, index)}</span>);
      const end = index + hl.length;
      parts.push(<span key={k++} className="bg-red-100 text-roast border-b border-roast/30 cursor-help px-0.5 rounded-sm hover:bg-red-200 transition-colors"
        onMouseEnter={(e) => { const r = e.target.getBoundingClientRect(); setTip({ text: `"${hl}" — needs work`, x: r.left, y: r.top - 8 }); }}
        onMouseLeave={() => setTip(null)}>{cvText.slice(index, end)}</span>);
      last = end;
    }
    if (last < cvText.length) parts.push(<span key={k++} className="text-text-body">{cvText.slice(last)}</span>);
    return parts;
  }
  return (
    <div className="relative">
      <h3 className="text-sm font-bold text-text-muted uppercase tracking-wider mb-3 flex items-center gap-2">📄 Your CV</h3>
      <div className="bg-card border border-border rounded-xl p-4 max-h-[400px] overflow-y-auto text-sm leading-relaxed whitespace-pre-wrap" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>{render()}</div>
      {tip && <div className="fixed z-50 px-3 py-2 bg-card border border-roast/20 rounded-lg text-xs text-roast shadow-lg max-w-xs pointer-events-none" style={{ left: tip.x, top: tip.y, transform: "translateY(-100%)" }}>{tip.text}</div>}
    </div>
  );
}

/* ── Roast Card ── */
function RoastCard({ card, index }) {
  const emoji = card.severity >= 3 ? "💀" : card.severity >= 2 ? "🔥" : "😬";
  const label = card.severity >= 3 ? "Brutal" : card.severity >= 2 ? "Spicy" : "Mild";
  const color = card.severity >= 3 ? "text-roast bg-red-50" : card.severity >= 2 ? "text-accent bg-orange-50" : "text-accent-amber bg-amber-50";
  return (
    <div className="bg-card border border-border rounded-xl p-4 transition-all duration-500 hover:shadow-md" style={{ animation: `slide-up 0.6s ease-out ${index * 0.15}s both` }}>
      <div className="flex items-start gap-3">
        <span className="text-2xl flex-shrink-0 mt-0.5">{emoji}</span>
        <div className="flex-1 min-w-0">
          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${color}`}>{label}</span>
          <p className="text-xs text-text-muted italic mt-1.5">"{card.quote}"</p>
          <p className="text-sm text-text-body leading-relaxed mt-1">{card.burn}</p>
        </div>
      </div>
    </div>
  );
}

/* ── Voice Roast Button ── */
function VoiceRoastButton({ roastText }) {
  const [url, setUrl] = React.useState(null);
  const [gen, setGen] = React.useState(false);
  const [playing, setPlaying] = React.useState(false);
  const audioRef = React.useRef(null);
  async function handleClick() {
    if (url) { if (playing) { audioRef.current?.pause(); setPlaying(false); } else { audioRef.current?.play(); setPlaying(true); } return; }
    setGen(true);
    try { const u = await generateSpeech(roastText); setUrl(u); const a = new Audio(u); audioRef.current = a; a.onended = () => setPlaying(false); a.play(); setPlaying(true); }
    catch { alert("Voice roast failed. Check your ElevenLabs API key."); }
    finally { setGen(false); }
  }
  return (
    <div className="bg-card border border-border rounded-xl p-4" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
      <div className="flex items-center gap-4">
        <button onClick={handleClick} disabled={gen}
          className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${playing ? "bg-primary text-white shadow-md" : gen ? "bg-border text-text-muted" : "bg-primary/10 text-primary hover:bg-primary/20 animate-pulse-soft hover:animate-none"}`}>
          {gen ? <div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" /> : playing ? <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" /></svg> : <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>}
        </button>
        <div>
          <p className="text-sm font-semibold text-text">{gen ? "Generating voice..." : playing ? "Playing roast..." : "🎙️ Voice Roast"}</p>
          <p className="text-xs text-text-muted mt-0.5">{gen ? "This takes a few seconds" : "Hear your roast read aloud by AI"}</p>
        </div>
      </div>
    </div>
  );
}

/* ── Tip Card ── */
function TipCard({ tip, index }) {
  const [open, setOpen] = React.useState(false);
  const colors = { high: "text-roast bg-red-50 border-red-200", medium: "text-accent bg-orange-50 border-orange-200", low: "text-tips bg-emerald-50 border-emerald-200" };
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden transition-all duration-500 hover:shadow-md" style={{ animation: `slide-up 0.5s ease-out ${index * 0.1}s both` }}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center gap-3 p-4 text-left">
        <span className="w-8 h-8 rounded-lg bg-emerald-100 text-tips flex items-center justify-center text-sm font-bold flex-shrink-0">{index + 1}</span>
        <span className="flex-1 text-sm font-semibold text-text">{tip.title}</span>
        <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${colors[tip.priority] || colors.medium}`}>{tip.priority}</span>
        <svg className={`w-4 h-4 text-text-muted transition-transform ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
      </button>
      <div className="overflow-hidden transition-all duration-300" style={{ maxHeight: open ? "200px" : "0", opacity: open ? 1 : 0 }}>
        <div className="px-4 pb-4 pl-[3.25rem]"><p className="text-sm text-text-body leading-relaxed">{tip.description}</p></div>
      </div>
    </div>
  );
}

/* ── Main Results Page ── */
export default function ResultTabs({ roast, tips, cvText, onReset }) {
  const [revealed, setRevealed] = React.useState(false);
  React.useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); const t = setTimeout(() => setRevealed(true), 300); return () => clearTimeout(t); }, []);

  const score = roast?.score ?? 65;
  const roastText = roast?.roastText ?? (typeof roast === "string" ? roast : "");
  const cards = roast?.cards ?? [];
  const highlights = roast?.highlights ?? [];
  const tipsList = tips?.tips ?? [];

  return (
    <section className="px-4 sm:px-6 lg:px-8" style={{ background: "#F8F9FF", paddingTop: "100px", paddingBottom: "96px", border: "none", outline: "none", boxShadow: "none" }}>
      {/* Header — no borders, clean background */}
      <div className="text-center mb-8 transition-all duration-1000" style={{ opacity: revealed ? 1 : 0, transform: revealed ? "translateY(0)" : "translateY(30px)" }}>
        <div className="text-6xl mb-5" style={{ animation: "pulse-soft 2s ease-in-out infinite" }}>🔥</div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-text font-display">
          Your CV Has Been <span className="animate-ember">Roasted</span>
        </h2>
        <p className="text-text-muted mt-3 text-sm">No CVs were harmed. Just egos.</p>
      </div>

      {/* Severity Ring */}
      <div className="transition-all duration-1000 delay-300" style={{ opacity: revealed ? 1 : 0, transform: revealed ? "scale(1)" : "scale(0.8)" }}>
        <SeverityRing score={score} />
      </div>

      {/* CV Viewer + Roast Cards */}
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-6 mb-16 mt-8">
        <div className="transition-all duration-700 delay-500" style={{ opacity: revealed ? 1 : 0, transform: revealed ? "translateX(0)" : "translateX(-40px)" }}>
          <CVViewer cvText={cvText} highlights={highlights} />
        </div>
        <div className="transition-all duration-700 delay-700" style={{ opacity: revealed ? 1 : 0, transform: revealed ? "translateX(0)" : "translateX(40px)" }}>
          <h3 className="text-sm font-bold text-text-muted uppercase tracking-wider mb-3">🔥 The Roast</h3>
          <div className="space-y-3 mb-4">
            {cards.length > 0 ? cards.map((c, i) => <RoastCard key={i} card={c} index={i} />) : (
              <div className="bg-card border border-border rounded-xl p-4"><p className="text-sm text-roast leading-relaxed whitespace-pre-wrap">{roastText}</p></div>
            )}
          </div>
          <VoiceRoastButton roastText={roastText} />
        </div>
      </div>

      {/* Tips */}
      <div className="max-w-3xl mx-auto mb-16 transition-all duration-700 delay-1000" style={{ opacity: revealed ? 1 : 0, transform: revealed ? "translateY(0)" : "translateY(30px)" }}>
        <h3 className="text-2xl font-bold text-text font-display text-center mb-2">5 Ways to <span className="text-tips">Fix This</span></h3>
        <p className="text-text-muted text-sm text-center mb-8">Actionable tips to turn your roasted CV into a career weapon.</p>
        <div className="space-y-3">{tipsList.map((t, i) => <TipCard key={i} tip={t} index={i} />)}</div>
      </div>

      {/* Actions */}
      <div className="max-w-3xl mx-auto flex flex-wrap items-center justify-center gap-4 transition-all duration-700 delay-[1200ms]" style={{ opacity: revealed ? 1 : 0 }}>
        <button onClick={() => { const t = encodeURIComponent(`My CV got a ${score}/100 severity roast 🔥😂 Try RoastMyCV!`); window.open(`https://twitter.com/intent/tweet?text=${t}`, "_blank"); }}
          className="flex items-center gap-2 px-6 py-3 bg-[#1DA1F2] text-white rounded-xl text-sm font-semibold hover:bg-[#1a8cd8] transition-colors">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
          Share on X
        </button>
        <button onClick={onReset} className="flex items-center gap-2 px-6 py-3 bg-white border border-border text-text-body rounded-xl text-sm font-semibold hover:bg-[#F5F7FF] transition-colors">
          ↩ Roast Another CV
        </button>
      </div>
    </section>
  );
}
