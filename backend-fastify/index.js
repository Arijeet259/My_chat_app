import fastify from "fastify";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { auth_route } from "./Routes/userAuth.js";
import fastifyCookie from "@fastify/cookie";
import fastifyMultipart from "@fastify/multipart";
import cors from "@fastify/cors";
import { messageroute } from "./Routes/messagesRouter.js";

const app = fastify();

await app.register(fastifySwagger, {
  openapi: {
    info: {
      title: "chat app",
      description: "API documentation",
    },
    servers: [{ url: "http://127.0.0.1:5001" }],
  },
});

app.register(fastifySwaggerUi, {
  routePrefix: "/docs",
});

app.register(cors, {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: "true",
});

app.register(fastifyCookie);
app.register(fastifyMultipart);

// API Routes
app.register(auth_route, { prefix: "/api" });
app.register(messageroute, { prefix: "/api" });

// API server start
app.listen({ port: 5001 }, (err, address) => {
  if (err) {
    console.log("error server", err);
    process.exit();
  }
  console.log(`server started at ${address}`);
});
