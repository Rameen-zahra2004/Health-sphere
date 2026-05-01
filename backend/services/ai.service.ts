import axios, { AxiosResponse } from "axios";

/**
 * 🧠 Strict AI Message Type
 */
export interface AIMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

/**
 * 🧾 OpenAI Response Types
 */
interface OpenAIChoice {
  message: {
    content: string;
  };
}

interface OpenAIResponse {
  choices: OpenAIChoice[];
}

/**
 * 🚀 Production AI Service
 */
export const generateAIResponse = async (
  messages: AIMessage[]
): Promise<string> => {
  // 🔐 API KEY VALIDATION
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is missing in environment variables");
  }

  // 🛡️ Input validation
  if (!Array.isArray(messages) || messages.length === 0) {
    throw new Error("Messages must be a non-empty array");
  }

  for (const msg of messages) {
    if (
      typeof msg !== "object" ||
      typeof msg.role !== "string" ||
      typeof msg.content !== "string"
    ) {
      throw new Error("Invalid message format");
    }
  }

  try {
    const response: AxiosResponse<OpenAIResponse> = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o-mini",
        messages,
        temperature: 0.7
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        },
        timeout: 30000 // ⏱️ production safety
      }
    );

    const content = response.data?.choices?.[0]?.message?.content;

    if (!content || typeof content !== "string") {
      throw new Error("Invalid response from OpenAI API");
    }

    return content;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("OpenAI Axios Error:", error.response?.data || error.message);
    } else {
      console.error("Unknown OpenAI Error:", error);
    }

    throw new Error("Failed to generate AI response");
  }
};