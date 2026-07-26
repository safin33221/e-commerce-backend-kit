import http from "node:http";

import app from "./app.js";
import { prisma } from "./lib/prisma.js";


const PORT = Number(process.env.PORT) || 5000;

async function bootstrap() {
  try {
    // Connect DB
    await prisma.$connect();
    console.log("✅ Database connected.");

    const server = http.createServer(app);

    server.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });

    const shutdown = async () => {
      console.log("Shutting down...");

      server.close(async () => {
        await prisma.$disconnect();
        console.log("✅ Database disconnected.");
        process.exit(0);
      });
    };

    process.on("SIGINT", shutdown);
    process.on("SIGTERM", shutdown);

    process.on("unhandledRejection", async (err) => {
      console.error("Unhandled Rejection:", err);
      await shutdown();
    });

    process.on("uncaughtException", (err) => {
      console.error("Uncaught Exception:", err);
      process.exit(1);
    });
  } catch (error) {
    console.error("❌ Failed to connect to database.");
    console.error(error);
    process.exit(1);
  }
}

void bootstrap();