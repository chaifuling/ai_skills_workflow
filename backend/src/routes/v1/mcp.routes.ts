import type { FastifyInstance } from "fastify";
import { z } from "zod";

const MCPServerSchema = z.object({
  displayName: z.string().min(1),
  transport: z.enum(["stdio", "sse", "http"]),
  command: z.string().optional(),
  url: z.string().url().optional(),
  env: z.record(z.string(), z.string()).optional(),
});

export async function mcpRoutes(app: FastifyInstance) {
  app.get("/", async () => {
    // TODO: implement with Prisma
    return { data: [] };
  });

  app.post("/", async (request, reply) => {
    const body = MCPServerSchema.parse(request.body);
    return reply.status(201).send({
      data: { ...body, id: crypto.randomUUID(), status: "disconnected" },
    });
  });

  app.patch("/:id", async (request) => {
    const { id } = request.params as { id: string };
    const body = MCPServerSchema.partial().parse(request.body);
    return { id, ...body };
  });

  app.delete("/:id", async (request, reply) => {
    reply.status(204).send();
  });

  // POST /api/v1/mcp/:id/test — 测试连接并返回可用 Tools
  app.post("/:id/test", async (request) => {
    const { id } = request.params as { id: string };
    // TODO: actually connect to MCP server and list tools
    return {
      serverId: id,
      status: "connected",
      tools: [],
    };
  });
}
