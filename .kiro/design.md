# Roast My CV — Design Document

## Architecture
Single-page React application built with Vite and TailwindCSS v4. Fully client-side — no backend server required.

## Tech Stack
- **Framework:** React 19 + Vite 8
- **Styling:** TailwindCSS v4 (with @tailwindcss/vite plugin)
- **PDF Parsing:** pdfjs-dist
- **DOCX Parsing:** mammoth.js
- **AI:** Google Gemini 1.5 Flash API
- **TTS:** ElevenLabs API
- **Deployment:** Vercel (static)

## Color Palette
| Token | Hex | Usage |
|-------|-----|-------|
| bg | #EEF0FB | Page background |
| primary | #7C6FCD | Buttons, accents |
| primary-light | #9B8FE0 | Hover states, gradients |
| card | #FFFFFF | Card backgrounds |
| text | #1A1A2E | Primary text |
| text-secondary | #6B6B8A | Secondary text |
| roast | #E24B4A | Roast text, warnings |
| tips | #1D9E75 | Improvement tips |

## Component Architecture
```
App
├── Header (fixed, credits display)
├── Hero (headline, upload area, phone mockup)
├── HowItWorks (3-step cards)
├── FeaturesBento (bento grid layout)
├── UploadSection / ResultTabs (conditional)
├── CreditModal (overlay)
└── Footer
```

## Data Flow
1. User uploads file → extractText() parses PDF/DOCX
2. Text sent to Gemini API → roast + tips generated in parallel
3. Results displayed in tabbed interface
4. Optional: roast sent to ElevenLabs → audio played in browser
5. Credit deducted from localStorage

## Animation Strategy
- Hero: fade-in + slide-up on load
- Upload button: pulse animation (CSS)
- Cards: hover lift + shadow transitions
- Loading: spinning fire emoji + rotating funny messages
- Results: slide-up reveal
- Modal: backdrop fade + content slide-up

## File Structure
```
src/
├── components/
│   ├── Hero.jsx
│   ├── HowItWorks.jsx
│   ├── FeaturesBento.jsx
│   ├── UploadSection.jsx
│   ├── ResultTabs.jsx
│   ├── CreditModal.jsx
│   └── Footer.jsx
├── utils/
│   ├── extractText.js
│   ├── geminiApi.js
│   ├── elevenLabsApi.js
│   └── creditSystem.js
├── App.jsx
├── main.jsx
└── index.css
```
