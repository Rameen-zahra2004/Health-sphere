import { Router } from "express";
import { validateChatRequest } from "../middleware/aiValidation";
import { streamAIChat } from "../controllers/ai.stream.controller";

const router = Router();

/**
 * FINAL ENDPOINT:
 * POST /api/ai/stream
 */
router.post("/", validateChatRequest, streamAIChat);

export default router;