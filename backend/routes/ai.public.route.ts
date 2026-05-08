import { Router, Request, Response, NextFunction } from "express";
import { handleAIRequest } from "./ai.base.handler";
import { AISystemRole } from "../types/aiTypes";

const router = Router();

const ROLE: AISystemRole = "public";

const publicAIHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await handleAIRequest(req, res, ROLE);
  } catch (error: unknown) {
    next(error);
  }
};

router.post("/", publicAIHandler);

export default router;