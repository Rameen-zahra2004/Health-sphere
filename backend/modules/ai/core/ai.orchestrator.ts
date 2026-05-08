import { buildAIContext } from "../ai.memory";
import { applyPersona } from "../ai.persona";
import { runAIEngine } from "./ai.engine";
import { aiToolRegistry } from "../ai.tools";

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

  // 1. MEMORY LAYER
  const contextMessages: AIMessage[] = buildAIContext(
    input.history,
    input.message,
    input.healthContext
  );

  // 2. PERSONA LAYER
  const personaMessages = applyPersona(contextMessages);

  // 3. TOOL DETECTION (BASIC VERSION — WILL UPGRADE TO AGENT LATER)
  const toolResult = await detectAndRunTool(input.message, input);

  if (toolResult) {
    personaMessages.push({
      role: "system",
      content: `Tool Result: ${JSON.stringify(toolResult)}`
    });
  }

  // 4. AI ENGINE CALL
  const response = await runAIEngine(personaMessages);

  return {
    content: response,
    raw: response
  };
};

/**
 * 🧠 SIMPLE TOOL DETECTOR (STEP 1 VERSION)
 * Later we replace this with OpenAI tool-calling agent
 */
const detectAndRunTool = async (
  message: string,
  input: AIOrchestratorInput
) => {
  const text = message.toLowerCase();

  if (text.includes("health")) {
    return await aiToolRegistry.execute("health.check", {
      name: "health.check",
      args: {},
      context: input,
    });
  }

  if (text.includes("memory")) {
    return await aiToolRegistry.execute("memory.store", {
      name: "memory.store",
      args: {
        key: "last_message",
        value: message,
      },
      context: input,
    });
  }

  return null;
};