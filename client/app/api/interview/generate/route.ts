import { NextRequest, NextResponse } from "next/server";
import { getGeminiResponse } from "@/lib/gemini";
import { INTERVIEW_PROMPT } from "@/lib/prompts";

export async function POST(req: NextRequest) {
    try {
        const { missingKeywords, jobDescription } = await req.json();

        if (!missingKeywords || !jobDescription) {
            return NextResponse.json(
                { error: "Missing keywords and job description are required." },
                { status: 400 }
            );
        }

        const prompt = INTERVIEW_PROMPT
            .replace("{missingKeywords}", missingKeywords.join(", "))
            .replace("{jobDescription}", jobDescription);

        const result = await getGeminiResponse(prompt);

        return NextResponse.json(result);
    } catch (error) {
        console.error("Interview Generation Error:", error);
        return NextResponse.json(
            { error: "Failed to generate interview questions." },
            { status: 500 }
        );
    }
}
