import { AIMessage, HealthContext } from "../../types/aiTypes";

export const buildAIContext = (
  history: AIMessage[],
  message: string,
  healthContext?: HealthContext
): AIMessage[] => {
  if (!Array.isArray(history)) {
    throw new Error("History must be array");
  }

  const trimmed = history.slice(-10);

  const messages: AIMessage[] = [
    ...trimmed,
    { role: "user", content: message.trim() }
  ];

  if (healthContext) {
    messages.unshift({
      role: "system",
      content: `User Health Context:\n${JSON.stringify(healthContext, null, 2)}`
    });
  }

  return messages;
};