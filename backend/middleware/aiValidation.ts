import { Request, Response, NextFunction } from "express";

export const validateChatRequest = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { message, history } = req.body;

  if (typeof message !== "string" || !message.trim()) {
    res.status(400).json({
      success: false,
      message: "Message is required"
    });
    return;
  }

  if (!Array.isArray(history)) {
    res.status(400).json({
      success: false,
      message: "History must be an array"
    });
    return;
  }

  next();
};