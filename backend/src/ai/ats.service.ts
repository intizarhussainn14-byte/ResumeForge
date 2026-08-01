import ai from "../lib/gemini.js";
import { buildATSPrompt } from "./prompt.js";
import { parseAIResponse } from "./parser.js";

export async function analyzeResume(
  resume: string,
  jobDescription: string
) {
  const prompt = buildATSPrompt(resume, jobDescription);

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  const text = response.text;

  if (!text) {
    throw new Error("No response received from Gemini.");
  }

  return parseAIResponse(text);
}