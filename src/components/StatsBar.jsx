import React from "react";

const stats = [
  { emoji: "🔥", value: 12400, suffix: "+", label: "CVs Roasted" },
  { emoji: "📈", value: 94, suffix: "%", label: "Got Better Job Responses" },
  { emoji: "⚡", prefix: "< ", value: 30, suffix: " sec", label: "Roast Time" },
  { emoji: "🎁", value: 2, suffix: "", label: "Free Roasts" },
];

function useCountUp(target, isVisible, duration = 2000) {
  const [count, setCount] = React.useState(0);
  const hasAnimated = React.useRef(false);

  React.useEffect(() => {
    if (!isVisible || hasAnimated.current) return;
    hasAnimated.current = true;

    const start = performance.now();
    function tick(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [isVisible, target, duration]);

  return count;
}

function StatCard({ emoji, value, suffix, prefix, label, isVisible, delay }) {
  const count = useCountUp(value, isVisible, 2000);

  return (
    <div
      className="flex-shrink-0 w-56 sm:w-auto sm:flex-1 flex flex-col items-center gap-2 px-6 py-6 rounded-2xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm transition-all duration-700"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
        transitionDelay: `${delay}ms`,
      }}
    >
      <span className="text-3xl">{emoji}</span>
      <p className="text-2xl sm:text-3xl font-extrabold text-white tabular-nums font-display">
        {prefix || ""}{count.toLocaleString()}{suffix}
      </p>
      <p className="text-xs sm:text-sm text-white/40 font-medium text-center">{label}</p>
    </div>
  );
}

export default function StatsBar() {
  const [isVisible, setIsVisible] = React.useState(false);
  const ref = React.useRef(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative -mt-16 z-20 px-4 sm:px-6 lg:px-8 pb-12">
      <div className="max-w-5xl mx-auto">
        {/* Desktop: grid layout */}
        <div className="hidden sm:grid sm:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <StatCard key={i} {...stat} isVisible={isVisible} delay={i * 120} />
          ))}
        </div>

        {/* Mobile: horizontal scrolling ticker */}
        <div className="sm:hidden overflow-hidden">
          <div
            className="flex gap-4 w-max"
            style={{
              animation: isVisible ? "marquee 20s linear infinite" : "none",
            }}
          >
            {/* Duplicate for seamless loop */}
            {[...stats, ...stats].map((stat, i) => (
              <StatCard key={i} {...stat} isVisible={isVisible} delay={0} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
