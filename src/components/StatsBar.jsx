import React from "react";

const stats = [
  { emoji: "🔥", iconBg: "#FFF0E8", value: 12400, suffix: "+", label: "CVs Roasted", countUp: true },
  { emoji: "📈", iconBg: "#EEF2FF", value: 94, suffix: "%", label: "Got Better Responses", countUp: true },
  { emoji: "⚡", iconBg: "#FFFBEB", value: 30, prefix: "< ", suffix: " sec", label: "Roast Time", countUp: false },
  { emoji: "🎁", iconBg: "#FFF0E8", value: 2, suffix: "", label: "Free Roasts", countUp: true },
];

function useCountUp(target, active, duration = 1800) {
  const [count, setCount] = React.useState(0);
  const done = React.useRef(false);

  React.useEffect(() => {
    if (!active || done.current) return;
    done.current = true;
    const start = performance.now();
    function tick(now) {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.floor(eased * target));
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [active, target, duration]);

  return count;
}

function StatCard({ emoji, iconBg, value, suffix, prefix, label, countUp, isVisible, delay }) {
  const count = useCountUp(value, isVisible && countUp);
  const display = countUp ? `${prefix || ""}${count.toLocaleString()}${suffix}` : `${prefix || ""}${value}${suffix}`;

  return (
    <div
      className="flex flex-col gap-3 bg-white rounded-3xl px-6 py-7 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01]"
      style={{
        boxShadow: "0 2px 8px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.06)",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
        transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        transitionDelay: `${delay}ms`,
      }}
      onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.06), 0 20px 48px rgba(0,0,0,0.08)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.06)"; }}
    >
      {/* Icon */}
      <div className="w-11 h-11 rounded-xl flex items-center justify-center text-[22px]" style={{ background: iconBg }}>
        {emoji}
      </div>

      {/* Number */}
      <p className="text-4xl font-extrabold text-[#0A0A1A] tabular-nums font-display" style={{ letterSpacing: "-1px" }}>
        {display}
      </p>

      {/* Label */}
      <p className="text-[13px] font-medium uppercase text-[#94A3B8]" style={{ letterSpacing: "0.5px" }}>
        {label}
      </p>
    </div>
  );
}

export default function StatsBar() {
  const [isVisible, setIsVisible] = React.useState(false);
  const ref = React.useRef(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); obs.disconnect(); } },
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="px-4 sm:px-6 lg:px-8" style={{ background: "#F2F2F7", paddingTop: "60px", paddingBottom: "60px" }}>
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((stat, i) => (
            <StatCard key={i} {...stat} isVisible={isVisible} delay={i * 80} />
          ))}
        </div>
      </div>
    </section>
  );
}
