import { GoogleGenAI, Type } from "@google/genai";
import { BabyName } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const nameGenerationSchema = {
    type: Type.ARRAY,
    items: {
      type: Type.OBJECT,
      properties: {
        name: {
          type: Type.STRING,
          description: "The generated baby name."
        },
        meaning: {
          type: Type.STRING,
          description: "The meaning of the baby name."
        },
        imagePrompt: {
            type: Type.STRING,
            description: "A creative and artistic prompt for an image generation model, based on the name's meaning and origin."
        }
      },
      required: ["name", "meaning", "imagePrompt"],
    },
};

export const generateBabyNames = async (culture: string, startingLetter: string): Promise<BabyName[]> => {
  const prompt = `Generate 6 baby names from ${culture} culture that start with the letter '${startingLetter}'. For each name, provide its meaning. Also, for each name, create a short, creative, and descriptive prompt for an image generation model to create an abstract and artistic visual representation based on the name's meaning and origin. This prompt should describe a beautiful and ethereal scene or concept.`;

  try {
    // Step 1: Generate names, meanings, and image prompts
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: nameGenerationSchema,
        temperature: 0.8,
        topP: 0.9,
      },
    });

    const resultText = response.text.trim();
    if (!resultText) {
      throw new Error("The API returned an empty response. Please try a different query.");
    }
    
    type NameData = { name: string; meaning: string; imagePrompt: string };
    const parsedNameData: NameData[] = JSON.parse(resultText);

    // Step 2: Generate images in parallel
    const namesWithImages = await Promise.all(
        parsedNameData.map(async (nameData) => {
          const imageResponse = await ai.models.generateImages({
            model: 'imagen-4.0-generate-001',
            prompt: nameData.imagePrompt,
            config: {
              numberOfImages: 1,
              outputMimeType: 'image/jpeg',
              aspectRatio: '1:1',
            },
          });

          const base64ImageBytes = imageResponse.generatedImages[0].image.imageBytes;
          const imageUrl = `data:image/jpeg;base64,${base64ImageBytes}`;

          return {
            name: nameData.name,
            meaning: nameData.meaning,
            imageUrl: imageUrl,
          };
        })
      );

    return namesWithImages;

  } catch (error) {
    console.error("Error generating baby names:", error);
    if (error instanceof Error && error.message.includes('JSON')) {
        throw new Error("Failed to process the response from the AI. Please try again.");
    }
    throw new Error("Could not generate names and images. The AI may be unavailable or the request is invalid.");
  }
};