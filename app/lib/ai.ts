const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

/* =========================
   TYPES
========================= */

export interface AIMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface AIRequest {
  message: string;
  history: AIMessage[];
  healthContext?: unknown;
}

/* =========================
   RESPONSE TYPE
========================= */
export interface AIResponse {
  success: boolean;
  data: {
    content: string;
    raw: unknown;
  };
}

/* =========================
   CORE REQUEST HANDLER
========================= */
const requestAI = async (
  endpoint: "public" | "patient" | "admin",
  data: AIRequest
): Promise<AIResponse> => {
  try {
    const res = await fetch(`${BASE_URL}/ai/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      throw new Error(error?.message || "AI request failed");
    }

    return res.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Unknown AI error");
  }
};

/* =========================
   PUBLIC AI
========================= */
export const callPublicAI = (data: AIRequest) => {
  return requestAI("public", data);
};

/* =========================
   PATIENT AI
========================= */
export const callPatientAI = (data: AIRequest) => {
  return requestAI("patient", data);
};

/* =========================
   ADMIN AI
========================= */
export const callAdminAI = (data: AIRequest) => {
  return requestAI("admin", data);
};