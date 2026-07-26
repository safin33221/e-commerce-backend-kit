import http from "node:http";

import app from "./app.js";
import { env } from "./config/env.js";
import { logger } from "./config/logger.js";
import { prisma } from "./lib/prisma.js";

const PORT = env.PORT;

let server: http.Server;

async function shutdown(signal?: string) {
  logger.info(`Received ${signal ?? "shutdown"} signal.`);

  if (server) {
    server.close(async () => {
      try {
        await prisma.$disconnect();
        logger.info("Database disconnected.");
        process.exit(0);
      } catch (error) {
        logger.error(error);
        process.exit(1);
      }
    });
  } else {
    await prisma.$disconnect();
    process.exit(0);
  }
}

async function bootstrap() {
  try {
    await prisma.$connect();

    logger.info("Database connected.");

    server = http.createServer(app);

    server.listen(PORT, () => {
      logger.info(`Server running on http://localhost:${PORT}`);
    });

    server.keepAliveTimeout = 65000;
    server.headersTimeout = 66000;

    process.on("SIGINT", () => {
      void shutdown("SIGINT");
    });

    process.on("SIGTERM", () => {
      void shutdown("SIGTERM");
    });

    process.on("unhandledRejection", (reason) => {
      logger.error(reason);
      void shutdown("Unhandled Rejection");
    });

    process.on("uncaughtException", (error) => {
      logger.error(error);
      process.exit(1);
    });

  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
}

void bootstrap();