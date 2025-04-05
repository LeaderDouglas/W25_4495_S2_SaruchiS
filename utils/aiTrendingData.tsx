import { GoogleGenerativeAI } from "@google/generative-ai";

// Job Recommendation Interface
export interface JobRecommendationProps {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  skills: string[];
  description: string;
  matchPercentage: number;
}

export async function generateTrendingJobRecommendations(
  interests: string[],
  apiKey: string,
  skills:string,
  education:string,
  other:string,
  country:string,
): Promise<JobRecommendationProps[]> {
  // Initialize Gemini AI
  const genAI = new GoogleGenerativeAI(apiKey);

  try {
    // Create the generative model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Construct the prompt
    const prompt = `Generate a detailed JSON array of current trending job recommendations based on country:${country}. 

    Provide recommendations in this exact JSON format:
    [
      {
        "id": "unique_uid_string",
        "title": "Job Title",
        "company": "Company Name",
        "location": "City, State",
        "salary": "Salary Range",
        "skills": ["Skill1", "Skill2"],
        "description": "Job description",
        "matchPercentage": 85
      }
    ]

    Requirements:
    - Generate 10-20 job recommendations
    - Recommendations must be directly relevant to: ${country}
    - Include diverse roles across these interests
    - Provide realistic, current job market information`;

    // Generate content with safety settings and configuration
    const result = await model.generateContent(prompt);

    const response = await result.response.text();

    // More robust JSON extraction
    const cleanResponse = response.replace(/```json|```/g, "").trim();

    try {
      const parsedRecommendations = JSON.parse(
        cleanResponse
      ) as JobRecommendationProps[];

      // Validate the parsed recommendations
      if (
        !Array.isArray(parsedRecommendations) ||
        parsedRecommendations.length === 0
      ) {
        throw new Error("Invalid recommendations format");
      }

      return parsedRecommendations;
    } catch (parseError) {
      console.error("JSON Parsing Error:", parseError);
      console.log("Raw response:", cleanResponse);
      throw new Error("Failed to parse job recommendations");
    }
  } catch (error) {
    console.error("Error generating job recommendations:", error);
    throw error;
  }
}
