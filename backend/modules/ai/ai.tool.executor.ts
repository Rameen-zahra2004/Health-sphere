import { aiToolRegistry } from "./ai.tools";
import { AIIdentityContext } from "../../types/aiTypes";

export interface ToolExecutionRequest<TArgs = unknown> {
  toolName: string;
  args: TArgs;
  context: AIIdentityContext;
}

/**
 * 🧠 Production Tool Executor
 * Handles safe execution of AI tools
 */
export const executeAITool = async <TArgs, TResult>(
  request: ToolExecutionRequest<TArgs>
): Promise<TResult | null> => {
  const result = await aiToolRegistry.execute<TArgs, TResult>(
    request.toolName,
    {
      name: request.toolName,
      args: request.args,
      context: request.context,
    }
  );

  if (!result.success) {
    return null;
  }

  return result.data as TResult;
};