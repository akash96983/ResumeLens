import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);

/**
 * Sends a prompt to Gemini and expects a JSON response.
 * @param prompt - The full prompt including system instructions
 * @returns Parsed JSON response
 */
export async function getGeminiResponse(prompt: string) {
    if (!apiKey) {
        throw new Error("GEMINI_API_KEY is not defined in environment variables.");
    }

    const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        generationConfig: { responseMimeType: "application/json" },
    });

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        return JSON.parse(text);
    } catch (error) {
        console.error("Gemini AI Error:", error);
        throw new Error("Failed to get response from AI service.");
    }
}
