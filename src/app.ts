import express, { Application, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import cookieParser from "cookie-parser";

// import { notFound } from "./shared/middlewares/notFound";
// import { globalErrorHandler } from "./shared/errors/globalErrorHandler";
import type { types } from "node:util";

const app: Application = express();

/**
 * Security
 */
app.use(helmet());

/**
 * CORS
 */
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

/**
 * Common Middlewares
 */
app.use(compression());
app.use(morgan("dev"));
app.use(cookieParser());

/**
 * Body Parser
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * Health Check
 */
app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "E-Commerce Backend API is running 🚀",
    timestamp: new Date().toISOString(),
  });
});

/**
 * API Routes
 */
// app.use("/api/v1", routes);

/**
 * 404 Handler
 */
// app.use(notFound);

/**
 * Global Error Handler
 */
// app.use(globalErrorHandler);

export default app;