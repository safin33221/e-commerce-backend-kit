import { ErrorRequestHandler } from "express";
import { Prisma } from "../../../generated/prisma/client";
import { ZodError } from "zod";

import AppError from "./AppError.js";

export const globalErrorHandler: ErrorRequestHandler = (
  error,
  _req,
  res,
  _next
) => {
  let statusCode = 500;
  let message = "Something went wrong!";
  let errorDetails: unknown = [];

  /**
   * App Error
   */
  if (error instanceof AppError) {
    statusCode = error.statusCode;
    message = error.message;
  }

  /**
   * Zod Validation Error
   */
  else if (error instanceof ZodError) {
    statusCode = 400;
    message = "Validation Error";

    errorDetails = error.issues.map((issue) => ({
      path: issue.path.join("."),
      message: issue.message,
    }));
  }

  /**
   * Prisma Validation Error
   */
  else if (error instanceof Prisma.PrismaClientValidationError) {
    statusCode = 400;
    message = error.message;
  }

  /**
   * Prisma Known Error
   */
  else if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2002":
        statusCode = 409;
        message = "Duplicate value.";
        break;

      case "P2025":
        statusCode = 404;
        message = "Resource not found.";
        break;

      default:
        statusCode = 400;
        message = error.message;
    }
  }

  /**
   * Native Error
   */
  else if (error instanceof Error) {
    message = error.message;
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorDetails,
    stack:
      process.env.NODE_ENV === "development"
        ? error instanceof Error
          ? error.stack
          : undefined
        : undefined,
  });
};