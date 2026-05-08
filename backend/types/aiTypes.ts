/* =========================
   💬 MESSAGE ROLES (LLM)
========================= */
export type AIMessageRole = "system" | "user" | "assistant";

/**
 * 💬 Standard AI message format
 */
export interface AIMessage {
  role: AIMessageRole;
  content: string;
}

/* =========================
   🧠 HEALTH CONTEXT
========================= */
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

/* =========================
   🔐 AI SYSTEM ROLE (FIXED)
========================= */
export type AISystemRole = "public" | "patient" | "admin";

/**
 * 🔐 Runtime identity context
 */
export interface AIIdentityContext {
  userId?: string;
  sessionId?: string;
  role?: AISystemRole;
}

/* =========================
   🧩 ORCHESTRATOR INPUT
========================= */
export interface AIOrchestratorInput extends AIIdentityContext {
  message: string;
  history: AIMessage[];
  healthContext?: HealthContext;
}

/* =========================
   📤 OUTPUT
========================= */
export interface AIOrchestratorOutput {
  content: string;
  raw: unknown;
}

/* =========================
   ⚙️ ENGINE OPTIONS
========================= */
export interface AIEngineOptions {
  model?: "gpt-4o-mini" | "gpt-4o" | "gpt-4.1-mini";
  temperature?: number;
  maxTokens?: number;
}

/* =========================
   🤖 OPENAI RESPONSE
========================= */
export interface OpenAIChoice {
  message?: {
    content?: string;
  };
}

export interface OpenAIResponse {
  choices: OpenAIChoice[];
}

/* =========================
   🧠 PERSONA
========================= */
export interface PersonaOptions {
  injectSafetyRules?: boolean;
  type?: "health" | "fitness" | "mental" | "general";
}