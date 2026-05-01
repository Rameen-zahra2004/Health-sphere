import { Request, Response } from "express";
import { AIOrchestrator } from "../modules/ai/core/ai.orchestrator";
import { AIMessage, HealthContext } from "../types/aiTypes";

interface ChatRequestBody {
  message: string;
  history: AIMessage[];
  healthContext?: HealthContext;
}

export const chatWithAI = async (
  req: Request<Record<string, never>, unknown, ChatRequestBody>,
  res: Response
): Promise<void> => {
  try {
    const { message, history, healthContext } = req.body;

    const result = await AIOrchestrator({
      message,
      history,
      healthContext
    });

    res.json({
      success: true,
      response: result.content
    });
  } catch (error) {
    console.error("AI Controller Error:", error);

    res.status(500).json({
      success: false,
      message: "AI system error"
    });
  }
};