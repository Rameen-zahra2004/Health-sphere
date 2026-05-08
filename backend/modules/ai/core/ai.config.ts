import dotenv from "dotenv";

dotenv.config();

/**
 * 🤖 AI CONFIG (CENTRALIZED)
 */
export const AI_CONFIG = {
  openaiApiKey: process.env.OPENAI_API_KEY || "",
  nodeEnv: process.env.NODE_ENV || "development",
  clientUrl: process.env.CLIENT_URL || "http://localhost:3000",
};