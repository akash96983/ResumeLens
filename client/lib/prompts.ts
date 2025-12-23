export const ANALYSIS_PROMPT = `
You are an expert HR Recruitment Specialist and ATS Optimizer. 
Analyze the following Resume against the Job Description.

Resume Text:
{resumeText}

Job Description:
{jobDescription}

Your task is to:
1. Provide a match score (0-100).
2. Identify missing keywords or skills essential for the role.
3. Provide a section-by-section critique of the resume relative to this JD.

Return the output in the following JSON format:
{
  "matchScore": number,
  "missingKeywords": string[],
  "sectionCritique": {
    "Skills": string,
    "Experience": string,
    "Education": string,
    "General": string
  }
}
`;

export const INTERVIEW_PROMPT = `
You are a Professional Technical Interviewer. 
Based on the following resume gaps and job requirements, generate 3-5 targeted interview questions.

Resume Gaps / Missing Skills:
{missingKeywords}

Job Description:
{jobDescription}

Ensure the questions focus on exploring the candidate's potential in those weak areas.

Return the output in the following JSON format:
{
  "questions": [
    {
      "id": string,
      "question": string,
      "focusArea": string
    }
  ]
}
`;

export const STAR_FEEDBACK_PROMPT = `
You are a career mentor. provide feedback on this interview answer using the STAR (Situation, Task, Action, Result) framework.

Question: {question}
Candidate Answer: {answer}

Return the output in the following JSON format:
{
  "feedback": {
    "situation": string,
    "task": string,
    "action": string,
    "result": string,
    "overallAdvise": string
  },
  "score": number
}
`;
