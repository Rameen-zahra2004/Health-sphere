const BASE_URL: string =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api";

/* =========================
   TYPES
========================= */

export type AIRole = "system" | "user" | "assistant";

export interface AIMessage {
  role: AIRole;
  content: string;
}

export interface StreamPayload {
  message: string;
  history: AIMessage[];
  healthContext?: unknown;

  mode?: "public" | "patient" | "admin";
}

export interface StreamHandlers {
  onMessage: (chunk: string) => void;
  onDone?: () => void;
  onError?: (error: Error) => void;
}

/* =========================
   STREAM TYPE
========================= */

type StreamController = () => void;

/* =========================
   STREAM AI RESPONSE (FIXED)
========================= */

export const streamAIResponse = (
  payload: StreamPayload,
  handlers: StreamHandlers
): StreamController => {
  const controller = new AbortController();
  let active = true;

  // ✅ FIXED: avoid /api/api duplication
  const url = `${BASE_URL}/ai/stream`;

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    signal: controller.signal,
  })
    .then(async (res: Response) => {
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || `HTTP ${res.status}`);
      }

      if (!res.body) {
        throw new Error("No response stream received");
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder("utf-8");

      let buffer = "";

      while (active) {
        const { value, done } = await reader.read();

        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        const lines = buffer.split("\n");

        // keep incomplete line
        buffer = lines.pop() || "";

        for (const line of lines) {
          const trimmed = line.trim();

          if (!trimmed.startsWith("data:")) continue;

          const text = trimmed.replace("data:", "").trim();

          if (!text) continue;

          // stream end signal
          if (text === "[DONE]") {
            active = false;
            handlers.onDone?.();
            return;
          }

          handlers.onMessage(text);
        }
      }

      handlers.onDone?.();
    })
    .catch((err: unknown) => {
      if (!active) return;

      const error =
        err instanceof Error ? err : new Error("Stream request failed");

      handlers.onError?.(error);
    });

  /* =========================
     CLEANUP
  ========================= */

  return (): void => {
    active = false;
    controller.abort();
  };
};