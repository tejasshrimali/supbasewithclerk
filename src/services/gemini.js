import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: "AIzaSyDIcTTwwC7HUopR2efwhbSIoSa1Kgi5zNY",
});

export async function generateResponse(prompt) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash-001",
    contents: prompt,
  });
  return response.text;
}