import { Router } from "express";
import { validateChatRequest } from "../middleware/aiValidation";
import { chatWithAI } from "../controllers/ai.controller";

const router = Router();

router.post("/chat", validateChatRequest, chatWithAI);

export default router;