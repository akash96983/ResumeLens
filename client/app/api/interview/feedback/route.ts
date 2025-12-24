import { NextRequest, NextResponse } from "next/server";
import { getGeminiResponse } from "@/lib/gemini";
import { STAR_FEEDBACK_PROMPT } from "@/lib/prompts";

export async function POST(req: NextRequest) {
    try {
        const { question, answer } = await req.json();

        if (!question || !answer) {
            return NextResponse.json(
                { error: "Question and answer are required." },
                { status: 400 }
            );
        }

        const prompt = STAR_FEEDBACK_PROMPT
            .replace("{question}", question)
            .replace("{answer}", answer);

        const result = await getGeminiResponse(prompt);

        return NextResponse.json(result);
    } catch (error) {
        console.error("Interview Feedback Error:", error);
        return NextResponse.json(
            { error: "Failed to get interview feedback." },
            { status: 500 }
        );
    }
}
