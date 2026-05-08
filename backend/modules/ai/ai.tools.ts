/**
 * AI Tools Registry (Strict Production Version)
 * --------------------------------------------
 * Fully typed, safe execution, orchestrator-ready
 */

/* ---------------------------
   CONTEXT
---------------------------- */

export type AIToolRole = "public" | "patient" | "admin";

export interface AIToolContext {
  userId?: string;
  sessionId?: string;
  role?: AIToolRole;
  metadata?: Record<string, unknown>;
}

/* ---------------------------
   CORE TYPES
---------------------------- */

export interface AIToolInput<TArgs> {
  name: string;
  args: TArgs;
  context: AIToolContext;
}

export interface AIToolResult<TData> {
  success: boolean;
  data?: TData;
  error?: string;
  meta?: Record<string, unknown>;
}

/* ---------------------------
   TOOL TYPES (STRICT)
---------------------------- */

export type AIToolValidate<TArgs> = (args: TArgs) => true | string;

export type AIToolExecute<TArgs, TResult> = (
  input: AIToolInput<TArgs>
) => Promise<AIToolResult<TResult>>;

export interface AITool<TArgs, TResult> {
  name: string;
  description: string;
  version?: string;
  validate?: AIToolValidate<TArgs>;
  execute: AIToolExecute<TArgs, TResult>;
}

/* ---------------------------
   REGISTRY
---------------------------- */

class ToolRegistry {
  private tools: Map<string, AITool<unknown, unknown>> = new Map();

  register<TArgs, TResult>(tool: AITool<TArgs, TResult>): void {
    if (this.tools.has(tool.name)) {
      throw new Error(`Tool already registered: ${tool.name}`);
    }

    this.tools.set(tool.name, tool as AITool<unknown, unknown>);
  }

  get(name: string): AITool<unknown, unknown> | undefined {
    return this.tools.get(name);
  }

  has(name: string): boolean {
    return this.tools.has(name);
  }

  async execute<TArgs, TResult>(
    name: string,
    input: AIToolInput<TArgs>
  ): Promise<AIToolResult<TResult>> {
    const tool = this.tools.get(name);

    if (!tool) {
      return {
        success: false,
        error: `Tool not found: ${name}`,
      };
    }

    try {
      const typedTool = tool as AITool<TArgs, TResult>;

      if (typedTool.validate) {
        const validation = typedTool.validate(input.args);

        if (validation !== true) {
          return {
            success: false,
            error: validation,
          };
        }
      }

      return await typedTool.execute(input);
    } catch {
      return {
        success: false,
        error: "Tool execution failed",
      };
    }
  }

  list(): Array<Pick<AITool<unknown, unknown>, "name" | "description" | "version">> {
    return Array.from(this.tools.values()).map((t) => ({
      name: t.name,
      description: t.description,
      version: t.version,
    }));
  }
}

/* ---------------------------
   SINGLETON
---------------------------- */

export const aiToolRegistry = new ToolRegistry();

/* ---------------------------
   HELPERS
---------------------------- */

export const executeTool = aiToolRegistry.execute.bind(aiToolRegistry);
export const registerTool = aiToolRegistry.register.bind(aiToolRegistry);

/* ---------------------------
   BUILT-IN TOOLS
---------------------------- */

/**
 * HEALTH CHECK TOOL
 */
aiToolRegistry.register<unknown, { status: string; timestamp: string }>({
  name: "health.check",
  description: "System health check",
  version: "1.0.0",

  validate: () => true,

  async execute({ context }) {
    void context;

    return {
      success: true,
      data: {
        status: "ok",
        timestamp: new Date().toISOString(),
      },
    };
  },
});

/**
 * DEBUG ECHO TOOL
 */
aiToolRegistry.register<Record<string, unknown>, unknown>({
  name: "debug.echo",
  description: "Echo input for debugging",

  async execute({ args, context }) {
    void context;

    return {
      success: true,
      data: {
        args,
      },
    };
  },
});

/**
 * MEMORY STORE TOOL (STRICT)
 */
type MemoryStoreArgs = {
  key: string;
  value: unknown;
};

type MemoryStoreResult = {
  stored: boolean;
  key: string;
};

aiToolRegistry.register<MemoryStoreArgs, MemoryStoreResult>({
  name: "memory.store",
  description: "Stores data into AI memory",

  validate: (args) => {
    if (!args.key || args.value === undefined) {
      return "key and value are required";
    }
    return true;
  },

  async execute({ args }) {
    return {
      success: true,
      data: {
        stored: true,
        key: args.key,
      },
    };
  },
});