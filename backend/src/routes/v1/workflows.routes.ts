import type { FastifyInstance } from "fastify";
import { z } from "zod";

const WorkflowNodeSchema = z.object({
  id: z.string(),
  type: z.string(),
  position: z.object({ x: z.number(), y: z.number() }),
  data: z.record(z.string(), z.unknown()),
});

const WorkflowEdgeSchema = z.object({
  id: z.string(),
  source: z.string(),
  target: z.string(),
  sourceHandle: z.string().optional(),
  targetHandle: z.string().optional(),
  label: z.string().optional(),
});

const SaveWorkflowSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  nodes: z.array(WorkflowNodeSchema).default([]),
  edges: z.array(WorkflowEdgeSchema).default([]),
  variables: z.array(z.record(z.string(), z.unknown())).default([]),
});

export async function workflowsRoutes(app: FastifyInstance) {
  app.get("/", async () => {
    // TODO: implement with Prisma
    return { data: [], total: 0, page: 1, pageSize: 20, totalPages: 0 };
  });

  app.get("/:id", async (request) => {
    const { id } = request.params as { id: string };
    return { id };
  });

  app.post("/", async (request, reply) => {
    const body = SaveWorkflowSchema.parse(request.body);
    return reply.status(201).send({
      data: { ...body, id: crypto.randomUUID(), status: "draft" },
    });
  });

  app.patch("/:id", async (request) => {
    const { id } = request.params as { id: string };
    const body = SaveWorkflowSchema.partial().parse(request.body);
    return { id, ...body };
  });

  app.delete("/:id", async (request, reply) => {
    reply.status(204).send();
  });

  // POST /api/v1/workflows/:id/run
  app.post("/:id/run", async (request, reply) => {
    const { id } = request.params as { id: string };
    // TODO: enqueue execution job via Bull
    return reply.status(202).send({
      executionId: crypto.randomUUID(),
      workflowId: id,
      status: "pending",
    });
  });

  // GET /api/v1/workflows/:id/executions
  app.get("/:id/executions", async (request) => {
    const { id } = request.params as { id: string };
    return { data: [], total: 0, workflowId: id };
  });
}
