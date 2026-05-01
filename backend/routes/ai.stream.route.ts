import { Router } from "express";
import { validateChatRequest } from "../middleware/aiValidation";
import { streamAIChat } from "../controllers/ai.stream.controller";

const router = Router();

router.post("/stream", validateChatRequest, streamAIChat);

export default router;