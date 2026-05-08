import { Router, Request, Response, NextFunction } from "express";
import { handleAIRequest } from "./ai.base.handler";
import { AISystemRole } from "../types/aiTypes";

const router = Router();

const ROLE: AISystemRole = "admin";

const adminAIHandler = async (
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

router.post("/", adminAIHandler);

export default router;