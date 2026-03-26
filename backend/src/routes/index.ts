import type { FastifyInstance } from "fastify";
import { authRoutes } from "./v1/auth.routes.js";
import { rolesRoutes } from "./v1/roles.routes.js";
import { workflowsRoutes } from "./v1/workflows.routes.js";
import { skillsRoutes } from "./v1/skills.routes.js";
import { mcpRoutes } from "./v1/mcp.routes.js";
import { executionsRoutes } from "./v1/executions.routes.js";

const routeOpts = { encapsulate: false as const };

export async function registerRoutes(app: FastifyInstance) {
  await app.register(authRoutes, { ...routeOpts, prefix: "/api/v1/auth" });
  await app.register(rolesRoutes, { ...routeOpts, prefix: "/api/v1/roles" });
  await app.register(workflowsRoutes, { ...routeOpts, prefix: "/api/v1/workflows" });
  await app.register(skillsRoutes, { ...routeOpts, prefix: "/api/v1/skills" });
  await app.register(mcpRoutes, { ...routeOpts, prefix: "/api/v1/mcp" });
  await app.register(executionsRoutes, { ...routeOpts, prefix: "/api/v1/executions" });
}
