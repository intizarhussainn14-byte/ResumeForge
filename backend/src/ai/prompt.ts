export function buildATSPrompt(resume: string, jobDescription: string) {
  return `
  You are an expert ATS (Applicant Tracking System) resume reviewer.
  
  Analyze the following resume against the given job description.
  
  Return ONLY valid JSON in this exact format:
  
  {
    "overallScore": number,
    "keywordScore": number,
    "skillsScore": number,
    "formattingScore": number,
    "missingKeywords": [],
    "strengths": [],
    "weaknesses": [],
    "suggestions": [],
    "optimizedResume": ""
  }
  
  Resume:
  ${resume}
  
  Job Description:
  ${jobDescription}
  `;
}
