import axios from "axios";
import { AIMessage, AIEngineOptions, OpenAIResponse } from "../../../types/aiTypes";

export const runAIEngine = async (
  messages: AIMessage[],
  options: AIEngineOptions = {}
): Promise<string> => {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error("OPENAI_API_KEY missing");
  }

  if (!Array.isArray(messages) || messages.length === 0) {
    throw new Error("Invalid messages");
  }

  const response = await axios.post<OpenAIResponse>(
    "https://api.openai.com/v1/chat/completions",
    {
      model: options.model ?? "gpt-4o-mini",
      messages,
      temperature: options.temperature ?? 0.7,
      max_tokens: options.maxTokens ?? 500
    },
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      timeout: 30000
    }
  );

  const content = response.data?.choices?.[0]?.message?.content;

  if (!content || typeof content !== "string") {
    throw new Error("Invalid OpenAI response");
  }

  return content;
};