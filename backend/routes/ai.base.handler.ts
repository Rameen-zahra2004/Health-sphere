import { Request, Response } from "express";
import { AIOrchestrator } from "../modules/ai/core/ai.orchestrator";
import {
  AIOrchestratorInput,
  AIMessage,
  HealthContext,
  AISystemRole,
} from "../../backend/types/aiTypes";

/* =========================
   REQUEST BODY
========================= */
interface AIRequestBody {
  message: string;
  history?: AIMessage[];
  healthContext?: HealthContext;
}

/* =========================
   ROLE MAPPER
========================= */
const mapUserRoleToAI = (role?: string): AISystemRole => {
  if (role === "admin") return "admin";
  if (role === "patient") return "patient";
  return "public";
};

/* =========================
   HANDLER
========================= */
export const handleAIRequest = async (
  req: Request,
  res: Response,
  forcedRole?: AISystemRole
): Promise<Response> => {
  try {
    const body = req.body as AIRequestBody;

    const { message, history = [], healthContext } = body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({
        success: false,
        message: "Message is required and must be a string",
      });
    }

    const role: AISystemRole =
      forcedRole ?? mapUserRoleToAI(req.user?.role);

    const input: AIOrchestratorInput = {
      message,
      history,
      healthContext,
      userId: req.user?.id,
      sessionId: req.sessionId,
      role,
    };

    const result = await AIOrchestrator(input);

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "AI request failed";

    return res.status(500).json({
      success: false,
      message,
    });
  }
};