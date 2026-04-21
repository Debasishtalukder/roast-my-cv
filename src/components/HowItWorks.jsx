import React from "react";

const steps = [
  {
    num: "01", title: "Upload Your CV",
    description: "Drop your PDF or DOCX. We extract text instantly — zero data stored.",
    icon: (<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" /></svg>),
    iconBg: "bg-orange-100", iconColor: "text-accent",
  },
  {
    num: "02", title: "AI Reads & Roasts",
    description: "Our AI reads every line and roasts it with brutal honesty and dark humor.",
    icon: (<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" /></svg>),
    iconBg: "bg-red-100", iconColor: "text-roast",
  },
  {
    num: "03", title: "Get Tips + Voice Roast",
    description: "Get 5 actionable fixes. ElevenLabs AI reads your roast out loud.",
    icon: (<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" /></svg>),
    iconBg: "bg-purple-100", iconColor: "text-primary",
  },
];

export default function HowItWorks() {
  const ref = React.useRef(null);
  const [vis, setVis] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: 0.15 });
    obs.observe(el); return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-24 px-4 sm:px-6 lg:px-8 bg-bg">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16 transition-all duration-700" style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(24px)" }}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-card border border-primary/20 text-primary text-xs font-medium mb-6 shadow-sm">How It Works</div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-text font-display">
            Three Steps to a <span className="animate-ember">Better CV</span>
          </h2>
          <p className="text-text-body mt-4 max-w-lg mx-auto">(and a bruised ego — but you'll thank us later)</p>
        </div>

        <div className="relative">
          {/* Connecting line desktop */}
          <div className="hidden lg:block absolute top-1/2 left-[16%] right-[16%] -translate-y-1/2 z-0">
            <svg className="w-full h-4" viewBox="0 0 600 8" fill="none" preserveAspectRatio="none">
              <line x1="0" y1="4" x2="600" y2="4" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="8 8" />
            </svg>
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {steps.map((s, i) => (
              <div
                key={i}
                className="bg-card rounded-2xl border border-[#E8EDFF] p-6 sm:p-7 transition-all duration-500 hover:-translate-y-1 hover:shadow-lg"
                style={{
                  boxShadow: "0 4px 16px rgba(0,0,0,0.08), 0 2px 6px rgba(0,0,0,0.04)",
                  opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(32px)", transitionDelay: `${i * 150}ms`,
                }}
              >
                <div className={`w-12 h-12 rounded-xl ${s.iconBg} ${s.iconColor} flex items-center justify-center mb-5`}>{s.icon}</div>
                <p className="text-xs font-bold uppercase tracking-wider text-primary mb-2">Step {s.num}</p>
                <h3 className="text-lg font-bold text-text font-display mb-2">{s.title}</h3>
                <p className="text-sm text-text-body leading-relaxed">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
