import { GoogleGenAI } from "@google/genai";
import { NewsItem } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const PROMPT = `
You are an expert AI News Aggregator. Your task is to find the top 25 trending news stories in the world of Artificial Intelligence from the last 72 hours.

Please follow these instructions exactly:
1.  Use your search tool to scan at least 10-20 different reputable tech news sources (e.g., TechCrunch, Wired, The Verge, MIT Technology Review, Ars Technica, etc.).
2.  Identify the 25 most significant and frequently mentioned stories. Rank them by significance, with rank 1 being the most significant.
3.  For each story, provide a concise, compelling headline and a 2-3 sentence summary.
4.  For each story, provide a list of 2-4 original sources where the story was reported. CRITICAL: The 'url' for each source must be a direct, functioning deep link to the specific news article, not a generic homepage.
5.  Format your entire response as a single JSON object string. The JSON object should have a single key "stories" which is an array of story objects. Do not include any text, explanation, or markdown formatting like \`\`\`json or \`\`\` before or after the JSON string. Your response must be only the JSON content.

Each story object in the array must have the following structure:
{
  "rank": number,
  "headline": "string",
  "summary": "string",
  "sources": [
    {
      "name": "string",
      "url": "string"
    }
  ]
}
`;

export const fetchAINews = async (): Promise<NewsItem[]> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: PROMPT,
      config: {
        tools: [{googleSearch: {}}],
        temperature: 0.2,
      },
    });

    let jsonString = response.text.trim();
    
    // Clean potential markdown formatting
    if (jsonString.startsWith("```json")) {
      jsonString = jsonString.substring(7);
      if (jsonString.endsWith("```")) {
        jsonString = jsonString.substring(0, jsonString.length - 3);
      }
    }
    
    const parsedData = JSON.parse(jsonString);

    if (parsedData && Array.isArray(parsedData.stories)) {
       // Basic validation
      const validatedStories = parsedData.stories.filter((story: any) => 
        typeof story.rank === 'number' &&
        typeof story.headline === 'string' &&
        typeof story.summary === 'string' &&
        Array.isArray(story.sources)
      );
      return validatedStories;
    } else {
      throw new Error("Failed to parse news data: unexpected format.");
    }

  } catch (error) {
    console.error("Error fetching or parsing AI news:", error);
    throw new Error("Could not fetch or parse AI news from the provider. The AI might be having a moment of introspection. Please try again later.");
  }
};