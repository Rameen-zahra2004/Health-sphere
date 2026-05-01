export type AIRole = "system" | "user" | "assistant";

/**
 * 💬 Standard AI message format (used everywhere)
 */
export interface AIMessage {
  role: AIRole;
  content: string;
}

/**
 * 🧠 Health context (medical AI safe structure)
 */
export interface HealthContext {
  userId?: string;
  age?: number;
  gender?: "male" | "female" | "other";
  conditions?: string[];
  symptoms?: string[];
  medications?: string[];
  allergies?: string[];
  lifestyle?: {
    smoking?: boolean;
    alcohol?: boolean;
    activityLevel?: "low" | "moderate" | "high";
  };
  metadata?: Record<string, unknown>;
}

/**
 * 🚀 AI Engine Options
 */
export interface AIEngineOptions {
  model?: "gpt-4o-mini" | "gpt-4o" | "gpt-4.1-mini";
  temperature?: number;
  maxTokens?: number;
}

/**
 * 🤖 OpenAI response (safe)
 */
export interface OpenAIChoice {
  message?: {
    content?: string;
  };
}

export interface OpenAIResponse {
  choices: OpenAIChoice[];
}

/**
 * 🧩 Orchestrator input
 */
export interface AIOrchestratorInput {
  message: string;
  history: AIMessage[];
  healthContext?: HealthContext;
}

/**
 * 📤 Orchestrator output
 */
export interface AIOrchestratorOutput {
  content: string;
  raw: unknown;
}

/**
 * 🧠 Persona options
 */
export interface PersonaOptions {
  injectSafetyRules?: boolean;
  type?: "health" | "fitness" | "mental" | "general";
}