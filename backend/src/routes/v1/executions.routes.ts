import type { FastifyInstance } from "fastify";

export async function executionsRoutes(app: FastifyInstance) {
  app.get("/", async (request) => {
    const query = request.query as { page?: string; status?: string };
    return { data: [], total: 0, page: Number(query.page ?? 1), pageSize: 20 };
  });

  app.get("/:id", async (request) => {
    const { id } = request.params as { id: string };
    return { id };
  });

  // GET /api/v1/executions/:id/logs — 获取执行日志（SSE stream）
  app.get("/:id/logs", async (request, reply) => {
    const { id } = request.params as { id: string };
    reply.raw.setHeader("Content-Type", "text/event-stream");
    reply.raw.setHeader("Cache-Control", "no-cache");
    reply.raw.setHeader("Connection", "keep-alive");
    reply.raw.write(`data: {"executionId":"${id}","log":"Connected"}\n\n`);
    // TODO: stream real logs from Redis pub/sub
    return reply;
  });

  // POST /api/v1/executions/:id/cancel
  app.post("/:id/cancel", async (request) => {
    const { id } = request.params as { id: string };
    return { executionId: id, status: "cancelled" };
  });
}
