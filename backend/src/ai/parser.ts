export function parseAIResponse(response: string) {
  try {
    // Remove markdown code fences if Gemini returns them
    const cleaned = response
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(cleaned);
  } catch (error) {
    throw new Error("Failed to parse AI response.");
  }
}
