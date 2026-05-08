import { Request, Response } from "express";

type AIRole = "system" | "user" | "assistant";

interface AIMessage {
  role: AIRole;
  content: string;
}

interface StreamRequestBody {
  message?: string;
  messages?: AIMessage[];
  mode?: "public" | "patient" | "admin";
}

/* =========================
   CONTROLLER (CLEAN SSE)
========================= */

export const streamAIChat = async (
  req: Request<unknown, unknown, StreamRequestBody>,
  res: Response
): Promise<void> => {
  let isClosed = false;

  try {
    const { messages, message } = req.body;

    if (
      (!messages || !Array.isArray(messages)) &&
      typeof message !== "string"
    ) {
      res.status(400).json({
        error: "Invalid input",
      });
      return;
    }

    /* =========================
       SSE HEADERS
    ========================= */

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    res.flushHeaders?.();

    req.on("close", () => {
      isClosed = true;
    });

    /* =========================
       BUILD RESPONSE
    ========================= */

    const lastMessage =
      messages?.[messages.length - 1]?.content || message || "";

    const responseText = `You said: ${lastMessage}`;

    /* =========================
       STREAM ONLY TEXT (NO JSON)
    ========================= */

    for (const char of responseText) {
      if (isClosed) break;

      res.write(`data: ${char}\n\n`);

      await new Promise((r) => setTimeout(r, 15));
    }

    /* =========================
       END STREAM
    ========================= */

    if (!isClosed) {
      res.write(`data: [DONE]\n\n`);
      res.end();
    }
  } catch (error) {
    console.error(error);

    if (!res.headersSent) {
      res.status(500).json({ error: "Stream failed" });
    } else {
      res.write(`data: [ERROR]\n\n`);
      res.end();
    }
  }
};