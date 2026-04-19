import React from "react";

export default function Footer() {
  return (
    <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-primary/10">
      <div className="max-w-5xl mx-auto text-center">
        <p className="text-lg font-bold">
          <span className="bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
            Roast
          </span>{" "}
          My CV
        </p>
        <p className="text-sm text-text-secondary mt-2">
          Upload. Get roasted. Actually improve. 🔥
        </p>
        <p className="text-xs text-text-secondary/60 mt-6">
          © {new Date().getFullYear()} Roast My CV. Built with questionable life choices and AI.
        </p>
      </div>
    </footer>
  );
}
