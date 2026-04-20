import React from "react";
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

export default function App() {
  const [credits, setCredits] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);
  const [roast, setRoast] = React.useState(null);
  const [tips, setTips] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [showCreditModal, setShowCreditModal] = React.useState(false);

  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    initUser();
    setCredits(getCredits());

    function handleScroll() {
      setScrolled(window.scrollY > 100);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  async function handleFileSelect(file) {
    // Check credits
    if (!hasCredits()) {
      setShowCreditModal(true);
      return;
    }

    // Validate file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      setError("File too large. Please upload a file under 10MB.");
      return;
    }

    // Validate file type
    const name = file.name.toLowerCase();
    if (!name.endsWith(".pdf") && !name.endsWith(".docx") && !name.endsWith(".doc")) {
      setError("Unsupported file type. Please upload a PDF or DOCX file.");
      return;
    }

    setError(null);
    setIsLoading(true);
    setRoast(null);
    setTips(null);

    // Scroll to upload section
    document.getElementById("upload")?.scrollIntoView({ behavior: "smooth" });

    try {
      // Extract text
      const cvText = await extractText(file);

      if (!cvText || cvText.trim().length < 50) {
        throw new Error("Could not extract enough text from your CV. Try a different file.");
      }

      // Generate roast and tips in parallel
      const [roastResult, tipsResult] = await Promise.all([
        generateRoast(cvText),
        generateTips(cvText),
      ]);

      setRoast(roastResult);
      setTips(tipsResult);

      // Use a credit
      useCredit();
      setCredits(getCredits());
    } catch (err) {
      console.error("Processing failed:", err);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  function handleReset() {
    setRoast(null);
    setTips(null);
    setError(null);
    document.getElementById("upload")?.scrollIntoView({ behavior: "smooth" });
  }

  function handleCreditAdded() {
    setCredits(getCredits());
  }

  const hasResults = roast && tips;

  return (
    <div className="min-h-screen bg-bg">
      {/* Header bar */}
      <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-bg/80 backdrop-blur-md border-b border-primary/10"
          : "bg-transparent"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="/" className="text-lg font-bold">
            <span className="animate-ember">
              🔥 Roast
            </span>{" "}
            <span className={scrolled ? "text-text" : "text-white"}>My CV</span>
          </a>
          <div className="flex items-center gap-4">
            <span className={`text-sm font-medium ${scrolled ? "text-text-secondary" : "text-white/50"}`}>
              <span className={`font-bold ${scrolled ? "text-primary" : "text-white"}`}>{credits}</span> roast{credits !== 1 ? "s" : ""} left
            </span>
            <a
              href="#upload"
              className="hidden sm:inline-flex px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-light transition-colors"
            >
              Get Roasted
            </a>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main>
        <Hero onFileSelect={handleFileSelect} />
        <StatsBar />
        <HowItWorks />
        <FeaturesBento />

        {/* Error message */}
        {error && (
          <div className="max-w-2xl mx-auto px-4 mb-8">
            <div className="bg-roast/10 border border-roast/20 text-roast rounded-xl p-4 text-center text-sm">
              {error}
            </div>
          </div>
        )}

        {hasResults ? (
          <ResultTabs roast={roast} tips={tips} onReset={handleReset} />
        ) : (
          <UploadSection onFileSelect={handleFileSelect} isLoading={isLoading} />
        )}
      </main>

      <Footer />

      <CreditModal
        isOpen={showCreditModal}
        onClose={() => setShowCreditModal(false)}
        onCreditAdded={handleCreditAdded}
      />
    </div>
  );
}
