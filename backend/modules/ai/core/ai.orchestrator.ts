import { buildAIContext } from "../ai.memory";
import { applyPersona } from "../ai.persona";
import { runAIEngine } from "./ai.engine";
import {
  AIOrchestratorInput,
  AIOrchestratorOutput,
  AIMessage
} from "../../../types/aiTypes";

export const AIOrchestrator = async (
  input: AIOrchestratorInput
): Promise<AIOrchestratorOutput> => {
  if (!input.message?.trim()) {
    throw new Error("Message required");
  }

  const contextMessages: AIMessage[] = buildAIContext(
    input.history,
    input.message,
    input.healthContext
  );

  const finalMessages = applyPersona(contextMessages);

  const response = await runAIEngine(finalMessages);

  return {
    content: response,
    raw: response
  };
};