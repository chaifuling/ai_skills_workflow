import type { FastifyInstance } from "fastify";
import { z } from "zod";

const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(1),
});

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export async function authRoutes(app: FastifyInstance) {
  app.post("/register", async (request, reply) => {
    const body = RegisterSchema.parse(request.body);
    // TODO: implement with Prisma
    return reply.status(201).send({ message: "User registered", data: body });
  });

  app.post("/login", async (request, reply) => {
    const body = LoginSchema.parse(request.body);
    // TODO: implement with Prisma + bcrypt
    const token = app.jwt.sign({ email: body.email }, { expiresIn: "7d" });
    return reply.send({ token });
  });

  app.get(
    "/me",
    { preHandler: [app.authenticate] },
    async (request) => {
      return { user: request.user };
    }
  );
}
