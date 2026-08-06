import express, { Application, Request, Response } from "express";

import cors from "cors";
import compression from "compression";
import cookieParser from "cookie-parser";

import { corsOptions } from "./config/cors.js";
import { requestLogger } from "./shared/middlewares/requestLogger.js";

import { notFound } from "./shared/middlewares/notFound.js";
import { globalErrorHandler } from "./shared/errors/globalErrorHandler.js";
import { routes } from "./routes/index.js";


const app: Application = express();

/**
 * -----------------------------------------------------
 * Trust Proxy
 * -----------------------------------------------------
 * Required when running behind:
 * - Nginx
 * - Railway
 * - Render
 * - Coolify
 * - Cloudflare
 */
app.set("trust proxy", 1);

/**
 * -----------------------------------------------------
 * Security
 * -----------------------------------------------------
 */
//helmet

/**
 * -----------------------------------------------------
 * CORS
 * -----------------------------------------------------
 */
app.use(cors(corsOptions));

/**
 * -----------------------------------------------------
 * Compression
 * -----------------------------------------------------
 */
app.use(compression());

/**
 * -----------------------------------------------------
 * Cookie Parser
 * -----------------------------------------------------
 */
app.use(cookieParser());

/**
 * -----------------------------------------------------
 * Body Parser
 * -----------------------------------------------------
 */
app.use(
  express.json({
    limit: "5mb",
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "5mb",
  })
);

/**
 * -----------------------------------------------------
 * Request Logger
 * -----------------------------------------------------
 */
app.use(requestLogger);

/**
 * -----------------------------------------------------
 * Rate Limiter
 * -----------------------------------------------------
 */

/**
 * -----------------------------------------------------
 * Health Check
 * -----------------------------------------------------
 */
app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "E-Commerce Backend API is running 🚀",
    version: "v1",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

/**
 * -----------------------------------------------------
 * API Routes
 * -----------------------------------------------------
 */
app.use("/api/v1", routes);

/**
 * -----------------------------------------------------
 * 404 Handler
 * -----------------------------------------------------
 */
app.use(notFound);

/**
 * -----------------------------------------------------
 * Global Error Handler
 * -----------------------------------------------------
 */
app.use(globalErrorHandler);

export default app;