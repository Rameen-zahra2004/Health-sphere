import axios from "axios";
import dotenv from "dotenv";
import {
  AIMessage,
  AIEngineOptions,
  OpenAIResponse,
} from "../../../types/aiTypes";

dotenv.config();

/* =========================
   ENV SAFETY
========================= */
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
  throw new Error("❌ OPENAI_API_KEY is missing in environment variables");
}

/* =========================
   AI ENGINE
========================= */
export const runAIEngine = async (
  messages: AIMessage[],
  options: AIEngineOptions = {}
): Promise<string> => {
  try {
    /* =========================
       VALIDATION
    ========================= */
    if (!Array.isArray(messages) || messages.length === 0) {
      throw new Error("Invalid or empty messages array");
    }

    /* =========================
       OPENAI REQUEST
    ========================= */
    const response = await axios.post<OpenAIResponse>(
      "https://api.openai.com/v1/chat/completions",
      {
        model: options.model ?? "gpt-4o-mini",
        messages,
        temperature: options.temperature ?? 0.7,
        max_tokens: options.maxTokens ?? 500,
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        timeout: 30000,
      }
    );

    /* =========================
       SAFE EXTRACTION
    ========================= */
    const content = response.data?.choices?.[0]?.message?.content;

    if (typeof content !== "string" || !content.trim()) {
      throw new Error("Invalid or empty response from OpenAI");
    }

    return content;
  } catch (error: unknown) {
    /* =========================
       ERROR HANDLING
    ========================= */
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;

      throw new Error(
        `OpenAI API Error (${status || "unknown"}): ${
          error.response?.data?.error?.message || error.message
        }`
      );
    }

    if (error instanceof Error) {
      throw new Error(error.message);
    }

    throw new Error("Unknown AI engine error");
  }
};