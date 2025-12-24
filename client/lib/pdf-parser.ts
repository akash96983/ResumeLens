// Provide polyfills for browser APIs expected by some versions of pdfjs-dist used by pdf-parse
if (typeof global !== 'undefined') {
    if (!(global as any).DOMMatrix) (global as any).DOMMatrix = class DOMMatrix { };
    if (!(global as any).ImageData) (global as any).ImageData = class ImageData { };
    if (!(global as any).Path2D) (global as any).Path2D = class Path2D { };
}

const pdf = require('pdf-parse');

/**
 * Extracts text from a PDF buffer.
 * @param buffer - The PDF file buffer
 * @returns Promise with extracted text
 */
export async function extractTextFromPDF(buffer: Buffer): Promise<string> {
    try {
        const data = await pdf(buffer);
        return data.text;
    } catch (error) {
        console.error('Error parsing PDF:', error);
        throw new Error('Failed to parse PDF resume.');
    }
}
