const { GoogleGenerativeAI, SchemaType } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// 1. Define the schema natively using Google's SchemaType
const interviewReportSchema = {
  type: SchemaType.OBJECT,
  properties: {
    matchScore: {
      type: SchemaType.NUMBER,
      description: "The match score of the candidate from 0 to 100",
    },
    technicalQuestions: {
      type: SchemaType.ARRAY,
      description: "Technical questions asked during the interview",
      items: {
        type: SchemaType.OBJECT,
        properties: {
          question: {
            type: SchemaType.STRING,
            description:
              "The technical question that can be asked during the interview",
          },
          intention: {
            type: SchemaType.STRING,
            description: "The intention of this question being asked",
          },
          answer: {
            type: SchemaType.STRING,
            description: "How to answer this question",
          },
        },
        required: ["question", "intention", "answer"],
      },
    },
    behavioralQuestions: {
      type: SchemaType.ARRAY,
      description: "Behavioral questions asked during the interview",
      items: {
        type: SchemaType.OBJECT,
        properties: {
          question: {
            type: SchemaType.STRING,
            description:
              "The behavioral question that can be asked during the interview",
          },
          intention: {
            type: SchemaType.STRING,
            description: "The intention of this question being asked",
          },
          answer: {
            type: SchemaType.STRING,
            description: "How to answer this question",
          },
        },
        required: ["question", "intention", "answer"],
      },
    },
    skillGaps: {
      type: SchemaType.ARRAY,
      description: "Skill gaps identified",
      items: {
        type: SchemaType.OBJECT,
        properties: {
          skill: {
            type: SchemaType.STRING,
            description: "Mention the skill gap",
          },
          // Notice how we handle the enum here
          severity: {
            type: SchemaType.STRING,
            description: "MUST BE EXACTLY ONE OF: 'low', 'medium', 'high'",
          },
        },
        required: ["skill", "severity"],
      },
    },
    preparationPlan: {
      type: SchemaType.ARRAY,
      description: "A day-wise preparation plan",
      items: {
        type: SchemaType.OBJECT,
        properties: {
          day: { type: SchemaType.NUMBER, description: "Day number" },
          focus: {
            type: SchemaType.STRING,
            description: "Focus area for the day",
          },
          tasks: {
            type: SchemaType.ARRAY,
            items: { type: SchemaType.STRING },
          },
        },
        required: ["day", "focus", "tasks"],
      },
    },
  },
  // Enforce the top-level keys
  required: [
    "matchScore",
    "technicalQuestions",
    "behavioralQuestions",
    "skillGaps",
    "preparationPlan",
  ],
};

async function generateInterviewReport({
  resume,
  selfDescription,
  jobDescription,
}) {
  // 2. Initialize the model with the native schema
  const model = genAI.getGenerativeModel({
    model: "gemini-3-flash-preview", // Use the active model
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: interviewReportSchema,
    },
  });

  const prompt = `Generate a detailed interview report mapping to the required JSON schema based on:
                    Resume: ${resume}
                    Self-Description: ${selfDescription}
                    Job Description: ${jobDescription}`;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    // console.log(text);

    const parsedResponse = JSON.parse(text);

    return parsedResponse;
  } catch (error) {
    console.error("Error generating or parsing report:", error);
    throw error;
  }
}

module.exports = { generateInterviewReport };
