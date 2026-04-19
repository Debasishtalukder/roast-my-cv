import React from "react";

const ACCEPTED_TYPES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/msword",
];

export default function Hero({ onFileSelect }) {
  const [isDragging, setIsDragging] = React.useState(false);
  const fileInputRef = React.useRef(null);

  function handleDragOver(e) {
    e.preventDefault();
    setIsDragging(true);
  }

  function handleDragLeave(e) {
    e.preventDefault();
    setIsDragging(false);
  }

  function handleDrop(e) {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) onFileSelect(file);
  }

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (file) onFileSelect(file);
  }

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden px-4 sm:px-6 lg:px-8">
      {/* Floating blobs */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-blob" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-primary/15 rounded-full blur-3xl animate-blob [animation-delay:2s]" />
      <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-primary/8 rounded-full blur-2xl animate-blob [animation-delay:4s]" />

      <div className="relative z-10 max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center py-20">
        {/* Left content */}
        <div className="animate-fade-in">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight">
            <span className="bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
              Roast
            </span>{" "}
            My CV
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-text-secondary max-w-lg leading-relaxed">
            Upload your CV and let AI brutally roast it — then actually fix it.
          </p>

          {/* Upload area */}
          <div
            className={`mt-10 relative rounded-2xl border-2 border-dashed transition-all duration-300 cursor-pointer p-8 text-center ${
              isDragging
                ? "border-primary bg-primary/10 scale-[1.02]"
                : "border-primary/30 bg-card/60 hover:border-primary/60 hover:bg-card/80"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            role="button"
            tabIndex={0}
            aria-label="Upload your CV file"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") fileInputRef.current?.click();
            }}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.docx,.doc"
              className="hidden"
              onChange={handleFileChange}
            />
            <div className="flex flex-col items-center gap-3">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <p className="font-semibold text-text">
                {isDragging ? "Drop it like it's hot!" : "Drag & drop your CV here"}
              </p>
              <p className="text-sm text-text-secondary">or click to browse • PDF & DOCX</p>
            </div>
          </div>

          <button
            onClick={() => fileInputRef.current?.click()}
            className="mt-6 px-8 py-4 bg-primary text-white font-semibold rounded-xl text-lg shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300 animate-pulse-soft hover:animate-none hover:scale-105 active:scale-95"
          >
            🔥 Upload & Get Roasted
          </button>
        </div>

        {/* Right side — phone mockup */}
        <div className="hidden lg:flex justify-center animate-slide-up [animation-delay:0.3s]">
          <div className="relative w-72">
            {/* Phone frame */}
            <div className="bg-card rounded-[2.5rem] p-3 shadow-2xl shadow-primary/10 border border-primary/10">
              <div className="bg-bg rounded-[2rem] overflow-hidden">
                {/* Status bar */}
                <div className="bg-primary/5 px-6 py-3 flex justify-between items-center text-xs text-text-secondary">
                  <span>9:41</span>
                  <div className="flex gap-1">
                    <div className="w-4 h-2 bg-text-secondary/40 rounded-sm" />
                    <div className="w-2 h-2 bg-text-secondary/40 rounded-full" />
                  </div>
                </div>
                {/* App content preview */}
                <div className="p-5 space-y-4">
                  <div className="text-center">
                    <p className="text-sm font-bold text-primary">🔥 Roast My CV</p>
                  </div>
                  <div className="bg-card rounded-xl p-3 shadow-sm">
                    <p className="text-xs font-semibold text-roast mb-1">The Roast</p>
                    <p className="text-[10px] text-text-secondary leading-relaxed">
                      "Your CV says 'detail-oriented' but you misspelled 'experience'..."
                    </p>
                  </div>
                  <div className="bg-card rounded-xl p-3 shadow-sm">
                    <p className="text-xs font-semibold text-tips mb-1">Fix It</p>
                    <p className="text-[10px] text-text-secondary leading-relaxed">
                      1. Quantify your achievements with real numbers...
                    </p>
                  </div>
                  <div className="flex justify-center">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-xs">▶️</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Glow effect */}
            <div className="absolute -inset-4 bg-primary/5 rounded-[3rem] blur-2xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
