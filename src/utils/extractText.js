import * as pdfjsLib from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import mammoth from "mammoth";

// Use the bundled worker via Vite's ?url import
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

/**
 * Extract text from a PDF file
 */
async function extractFromPDF(file) {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  const pages = [];

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const text = content.items.map((item) => item.str).join(" ");
    pages.push(text);
  }

  return pages.join("\n\n");
}

/**
 * Extract text from a DOCX file
 */
async function extractFromDOCX(file) {
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer });
  return result.value;
}

/**
 * Extract text from a CV file (PDF or DOCX)
 */
export async function extractText(file) {
  const name = file.name.toLowerCase();

  if (name.endsWith(".pdf")) {
    return extractFromPDF(file);
  } else if (name.endsWith(".docx") || name.endsWith(".doc")) {
    return extractFromDOCX(file);
  } else {
    throw new Error("Unsupported file type. Please upload a PDF or DOCX file.");
  }
}
