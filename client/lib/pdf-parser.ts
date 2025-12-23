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
