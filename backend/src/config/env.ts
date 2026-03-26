import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  PORT: z.coerce.number().default(3101),
  HOST: z.string().default("0.0.0.0"),

  DATABASE_URL: z
    .string()
    .default("postgresql://agentflow:agentflow@localhost:5433/agentflow"),
  REDIS_URL: z.string().default("redis://localhost:6380"),

  JWT_SECRET: z.string().default("change-me-in-production"),
  JWT_EXPIRES_IN: z.string().default("7d"),

  AI_ENGINE_URL: z.string().default("http://localhost:8000"),

  OPENAI_API_KEY: z.string().optional(),
  ANTHROPIC_API_KEY: z.string().optional(),
});

export type Env = z.infer<typeof envSchema>;

export function loadEnv(): Env {
  const result = envSchema.safeParse(process.env);
  if (!result.success) {
    console.error("Invalid environment variables:", result.error.flatten());
    process.exit(1);
  }
  return result.data;
}

export const env = loadEnv();
