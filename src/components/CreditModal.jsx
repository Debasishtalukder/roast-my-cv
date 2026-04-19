import React from "react";
import { addCredit } from "../utils/creditSystem.js";

export default function CreditModal({ isOpen, onClose, onCreditAdded }) {
  if (!isOpen) return null;

  function handleShare() {
    const text = encodeURIComponent(
      "I just got my CV roasted by AI 🔥😂 Try it yourself at RoastMyCV!"
    );
    window.open(`https://twitter.com/intent/tweet?text=${text}`, "_blank");

    // Give credit after sharing (honor system)
    setTimeout(() => {
      addCredit(1);
      onCreditAdded();
      onClose();
    }, 2000);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-text/40 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-card rounded-3xl p-8 max-w-md w-full shadow-2xl animate-slide-up">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-bg flex items-center justify-center text-text-secondary hover:text-text transition-colors"
          aria-label="Close modal"
        >
          ✕
        </button>

        <div className="text-center">
          <div className="text-5xl mb-4">😢</div>
          <h3 className="text-2xl font-bold mb-2">Out of Roasts!</h3>
          <p className="text-text-secondary mb-6">
            You've used all your free roasts. Share on X to unlock 1 more roast.
          </p>

          <button
            onClick={handleShare}
            className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-[#1DA1F2] text-white rounded-xl font-semibold hover:bg-[#1a8cd8] transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            Share on X to Unlock
          </button>

          <p className="text-xs text-text-secondary mt-4">
            A new tab will open. Credit is added after sharing.
          </p>
        </div>
      </div>
    </div>
  );
}
