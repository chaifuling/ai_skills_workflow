import type { FastifyInstance } from "fastify";

export async function skillsRoutes(app: FastifyInstance) {
  app.get("/", async (request) => {
    const query = request.query as { category?: string; page?: string };
    return { data: [], total: 0, page: Number(query.page ?? 1), pageSize: 20 };
  });

  app.get("/:id", async (request) => {
    const { id } = request.params as { id: string };
    return { id };
  });

  // POST /api/v1/skills/:id/install
  app.post("/:id/install", async (request, reply) => {
    const { id } = request.params as { id: string };
    return reply.status(201).send({ skillId: id, installed: true });
  });

  // DELETE /api/v1/skills/:id/uninstall
  app.delete("/:id/uninstall", async (request, reply) => {
    reply.status(204).send();
  });
}
