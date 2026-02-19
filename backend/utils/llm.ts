import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.LLM_API_KEY });

const taskSchema = {
  type: "array",
  items: {
    type: "object",
    properties: {
      id: { type: "string" },
      description: { type: "string" },
      priority: {
        type: "string",
        enum: ["low", "medium", "high"],
      },
      dependencies: {
        type: "array",
        items: { type: "string" },
      },
    },
    required: ["id", "description", "priority", "dependencies"],
  },
};

export const generateTasksFromLLM = async (transcript: string): Promise<string> => {
  const prompt = `
You are a system that extracts tasks from meeting transcripts.

Return ONLY valid JSON.

Return an array of objects.

Each object must have:
- id: string (task1, task2, ...)
- description: string (short title of the task)
- priority: "low" | "medium" | "high"
- dependencies: array of ids

Do not include markdown.
Do not include explanation.
Do not include comments.

Transcript:
${transcript}
`;

  // or gemini-2.5-flash
  const model = "gemini-3-flash-preview";
  const response = await ai.models.generateContent({
    model,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseJsonSchema: taskSchema,
    },
  });

  const text = response.text || "";

  return JSON.parse(text);
};
