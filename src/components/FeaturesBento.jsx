import React from "react";

function useReveal(t = 0.15) {
  const ref = React.useRef(null);
  const [v, setV] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); obs.disconnect(); } }, { threshold: t });
    obs.observe(el);
    return () => obs.disconnect();
  }, [t]);
  return [ref, v];
}

const cardBase = "bg-white rounded-[20px] border border-[#EBEBF0] overflow-hidden transition-all duration-300 group";
const cardShadow = "0 2px 8px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)";
const cardHoverStyle = "hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)]";
const iconCircle = "w-10 h-10 rounded-full flex items-center justify-center text-lg";

/* ── Card 1: Brutal Honest Roast (2-col) ── */
function BrutalRoastCard({ vis }) {
  return (
    <div className={`${cardBase} ${cardHoverStyle} sm:col-span-2`} style={{ boxShadow: cardShadow, opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(30px)", transition: "all 0.5s cubic-bezier(0.16,1,0.3,1)", transitionDelay: "0ms" }}>
      {/* Illustration */}
      <div className="relative h-[200px] p-6 flex items-center justify-center" style={{ background: "linear-gradient(135deg, #FFF5F5 0%, #FFF0E8 100%)" }}>
        <div className="relative w-48 bg-white rounded-xl p-4 shadow-sm border border-[#F1F5F9]">
          <div className="space-y-2.5">
            {["w-full", "w-4/5", "w-full", "w-3/5", "w-11/12"].map((w, i) => {
              const isRed = i === 1 || i === 3;
              return (
                <div key={i} className={`h-2 ${w} rounded-full transition-all duration-300`}
                  style={{
                    background: isRed ? "#FEE2E2" : "#F1F5F9",
                    opacity: 0,
                    transform: "translateX(-8px)",
                    animation: vis ? `fade-in 0.4s ease-out ${i * 0.15}s both` : "none",
                  }}
                >
                  {isRed && <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#DC2626]" style={{ position: "relative", float: "right", marginTop: "-1px" }} />}
                </div>
              );
            })}
          </div>
          {/* Score badge */}
          <div className="absolute -top-3 -right-3 w-9 h-9 rounded-full bg-[#FF4500] flex items-center justify-center shadow-md">
            <span className="text-white text-[10px] font-bold">3/10</span>
          </div>
        </div>
      </div>
      {/* Content */}
      <div className="p-6">
        <div className={`${iconCircle} bg-[#FFF0E8] mb-3`}>🔥</div>
        <h3 className="text-lg font-bold text-[#0A0A1A] mb-1.5">Brutal Honest Roast</h3>
        <p className="text-sm text-[#64748B] leading-relaxed">AI roasts your CV with no filter. Every vague claim and cringe phrase gets called out.</p>
      </div>
    </div>
  );
}

/* ── Card 2: Voice Roast ── */
function VoiceRoastCard({ vis }) {
  return (
    <div className={`${cardBase} ${cardHoverStyle}`} style={{ boxShadow: cardShadow, opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(30px)", transition: "all 0.5s cubic-bezier(0.16,1,0.3,1)", transitionDelay: "100ms" }}>
      <div className="relative h-[160px] flex items-end justify-center px-6 pb-4" style={{ background: "linear-gradient(135deg, #F5F0FF 0%, #EDE8FF 100%)" }}>
        <div className="flex items-end gap-[3px] h-20">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="w-1 rounded-full" style={{
              background: "#7C3AED",
              height: `${14 + Math.sin(i * 0.6) * 18 + Math.random() * 12}px`,
              animation: `pulse-soft ${0.5 + Math.random() * 0.6}s ease-in-out ${i * 0.06}s infinite alternate`,
              opacity: 0.5 + Math.random() * 0.5,
            }} />
          ))}
        </div>
        <div className="absolute right-4 bottom-4 w-10 h-10 rounded-full bg-[#7C3AED] flex items-center justify-center shadow-md">
          <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
        </div>
      </div>
      <div className="p-6">
        <div className={`${iconCircle} bg-[#F5F0FF] mb-3`}>🎙️</div>
        <h3 className="text-lg font-bold text-[#0A0A1A] mb-1.5">Voice Roast</h3>
        <p className="text-sm text-[#64748B] leading-relaxed">ElevenLabs AI reads the roast out loud. It hits different when you hear it.</p>
      </div>
    </div>
  );
}

/* ── Card 3: Secure & Private ── */
function SecureCard({ vis }) {
  return (
    <div className={`${cardBase} ${cardHoverStyle}`} style={{ boxShadow: cardShadow, opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(30px)", transition: "all 0.5s cubic-bezier(0.16,1,0.3,1)", transitionDelay: "200ms" }}>
      <div className="relative h-[160px] flex items-center justify-center" style={{ background: "linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 100%)" }}>
        {/* Rotating dashed circle */}
        <svg className="absolute w-24 h-24" viewBox="0 0 96 96" style={{ animation: "spin-slow 8s linear infinite" }}>
          <circle cx="48" cy="48" r="42" fill="none" stroke="#10B981" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.4" />
        </svg>
        {/* Shield */}
        <svg className="w-14 h-14 text-[#10B981] relative z-10" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
        {/* Floating locks */}
        {[{ x: "20%", y: "25%", d: 0 }, { x: "75%", y: "20%", d: 1.5 }, { x: "70%", y: "70%", d: 3 }].map((l, i) => (
          <span key={i} className="absolute text-sm" style={{ left: l.x, top: l.y, animation: `blob-float 4s ease-in-out ${l.d}s infinite`, opacity: 0.5 }}>🔒</span>
        ))}
      </div>
      <div className="p-6">
        <div className={`${iconCircle} bg-[#F0FDF4] mb-3`}>🔒</div>
        <h3 className="text-lg font-bold text-[#0A0A1A] mb-1.5">Secure & Private</h3>
        <p className="text-sm text-[#64748B] leading-relaxed mb-3">Your CV is never stored. Everything runs client-side.</p>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
          <span className="text-[10px] text-[#10B981] font-bold uppercase tracking-wider">End-to-end private</span>
        </div>
      </div>
    </div>
  );
}

/* ── Card 4: Instant Results ── */
function InstantCard({ vis }) {
  const [count, setCount] = React.useState(30);
  const [hovered, setHovered] = React.useState(false);

  React.useEffect(() => {
    if (!hovered) { setCount(30); return; }
    const t = setInterval(() => setCount((p) => Math.max(p - 1, 0)), 80);
    return () => clearInterval(t);
  }, [hovered]);

  return (
    <div className={`${cardBase} ${cardHoverStyle}`} style={{ boxShadow: cardShadow, opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(30px)", transition: "all 0.5s cubic-bezier(0.16,1,0.3,1)", transitionDelay: "300ms" }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div className="relative h-[160px] flex flex-col items-center justify-center" style={{ background: "linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)" }}>
        {/* Speed lines */}
        {[{ r: -30, l: 20 }, { r: 0, l: 24 }, { r: 30, l: 18 }].map((s, i) => (
          <div key={i} className="absolute w-px bg-[#F59E0B]/30" style={{ height: `${s.l}px`, transform: `rotate(${s.r}deg)`, left: "calc(50% + 36px)", top: `calc(50% - ${s.l / 2}px)` }} />
        ))}
        {/* Lightning */}
        <svg className="w-14 h-14 text-[#F59E0B]" fill="currentColor" viewBox="0 0 24 24" style={{ animation: "pulse-soft 2s ease-in-out infinite" }}>
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
        <div className="mt-2 flex items-baseline gap-1">
          <span className="text-2xl font-extrabold text-[#F59E0B] tabular-nums font-display">&lt; {count}</span>
          <span className="text-xs text-[#F59E0B]/60 font-bold">SEC</span>
        </div>
      </div>
      <div className="p-6">
        <div className={`${iconCircle} bg-[#FFFBEB] mb-3`}>⚡</div>
        <h3 className="text-lg font-bold text-[#0A0A1A] mb-1.5">Instant Results</h3>
        <p className="text-sm text-[#64748B] leading-relaxed">Under 30 seconds. Your CV doesn't deserve more time than that.</p>
      </div>
    </div>
  );
}

/* ── Card 5: Real Improvement Tips (2-col) ── */
function TipsCard({ vis }) {
  const [hovered, setHovered] = React.useState(false);
  return (
    <div className={`${cardBase} ${cardHoverStyle} sm:col-span-2`} style={{ boxShadow: cardShadow, opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(30px)", transition: "all 0.5s cubic-bezier(0.16,1,0.3,1)", transitionDelay: "100ms" }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div className="relative h-[180px] flex items-center justify-center gap-3 px-6" style={{ background: "linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 100%)" }}>
        {/* Before */}
        <div className="w-[45%] bg-[#FFF1F2] border border-[#FFE4E6] rounded-lg p-3 transition-all duration-400"
          style={{ opacity: hovered ? 0.6 : 1, transform: hovered ? "translateX(-8px)" : "translateX(0)" }}>
          <p className="text-[10px] font-bold text-[#DC2626] uppercase tracking-wider mb-2">Before</p>
          <div className="space-y-1.5">
            <div className="h-1.5 w-full bg-[#FECACA] rounded-full" />
            <div className="h-1.5 w-3/4 bg-[#FCA5A5] rounded-full" />
          </div>
          <p className="text-[9px] text-[#DC2626]/50 mt-2 italic">"Responsible for things"</p>
        </div>

        {/* Arrow / check */}
        <div className="transition-all duration-400" style={{ opacity: hovered ? 1 : 0.4, transform: hovered ? "scale(1.2)" : "scale(1)" }}>
          {hovered ? (
            <svg className="w-6 h-6 text-[#16A34A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
          ) : (
            <svg className="w-5 h-5 text-[#94A3B8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
          )}
        </div>

        {/* After */}
        <div className="w-[45%] bg-[#F0FDF4] border border-[#BBF7D0] rounded-lg p-3 transition-all duration-400"
          style={{ transform: hovered ? "translateX(8px)" : "translateX(0)" }}>
          <p className="text-[10px] font-bold text-[#16A34A] uppercase tracking-wider mb-2">After</p>
          <div className="space-y-1.5">
            <div className="h-1.5 w-full bg-[#BBF7D0] rounded-full" />
            <div className="h-1.5 w-4/5 bg-[#86EFAC] rounded-full" />
          </div>
          <p className="text-[9px] text-[#16A34A]/60 mt-2 italic">"Led 12-person team → 40% growth"</p>
        </div>
      </div>
      <div className="p-6">
        <div className={`${iconCircle} bg-[#F0F9FF] mb-3`}>💡</div>
        <h3 className="text-lg font-bold text-[#0A0A1A] mb-1.5">Real Improvement Tips</h3>
        <p className="text-sm text-[#64748B] leading-relaxed">After the roast, get 5 actionable fixes to make your CV actually stand out.</p>
      </div>
    </div>
  );
}

/* ── Card 6: 2 Free Roasts ── */
function FreeRoastsCard({ vis }) {
  return (
    <div className={`${cardBase} ${cardHoverStyle}`} style={{ boxShadow: cardShadow, opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(30px)", transition: "all 0.5s cubic-bezier(0.16,1,0.3,1)", transitionDelay: "400ms" }}>
      <div className="relative h-[160px] flex items-center justify-center overflow-hidden" style={{ background: "linear-gradient(135deg, #FFF5F5 0%, #FFEDD5 100%)" }}>
        {/* Confetti dots */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="absolute w-1.5 h-1.5 rounded-full" style={{
            background: ["#FF4500", "#6C3AED", "#F59E0B", "#10B981", "#3B82F6", "#EC4899", "#FF4500", "#6C3AED"][i],
            left: `${15 + i * 10}%`,
            bottom: "-6px",
            animation: `float-up ${5 + Math.random() * 4}s linear ${i * 0.6}s infinite`,
            opacity: 0.6,
          }} />
        ))}
        {/* Gift boxes */}
        <span className="text-5xl" style={{ animation: "blob-float 3s ease-in-out infinite" }}>🎁</span>
        <span className="text-4xl ml-3" style={{ animation: "blob-float 3s ease-in-out 0.8s infinite" }}>🎁</span>
      </div>
      <div className="p-6">
        <div className={`${iconCircle} bg-[#FFF5F5] mb-3`}>🎁</div>
        <h3 className="text-lg font-bold text-[#0A0A1A] mb-1.5">2 Free Roasts</h3>
        <p className="text-sm text-[#64748B] leading-relaxed">Every user gets 2 free roasts. Share on X to unlock more.</p>
      </div>
    </div>
  );
}

/* ── Main Section ── */
export default function FeaturesBento() {
  const [ref, vis] = useReveal(0.1);

  return (
    <section ref={ref} className="px-4 sm:px-6 lg:px-8" style={{ background: "#F4F4F6", paddingTop: "80px", paddingBottom: "80px" }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14 transition-all duration-700" style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(24px)" }}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#6C3AED]/20 text-[#6C3AED] text-xs font-semibold mb-6 shadow-sm">Features</div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0A0A1A] font-display">
            Everything You Need to <span className="animate-ember">Level Up</span>
          </h2>
          <p className="text-[#64748B] mt-4 max-w-lg mx-auto text-base">Turn your cringe CV into a career weapon.</p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <BrutalRoastCard vis={vis} />
          <VoiceRoastCard vis={vis} />
          <SecureCard vis={vis} />
          <InstantCard vis={vis} />
          <TipsCard vis={vis} />
          <FreeRoastsCard vis={vis} />
        </div>
      </div>
    </section>
  );
}
