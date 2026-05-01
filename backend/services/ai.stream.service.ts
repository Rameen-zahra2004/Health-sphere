import { AIOrchestrator } from "../modules/ai/core/ai.orchestrator";

/**
 * 🧠 STRICT TYPES (PRODUCTION READY)
 */
export interface AIStreamMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export interface AIStreamParams {
  message: string;
  history: AIStreamMessage[];
  healthContext?: Record<string, unknown>;
}

/**
 * 🧠 STREAM AI SERVICE (PURE LAYER)
 * - no HTTP
 * - no side effects
 * - only AI processing
 */
export const streamAIResponse = async (
  params: AIStreamParams
): Promise<string[]> => {
  const { message, history, healthContext } = params;

  // 🔐 validation
  if (typeof message !== "string" || !message.trim()) {
    throw new Error("Invalid message provided to AI stream service");
  }

  if (!Array.isArray(history)) {
    throw new Error("History must be an array of messages");
  }

  // 🤖 Call orchestrator (correct type handling)
  const result = await AIOrchestrator({
    message,
    history,
    healthContext
  });

  // 🛡️ safe check
  if (!result || typeof result.content !== "string") {
    throw new Error("AI Orchestrator returned invalid response");
  }

  const fullResponse = result.content;

  // ⚡ chunking for streaming
  const chunks: string[] = fullResponse
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  return chunks;
};