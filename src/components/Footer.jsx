import React from "react";

export default function Footer() {
  return (
    <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-bg border-t border-border">
      <div className="max-w-5xl mx-auto text-center">
        <p className="text-lg font-bold font-display">
          <span className="text-accent">Roast</span>{" "}
          <span className="text-text">My CV</span>
        </p>
        <p className="text-sm text-text-muted mt-2">Upload. Get roasted. Actually improve. 🔥</p>
        <p className="text-xs text-text-muted/60 mt-6">© {new Date().getFullYear()} Roast My CV. Built with questionable life choices and AI.</p>
      </div>
    </footer>
  );
}
