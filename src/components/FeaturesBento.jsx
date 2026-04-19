import React from "react";

const features = [
  {
    title: "Brutal Honest Roast",
    description: "AI roasts your CV with no filter. Every vague claim and cringe phrase gets called out.",
    icon: "🔥",
    className: "sm:col-span-2 sm:row-span-2",
    accent: "bg-roast/10 text-roast",
  },
  {
    title: "Real Improvement Tips",
    description: "After the roast, get 5 actionable fixes to make your CV actually stand out.",
    icon: "💡",
    className: "sm:col-span-1",
    accent: "bg-tips/10 text-tips",
  },
  {
    title: "Voice Roast",
    description: "ElevenLabs AI reads the roast out loud. It hits different when you hear it.",
    icon: "🎙️",
    className: "sm:col-span-1",
    accent: "bg-primary/10 text-primary",
  },
  {
    title: "Secure & Private",
    description: "Your CV is never stored on any server. Everything runs client-side. We forget you exist.",
    icon: "🔒",
    className: "sm:col-span-1",
    accent: "bg-primary/10 text-primary",
  },
  {
    title: "Instant Results",
    description: "Get your roast in under 30 seconds. Because your CV doesn't deserve more time than that.",
    icon: "⚡",
    className: "sm:col-span-1",
    accent: "bg-amber-500/10 text-amber-600",
  },
  {
    title: "2 Free Roasts",
    description: "Every user gets 2 free roasts. Share on X to unlock more. We're generous like that.",
    icon: "🎁",
    className: "sm:col-span-2",
    accent: "bg-primary/10 text-primary",
  },
];

export default function FeaturesBento() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-card/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
          Features
        </h2>
        <p className="text-text-secondary text-center mb-16 max-w-xl mx-auto">
          Everything you need to turn your cringe CV into a career weapon.
        </p>

        <div className="grid sm:grid-cols-4 gap-4">
          {features.map((feature, i) => (
            <div
              key={i}
              className={`bg-card rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${feature.className}`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className={`w-12 h-12 rounded-xl ${feature.accent} flex items-center justify-center text-2xl mb-4`}>
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
