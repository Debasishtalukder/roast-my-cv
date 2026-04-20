import React from "react";

/* ── Scroll visibility hook ── */
function useScrollReveal(threshold = 0.35) {
  const ref = React.useRef(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return [ref, visible];
}

/* ── Step 1 illustration: animated file drop ── */
function UploadIllustration({ active }) {
  return (
    <div className="relative w-full h-40 flex items-end justify-center">
      {/* Drop zone box */}
      <div className="w-32 h-24 rounded-xl border-2 border-dashed border-white/20 bg-white/[0.03] flex items-center justify-center">
        <svg className="w-8 h-8 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
        </svg>
      </div>
      {/* Animated file */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2"
        style={{
          animation: active ? "file-drop 1.2s ease-out 0.3s both" : "none",
          opacity: active ? undefined : 0,
        }}
      >
        <div className="w-16 h-20 bg-gradient-to-br from-orange-400 to-roast rounded-lg shadow-lg shadow-roast/20 flex flex-col items-center justify-center gap-1 border border-white/10">
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
          </svg>
          <span className="text-[8px] text-white/80 font-bold">PDF</span>
        </div>
      </div>
    </div>
  );
}

/* ── Step 2 illustration: scanning + roast marks ── */
function ScanIllustration({ active }) {
  return (
    <div className="relative w-full h-40 flex items-center justify-center overflow-hidden">
      <div className="relative w-44 bg-white/[0.04] border border-white/10 rounded-xl p-3 space-y-2">
        {/* Fake CV lines */}
        <div className="h-1.5 w-full bg-white/10 rounded-full" />
        <div className="relative h-1.5 w-4/5 bg-white/10 rounded-full">
          <div
            className="absolute inset-0 bg-roast/40 rounded-full"
            style={{ animation: active ? "roast-mark-1 2.5s ease-out both" : "none", opacity: 0 }}
          />
        </div>
        <div className="h-1.5 w-full bg-white/10 rounded-full" />
        <div className="relative h-1.5 w-3/5 bg-white/10 rounded-full">
          <div
            className="absolute inset-0 bg-roast/40 rounded-full"
            style={{ animation: active ? "roast-mark-2 2.5s ease-out both" : "none", opacity: 0 }}
          />
        </div>
        <div className="h-1.5 w-full bg-white/10 rounded-full" />
        <div className="relative h-1.5 w-11/12 bg-white/10 rounded-full">
          <div
            className="absolute inset-0 bg-roast/40 rounded-full"
            style={{ animation: active ? "roast-mark-3 2.5s ease-out both" : "none", opacity: 0 }}
          />
        </div>
        <div className="h-1.5 w-2/3 bg-white/10 rounded-full" />

        {/* Scan line */}
        {active && (
          <div
            className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-roast to-transparent"
            style={{ animation: "scan-line 2s ease-in-out infinite" }}
          />
        )}
      </div>
      {/* Roast emoji */}
      <span
        className="absolute top-2 right-4 text-2xl transition-all duration-700"
        style={{ opacity: active ? 1 : 0, transform: active ? "scale(1)" : "scale(0)" }}
      >
        🔥
      </span>
    </div>
  );
}

/* ── Step 3 illustration: before / after diff ── */
function DiffIllustration({ active }) {
  return (
    <div className="relative w-full h-40 flex items-center justify-center gap-2">
      {/* Before */}
      <div
        className="w-[45%] bg-roast/[0.06] border border-roast/20 rounded-lg p-2.5 transition-all duration-700"
        style={{ opacity: active ? 1 : 0, transform: active ? "translateX(0)" : "translateX(-20px)" }}
      >
        <p className="text-[7px] font-bold text-roast/60 uppercase tracking-wider mb-1.5">Before</p>
        <div className="space-y-1.5">
          <div className="h-1.5 w-full bg-roast/15 rounded-full" />
          <div className="h-1.5 w-4/5 bg-roast/25 rounded-full relative overflow-hidden">
            <div className="absolute inset-0 bg-roast/20 line-through" />
          </div>
          <div className="h-1.5 w-full bg-roast/15 rounded-full" />
          <div className="h-1.5 w-3/5 bg-roast/25 rounded-full" />
        </div>
      </div>

      {/* Arrow */}
      <div
        className="text-white/30 transition-all duration-700 delay-300"
        style={{ opacity: active ? 1 : 0 }}
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
        </svg>
      </div>

      {/* After */}
      <div
        className="w-[45%] bg-tips/[0.06] border border-tips/20 rounded-lg p-2.5 transition-all duration-700 delay-200"
        style={{ opacity: active ? 1 : 0, transform: active ? "translateX(0)" : "translateX(20px)" }}
      >
        <p className="text-[7px] font-bold text-tips/60 uppercase tracking-wider mb-1.5">After</p>
        <div className="space-y-1.5">
          <div className="h-1.5 w-full bg-tips/15 rounded-full" />
          <div
            className="h-1.5 w-4/5 rounded-full overflow-hidden"
            style={{
              background: active
                ? "linear-gradient(90deg, rgba(29,158,117,0.35), rgba(29,158,117,0.15))"
                : "rgba(29,158,117,0.1)",
              backgroundRepeat: "no-repeat",
              animation: active ? "diff-highlight 1.5s ease-out 0.8s both" : "none",
            }}
          />
          <div className="h-1.5 w-full bg-tips/15 rounded-full" />
          <div className="h-1.5 w-4/5 bg-tips/25 rounded-full" />
        </div>
      </div>
    </div>
  );
}

/* ── Connecting dotted line (desktop) ── */
function ConnectingLine({ active }) {
  return (
    <div className="hidden lg:flex absolute top-1/2 left-0 right-0 -translate-y-1/2 z-0 items-center justify-center pointer-events-none">
      <svg className="w-full h-4" viewBox="0 0 800 16" fill="none" preserveAspectRatio="none">
        <line
          x1="130" y1="8" x2="670" y2="8"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="2"
          strokeDasharray="8 6"
          style={{
            animation: active ? "dash-flow 1s linear infinite" : "none",
          }}
        />
      </svg>
    </div>
  );
}

/* ── Connecting dotted line (mobile vertical) ── */
function VerticalLine({ active }) {
  return (
    <div className="lg:hidden flex justify-center py-2">
      <svg className="w-4 h-12" viewBox="0 0 16 48" fill="none">
        <line
          x1="8" y1="0" x2="8" y2="48"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="2"
          strokeDasharray="6 5"
          style={{
            animation: active ? "dash-flow 1s linear infinite" : "none",
          }}
        />
      </svg>
    </div>
  );
}

/* ── Step data ── */
const steps = [
  {
    num: "01",
    title: "Upload Your CV",
    description: "Drop your PDF or DOCX file. We extract the text instantly — no data stored anywhere.",
    gradient: "from-orange-500 to-roast",
    borderColor: "border-orange-500/30",
    glowColor: "shadow-orange-500/10",
    Illustration: UploadIllustration,
  },
  {
    num: "02",
    title: "AI Reads & Roasts",
    description: "Our AI scans every line and roasts it with brutal honesty. No weak point goes unnoticed.",
    gradient: "from-roast to-primary",
    borderColor: "border-roast/30",
    glowColor: "shadow-roast/10",
    Illustration: ScanIllustration,
  },
  {
    num: "03",
    title: "Get Tips + Audio Roast",
    description: "Receive real improvement tips, see the before/after, and listen to the roast read aloud.",
    gradient: "from-primary to-tips",
    borderColor: "border-tips/30",
    glowColor: "shadow-tips/10",
    Illustration: DiffIllustration,
  },
];

/* ── Main component ── */
export default function HowItWorks() {
  const [sectionRef, sectionVisible] = useScrollReveal(0.15);
  const [step1Ref, step1Visible] = useScrollReveal(0.4);
  const [step2Ref, step2Visible] = useScrollReveal(0.4);
  const [step3Ref, step3Visible] = useScrollReveal(0.4);
  const stepRefs = [step1Ref, step2Ref, step3Ref];
  const stepVisibles = [step1Visible, step2Visible, step3Visible];

  return (
    <section ref={sectionRef} className="py-24 px-4 sm:px-6 lg:px-8 bg-hero-dark overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div
          className="text-center mb-20 transition-all duration-700"
          style={{
            opacity: sectionVisible ? 1 : 0,
            transform: sectionVisible ? "translateY(0)" : "translateY(30px)",
          }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.06] border border-white/[0.08] text-white/50 text-xs font-medium mb-6">
            How It Works
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-display">
            Three Steps to a{" "}
            <span className="animate-ember">Better CV</span>
          </h2>
          <p className="text-white/40 mt-4 max-w-lg mx-auto">
            (and a bruised ego — but you'll thank us later)
          </p>
        </div>

        {/* Timeline — horizontal on desktop, vertical on mobile */}
        <div className="relative">
          <ConnectingLine active={sectionVisible} />

          {/* Desktop: horizontal */}
          <div className="hidden lg:grid lg:grid-cols-3 gap-8 relative z-10">
            {steps.map((step, i) => {
              const { Illustration } = step;
              return (
                <div
                  key={i}
                  ref={stepRefs[i]}
                  className={`relative group rounded-2xl bg-white/[0.03] ${step.borderColor} border backdrop-blur-sm overflow-hidden shadow-xl ${step.glowColor} transition-all duration-700`}
                  style={{
                    opacity: stepVisibles[i] ? 1 : 0,
                    transform: stepVisibles[i]
                      ? "translateX(0) translateY(0)"
                      : i === 0
                        ? "translateX(-60px)"
                        : i === 2
                          ? "translateX(60px)"
                          : "translateY(40px)",
                  }}
                >
                  {/* Gradient top border */}
                  <div className={`h-1 bg-gradient-to-r ${step.gradient}`} />

                  {/* Watermark number */}
                  <span className="absolute top-4 right-4 text-7xl font-extrabold text-white/[0.04] font-display select-none pointer-events-none leading-none">
                    {step.num}
                  </span>

                  <div className="p-6">
                    {/* Step badge */}
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${step.gradient} text-white mb-4`}>
                      Step {step.num}
                    </div>

                    {/* Illustration */}
                    <Illustration active={stepVisibles[i]} />

                    {/* Text */}
                    <h3 className="text-xl font-bold text-white mt-5 mb-2 font-display">
                      {step.title}
                    </h3>
                    <p className="text-sm text-white/40 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile: vertical */}
          <div className="lg:hidden space-y-0">
            {steps.map((step, i) => {
              const { Illustration } = step;
              return (
                <React.Fragment key={i}>
                  <div
                    ref={i === 0 ? stepRefs[0] : i === 1 ? stepRefs[1] : stepRefs[2]}
                    className={`relative rounded-2xl bg-white/[0.03] ${step.borderColor} border backdrop-blur-sm overflow-hidden shadow-xl ${step.glowColor} transition-all duration-700`}
                    style={{
                      opacity: stepVisibles[i] ? 1 : 0,
                      transform: stepVisibles[i] ? "translateY(0)" : "translateY(40px)",
                    }}
                  >
                    <div className={`h-1 bg-gradient-to-r ${step.gradient}`} />
                    <span className="absolute top-4 right-4 text-6xl font-extrabold text-white/[0.04] font-display select-none pointer-events-none leading-none">
                      {step.num}
                    </span>
                    <div className="p-5">
                      <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${step.gradient} text-white mb-4`}>
                        Step {step.num}
                      </div>
                      <Illustration active={stepVisibles[i]} />
                      <h3 className="text-lg font-bold text-white mt-4 mb-2 font-display">
                        {step.title}
                      </h3>
                      <p className="text-sm text-white/40 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                  {i < steps.length - 1 && <VerticalLine active={sectionVisible} />}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
