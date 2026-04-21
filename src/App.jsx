import React from "react";
import { LiquidMetalButton } from "./components/ui/liquid-metal-button.jsx";
import Hero from "./components/Hero.jsx";
import StatsBar from "./components/StatsBar.jsx";
import HowItWorks from "./components/HowItWorks.jsx";
import FeaturesBento from "./components/FeaturesBento.jsx";
import UploadSection from "./components/UploadSection.jsx";
import ResultTabs from "./components/ResultTabs.jsx";
import CreditModal from "./components/CreditModal.jsx";
import Footer from "./components/Footer.jsx";
import { extractText } from "./utils/extractText.js";
import { generateRoast, generateTips } from "./utils/geminiApi.js";
import { initUser, getCredits, useCredit, hasCredits } from "./utils/creditSystem.js";

function ScrollProgressBar() {
  const [progress, setProgress] = React.useState(0);
  React.useEffect(() => {
    function onScroll() {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? (window.scrollY / h) * 100 : 0);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-[2px] pointer-events-none">
      <div className="h-full transition-[width] duration-100" style={{ width: `${progress}%`, background: "linear-gradient(90deg, #FF4500, #6C3AED)" }} />
    </div>
  );
}

export default function App() {
  const [credits, setCredits] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);
  const [roast, setRoast] = React.useState(null);
  const [tips, setTips] = React.useState(null);
  const [cvText, setCvText] = React.useState("");
  const [error, setError] = React.useState(null);
  const [showCreditModal, setShowCreditModal] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    initUser();
    setCredits(getCredits());
    function onScroll() { setScrolled(window.scrollY > 60); }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  async function handleFileSelect(file) {
    if (!hasCredits()) { setShowCreditModal(true); return; }
    if (file.size > 10 * 1024 * 1024) { setError("File too large. Max 10MB."); return; }
    const n = file.name.toLowerCase();
    if (!n.endsWith(".pdf") && !n.endsWith(".docx") && !n.endsWith(".doc")) { setError("Unsupported file type."); return; }
    setError(null); setIsLoading(true); setRoast(null); setTips(null); setCvText("");
    document.getElementById("upload")?.scrollIntoView({ behavior: "smooth" });
    try {
      const text = await extractText(file);
      if (!text || text.trim().length < 50) throw new Error("Could not extract enough text.");
      setCvText(text);
      const [r, t] = await Promise.all([generateRoast(text), generateTips(text)]);
      setRoast(r); setTips(t);
      useCredit(); setCredits(getCredits());
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally { setIsLoading(false); }
  }

  function handleReset() { setRoast(null); setTips(null); setCvText(""); setError(null); document.getElementById("upload")?.scrollIntoView({ behavior: "smooth" }); }

  const hasResults = roast && tips;

  return (
    <div className="min-h-screen bg-bg">
      <ScrollProgressBar />

      {/* Navbar */}
      <header
        className={`fixed top-[2px] left-0 right-0 z-40 transition-all duration-300 ${scrolled ? "border-b" : ""}`}
        style={{
          background: scrolled ? "rgba(255,255,255,0.85)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
          borderColor: scrolled ? "rgba(0,0,0,0.06)" : "transparent",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="/" className="text-lg font-bold font-display">
            <span className="text-accent">🔥 Roast</span>{" "}
            <span className="text-text">My CV</span>
          </a>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-text-body">
              <span className="font-bold text-text">{credits}</span> roast{credits !== 1 ? "s" : ""} left
            </span>
            <div className="hidden sm:block">
              <LiquidMetalButton label="Get Roasted" onClick={() => document.getElementById("upload")?.scrollIntoView({ behavior: "smooth" })} />
            </div>
          </div>
        </div>
      </header>

      <main>
        {hasResults ? (
          <ResultTabs roast={roast} tips={tips} cvText={cvText} onReset={handleReset} />
        ) : (
          <>
            <Hero onFileSelect={handleFileSelect} />
            <StatsBar />
            <HowItWorks />
            <FeaturesBento />
            {error && (
              <div className="max-w-2xl mx-auto px-4 mb-8">
                <div className="bg-red-50 border border-red-200 text-roast rounded-xl p-4 text-center text-sm">{error}</div>
              </div>
            )}
            <UploadSection onFileSelect={handleFileSelect} isLoading={isLoading} />
          </>
        )}
      </main>

      <Footer />
      <CreditModal isOpen={showCreditModal} onClose={() => setShowCreditModal(false)} onCreditAdded={() => setCredits(getCredits())} />
    </div>
  );
}
