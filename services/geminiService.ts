import { GoogleGenAI, Type } from "@google/genai";
import { BabyName, GenerationFilters } from '../types';
import { queryCuratedNames, getPopularityTrendForYear, CURRENT_YEAR } from './curatedNames';

export const getApiKey = (): string | null => {
  if (typeof window !== 'undefined') {
    const customKey = localStorage.getItem('lumina_custom_api_key');
    if (customKey && customKey.trim()) {
      return customKey.trim();
    }
  }
  return (process.env.API_KEY || process.env.GEMINI_API_KEY || '').trim() || null;
};

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
        description: "The deep cultural or poetic meaning of the baby name."
      },
      pronunciation: {
        type: Type.STRING,
        description: "Phonetic pronunciation guide (e.g., ah-oh-ee)."
      },
      syllables: {
        type: Type.INTEGER,
        description: "Number of syllables (e.g., 2)."
      },
      gender: {
        type: Type.STRING,
        description: "Gender orientation: 'boy', 'girl', or 'unisex'."
      },
      vibe: {
        type: Type.STRING,
        description: "Aesthetic style (e.g., Nature & Floral, Ethereal & Zen, Royal & Timeless)."
      },
      numerologyNumber: {
        type: Type.INTEGER,
        description: "Pythagorean single-digit numerology life number between 1 and 9."
      },
      astrologySign: {
        type: Type.STRING,
        description: "Harmonious zodiac sign (e.g., Leo, Pisces, Taurus)."
      },
      element: {
        type: Type.STRING,
        description: "Classical element: 'Air', 'Water', 'Fire', or 'Earth'."
      },
      historicMeaning: {
        type: Type.STRING,
        description: "Historical origin or mythological context."
      },
      imagePrompt: {
        type: Type.STRING,
        description: "Creative ethereal prompt for an image model describing soft morning light, flowers, pastel dawn sky, or nature."
      }
    },
    required: ["name", "meaning", "pronunciation", "gender", "imagePrompt"],
  },
};

export const generateBabyNames = async (filters: GenerationFilters): Promise<BabyName[]> => {
  const { culture, letter, gender, vibe, count } = filters;
  const apiKey = getApiKey();
  const currentYear = CURRENT_YEAR;

  // Graceful fallback to rich curated engine if no API key is set
  if (!apiKey) {
    console.info("Lumina: No Gemini API Key detected. Using intelligent curated Apple engine.");
    // Simulate slight natural realistic thinking duration
    await new Promise(res => setTimeout(res, 600));
    return queryCuratedNames(culture, letter, gender, vibe, count);
  }

  const ai = new GoogleGenAI({ apiKey });

  const prompt = `Generate ${count} extraordinary baby names from ${culture || 'diverse'} culture that start with the letter '${letter.toUpperCase()}'.
${gender !== 'all' ? `All names must be specifically for ${gender}.` : 'Include a balanced mix of boy, girl, and unisex names.'}
${vibe && vibe !== 'all' ? `Align with the aesthetic vibe: ${vibe}.` : ''}
Dynamic Year Context: This is for babies born in ${currentYear} and future generations (${currentYear + 1} and beyond). Ensure names resonate with modern global elegance while honoring ancient linguistic roots.
For each name, provide:
1. Phonetic pronunciation.
2. Syllables count.
3. Astrological harmony and elemental energy (Air, Water, Fire, Earth).
4. Pythagorean numerology number (1-9).
5. A brief historical significance.
6. A serene, ethereal, artistic prompt for image generation focusing on gentle dawn skies, soft blooms, or celestial wonders.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: nameGenerationSchema,
        temperature: 0.85,
        topP: 0.95,
      },
    });

    const resultText = response.text?.trim();
    if (!resultText) {
      throw new Error("Empty response from AI");
    }

    interface GeneratedItem {
      name: string;
      meaning: string;
      pronunciation?: string;
      syllables?: number;
      gender?: 'boy' | 'girl' | 'unisex';
      vibe?: string;
      numerologyNumber?: number;
      astrologySign?: string;
      element?: 'Air' | 'Water' | 'Fire' | 'Earth';
      historicMeaning?: string;
      imagePrompt?: string;
    }

    const parsedData: GeneratedItem[] = JSON.parse(resultText);

    // Generate ethereal images with fallback to photography
    const namesWithImages = await Promise.all(
      parsedData.map(async (item, idx) => {
        let imageUrl = '';

        if (item.imagePrompt) {
          try {
            const imageResponse = await ai.models.generateImages({
              model: 'imagen-4.0-generate-001',
              prompt: `Ethereal dreamy wallpaper, ${item.imagePrompt}, soft morning cinematic lighting, pastel tones, 8k resolution, minimalist masterpiece`,
              config: {
                numberOfImages: 1,
                outputMimeType: 'image/jpeg',
                aspectRatio: '1:1',
              },
            });
            const base64Bytes = imageResponse.generatedImages[0].image.imageBytes;
            imageUrl = `data:image/jpeg;base64,${base64Bytes}`;
          } catch {
            // Imagen quota fallback: pick curated aesthetic photo
            imageUrl = '';
          }
        }

        // Curated fallback photography if Imagen didn't return
        if (!imageUrl) {
          const curatedPool = queryCuratedNames(culture, letter, gender, vibe, count);
          imageUrl = curatedPool[idx % curatedPool.length]?.imageUrl || 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=800&q=80';
        }

        const calculatedTrend = getPopularityTrendForYear(item.name, currentYear);

        const babyName: BabyName = {
          id: `ai-${item.name.toLowerCase()}-${Date.now()}-${idx}`,
          name: item.name,
          meaning: item.meaning,
          origin: culture || 'Global Heritage',
          gender: (item.gender as 'boy' | 'girl' | 'unisex') || 'unisex',
          pronunciation: item.pronunciation || item.name.toLowerCase(),
          syllables: item.syllables || 2,
          vibe: item.vibe || vibe || 'Ethereal & Zen',
          imageUrl,
          popularityTrend: calculatedTrend,
          numerologyNumber: item.numerologyNumber || (idx % 9) + 1,
          astrologySign: item.astrologySign || 'Aries',
          element: item.element || 'Water',
          historicMeaning: item.historicMeaning || `Cherished in ${culture} traditions as a beacon of good fortune.`,
          famousNamesakes: []
        };

        return babyName;
      })
    );

    return namesWithImages;

  } catch (err) {
    console.warn("AI generation failed or quota reached. Falling back to curated engine:", err);
    // Graceful fallback to curated names so user experience is always seamless
    return queryCuratedNames(culture, letter, gender, vibe, count);
  }
};