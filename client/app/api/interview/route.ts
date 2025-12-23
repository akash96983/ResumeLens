import { NextRequest, NextResponse } from "next/server";
import { getGeminiResponse } from "@/lib/gemini";
import { INTERVIEW_PROMPT } from "@/lib/prompts";

export async function POST(req: NextRequest) {
    try {
        const { missingKeywords, jobDescription } = await req.json();

        if (!jobDescription) {
            return NextResponse.json(
                { error: "Job Description is required." },
                { status: 400 }
            );
        }

        // Prepare Prompt
        const prompt = INTERVIEW_PROMPT
            .replace("{missingKeywords}", JSON.stringify(missingKeywords || []))
            .replace("{jobDescription}", jobDescription);

        // Get AI Interview Questions
        const interviewData = await getGeminiResponse(prompt);

        return NextResponse.json(interviewData);
    } catch (error) {
        console.error("Interview Generation Error:", error);
        return NextResponse.json(
            { error: "Failed to generate interview questions." },
            { status: 500 }
        );
    }
}
