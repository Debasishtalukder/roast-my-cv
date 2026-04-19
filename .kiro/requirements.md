# Roast My CV — Requirements

## Overview
"Roast My CV" is a client-side web application that lets users upload their CV (PDF or DOCX), receive a brutally honest AI-generated roast, actionable improvement tips, and an optional voice roast via text-to-speech.

## Functional Requirements

### FR-1: CV Upload
- Users can upload CV files via drag-and-drop or file picker
- Supported formats: PDF (.pdf) and DOCX (.docx, .doc)
- Maximum file size: 10MB
- Text is extracted client-side using pdf.js (PDF) and mammoth.js (DOCX)

### FR-2: AI Roast Generation
- Extracted CV text is sent to Gemini 1.5 Flash API
- System generates a witty, sarcastic roast (under 300 words)
- System generates 5 actionable improvement tips
- Both calls run in parallel for speed

### FR-3: Voice Roast
- Users can play the roast as audio via ElevenLabs TTS API
- Uses "Rachel" voice (expressive)
- Audio plays in-browser

### FR-4: Credit System
- Each new user gets 2 free roasts (tracked via localStorage)
- Unique userId generated on first visit
- When credits = 0, modal prompts user to share on X for 1 more credit
- Remaining credits shown in header

### FR-5: Social Sharing
- Share roast on X/Twitter via intent URL
- Pre-filled tweet text

## Non-Functional Requirements

### NFR-1: Privacy
- No data stored on any server
- All processing is client-side
- CV text only sent to Gemini API for processing

### NFR-2: Performance
- Results delivered in under 30 seconds
- Parallel API calls for roast + tips

### NFR-3: Responsive Design
- Mobile-first responsive layout
- Works on all modern browsers

### NFR-4: Accessibility
- Keyboard-navigable upload areas
- ARIA labels on interactive elements
- Sufficient color contrast

### NFR-5: Deployment
- Deploy target: Vercel
- Static site, no server required
- API keys via environment variables
