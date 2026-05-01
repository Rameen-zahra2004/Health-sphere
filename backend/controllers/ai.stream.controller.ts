import { Request, Response } from "express";
import { AIOrchestrator } from "../modules/ai/core/ai.orchestrator";
import { AIMessage, HealthContext } from "../types/aiTypes";

/**
 * 🧩 Stream request body (strict)
 */
interface StreamRequestBody {
  message: string;
  history: AIMessage[];
  healthContext?: HealthContext;
}

/**
 * 📡 SSE helper
 */
const sendSSE = (res: Response, data: string) => {
  res.write(`data: ${data}\n\n`);
};

/**
 * 🚀 PRODUCTION STREAM CONTROLLER
 */
export const streamAIChat = async (
  req: Request<Record<string, never>, unknown, StreamRequestBody>,
  res: Response
): Promise<void> => {
  try {
    const { message, history, healthContext } = req.body;

    // 🔐 validation
    if (typeof message !== "string" || !message.trim()) {
      res.status(400).json({ error: "Invalid message" });
      return;
    }

    if (!Array.isArray(history)) {
      res.status(400).json({ error: "Invalid history format" });
      return;
    }

    // 📡 SSE headers
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.setHeader("X-Accel-Buffering", "no");
    res.flushHeaders?.();

    // 🤖 AI Orchestrator (FIXED TYPE HANDLING)
    const orchestratorResult = await AIOrchestrator({
      message,
      history,
      healthContext
    });

    // 🛡️ safety check
    if (
      !orchestratorResult ||
      typeof orchestratorResult.content !== "string"
    ) {
      throw new Error("Invalid AI response from orchestrator");
    }

    const fullResponse = orchestratorResult.content;

    // ⚡ stream simulation (word-by-word)
    const words = fullResponse.split(" ").filter(Boolean);

    let index = 0;

    const interval = setInterval(() => {
      if (res.writableEnded) {
        clearInterval(interval);
        return;
      }

      if (index < words.length) {
        sendSSE(res, words[index]);
        index++;
      } else {
        sendSSE(res, "[DONE]");
        clearInterval(interval);
        res.end();
      }
    }, 25);

    // 🔌 cleanup on disconnect
    req.on("close", () => {
      clearInterval(interval);
      res.end();
    });
  } catch (error) {
    console.error("AI Stream Error:", error);

    if (!res.headersSent) {
      res.status(500).json({ error: "AI stream failed" });
    } else {
      sendSSE(res, "error");
      res.end();
    }
  }
};