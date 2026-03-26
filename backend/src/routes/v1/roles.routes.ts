import type { FastifyInstance } from "fastify";
import { z } from "zod";

const ModelConfigSchema = z.object({
  provider: z.string(),
  modelId: z.string(),
  temperature: z.number().min(0).max(2).optional(),
  maxTokens: z.number().optional(),
});

const CreateRoleSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  domain: z.string(),
  systemPrompt: z.string(),
  modelConfig: ModelConfigSchema,
  skills: z.array(z.string()).default([]),
  mcpServers: z.array(z.string()).default([]),
  knowledgeBases: z.array(z.string()).default([]),
  memory: z
    .object({
      windowSize: z.number().default(20),
      longTerm: z.boolean().default(false),
    })
    .default({ windowSize: 20, longTerm: false }),
  guardrails: z
    .object({
      topicBlacklist: z.array(z.string()).default([]),
      safeMode: z.boolean().default(true),
    })
    .default({ topicBlacklist: [], safeMode: true }),
});

export async function rolesRoutes(app: FastifyInstance) {
  // GET /api/v1/roles
  app.get("/", async (request) => {
    const query = request.query as { page?: string; domain?: string };
    // TODO: implement with Prisma
    return {
      data: [],
      total: 0,
      page: Number(query.page ?? 1),
      pageSize: 20,
      totalPages: 0,
    };
  });

  // GET /api/v1/roles/:id
  app.get("/:id", async (request) => {
    const { id } = request.params as { id: string };
    // TODO: implement with Prisma
    return { id };
  });

  // POST /api/v1/roles
  app.post("/", async (request, reply) => {
    const body = CreateRoleSchema.parse(request.body);
    // TODO: implement with Prisma
    return reply.status(201).send({ data: { ...body, id: crypto.randomUUID() } });
  });

  // PATCH /api/v1/roles/:id
  app.patch("/:id", async (request) => {
    const { id } = request.params as { id: string };
    const body = CreateRoleSchema.partial().parse(request.body);
    // TODO: implement with Prisma
    return { id, ...body };
  });

  // DELETE /api/v1/roles/:id
  app.delete("/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    // TODO: implement with Prisma
    return reply.status(204).send();
  });

  // POST /api/v1/roles/:id/chat — 与角色对话
  app.post("/:id/chat", async (request) => {
    const { id } = request.params as { id: string };
    const { message } = request.body as { message: string };
    // TODO: forward to AI engine service
    return { roleId: id, reply: `Echo: ${message}` };
  });
}
