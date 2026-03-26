import Fastify, { type FastifyRequest, type FastifyReply } from "fastify";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import rateLimit from "@fastify/rate-limit";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import { env } from "./config/env.js";
import { registerRoutes } from "./routes/index.js";

const app = Fastify({
  logger: {
    level: env.NODE_ENV === "development" ? "info" : "warn",
    transport:
      env.NODE_ENV === "development"
        ? { target: "pino-pretty" }
        : undefined,
  },
});

async function bootstrap() {
  // ── Plugins ──────────────────────────────────────────────────────────
  await app.register(cors, {
    origin: env.NODE_ENV === "development" ? true : process.env.CORS_ORIGIN,
    credentials: true,
  });

  await app.register(jwt, {
    secret: env.JWT_SECRET,
  });

  app.decorate(
    "authenticate",
    async function authenticate(request: FastifyRequest, reply: FastifyReply) {
      try {
        await request.jwtVerify();
      } catch {
        void reply.status(401).send({ error: "Unauthorized" });
      }
    }
  );

  await app.register(rateLimit, {
    max: 200,
    timeWindow: "1 minute",
  });

  await app.register(swagger, {
    openapi: {
      info: {
        title: "AgentFlow API",
        description: "AI Agent 工作流平台 API",
        version: "0.1.0",
      },
      servers: [{ url: `http://localhost:${env.PORT}` }],
      components: {
        securitySchemes: {
          bearerAuth: { type: "http", scheme: "bearer", bearerFormat: "JWT" },
        },
      },
    },
  });

  await app.register(swaggerUi, {
    routePrefix: "/docs",
    uiConfig: { docExpansion: "list" },
  });

  // ── Routes ────────────────────────────────────────────────────────────
  await registerRoutes(app);

  // ── Health check ──────────────────────────────────────────────────────
  app.get("/health", async () => ({ status: "ok", timestamp: new Date().toISOString() }));

  // ── Start server ──────────────────────────────────────────────────────
  await app.listen({ port: env.PORT, host: env.HOST });
  console.log(`AgentFlow API running on http://localhost:${env.PORT}`);
  console.log(`Swagger docs at http://localhost:${env.PORT}/docs`);
}

bootstrap().catch((err) => {
  console.error(err);
  process.exit(1);
});
