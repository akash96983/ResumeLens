import { NextRequest, NextResponse } from "next/server";
import { extractTextFromPDF } from "@/lib/pdf-parser";
import { getGeminiResponse } from "@/lib/gemini";
import { ANALYSIS_PROMPT } from "@/lib/prompts";

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const resumeFile = formData.get("resume") as File;
        const jobDescription = formData.get("jobDescription") as string;

        if (!resumeFile || !jobDescription) {
            return NextResponse.json(
                { error: "Resume and Job Description are required." },
                { status: 400 }
            );
        }

        // Convert File to Buffer
        const arrayBuffer = await resumeFile.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Extract Text
        const resumeText = await extractTextFromPDF(buffer);

        // Prepare Prompt
        const prompt = ANALYSIS_PROMPT
            .replace("{resumeText}", resumeText)
            .replace("{jobDescription}", jobDescription);

        // Get AI Analysis
        const analysis = await getGeminiResponse(prompt);

        return NextResponse.json(analysis);
    } catch (error) {
        console.error("Analysis Error:", error);
        return NextResponse.json(
            { error: "Failed to analyze resume." },
            { status: 500 }
        );
    }
}
