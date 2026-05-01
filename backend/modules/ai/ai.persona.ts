import { AIMessage, PersonaOptions } from "../../types/aiTypes";

const SYSTEM_PROMPT = `
You are HealthSphere AI Assistant.

Rules:
- Medical & wellness assistant only
- No diagnosis
- Always recommend doctor for serious issues
- Be safe, structured, and helpful
`.trim();

export const applyPersona = (
  messages: AIMessage[],
  options: PersonaOptions = { injectSafetyRules: true }
): AIMessage[] => {
  if (!Array.isArray(messages)) {
    throw new Error("Invalid messages");
  }

  return [
    {
      role: "system",
      content: options.injectSafetyRules
        ? SYSTEM_PROMPT
        : "You are HealthSphere AI Assistant."
    },
    ...messages
  ];
};