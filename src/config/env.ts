import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z
  .object({
    /**
     * App
     */
    NODE_ENV: z
      .enum(["development", "production", "test"])
      .default("development"),

    APP_NAME: z
      .string()
      .default("E-Commerce Backend Kit"),

    PORT: z.coerce.number().default(5000),

    API_PREFIX: z.string().default("/api/v1"),

    /**
     * Database
     */
    DATABASE_URL: z.string().min(1),

    /**
     * Authentication
     */
    JWT_ACCESS_SECRET: z.string().min(32),

    JWT_ACCESS_EXPIRES_IN: z.string().default("15m"),

    JWT_REFRESH_SECRET: z.string().min(32),

    JWT_REFRESH_EXPIRES_IN: z.string().default("30d"),

    BCRYPT_SALT_ROUNDS: z.coerce.number().default(12),

    /**
     * Cookies
     */
    COOKIE_SECRET: z.string().min(16),

    COOKIE_DOMAIN: z.string().optional(),

    COOKIE_SECURE: z
      .enum(["true", "false"])
      .default("false")
      .transform((value) => value === "true"),

    COOKIE_SAME_SITE: z
      .enum(["lax", "strict", "none"])
      .default("lax"),

    /**
     * Frontend
     */
    FRONTEND_URL: z.string().url(),

    /**
     * Encryption
     */
    ENCRYPTION_SECRET: z.string().min(32),

    /**
     * Redis
     */
    REDIS_URL: z.string().optional(),

    /**
     * Cloudinary
     */
    CLOUDINARY_CLOUD_NAME: z.string(),

    CLOUDINARY_API_KEY: z.string(),

    CLOUDINARY_API_SECRET: z.string(),

    /**
     * Email
     */
    SMTP_HOST: z.string().optional(),

    SMTP_PORT: z.coerce.number().optional(),

    SMTP_USER: z.string().optional(),

    SMTP_PASS: z.string().optional(),

    SMTP_FROM: z.string().email().optional(),

    /**
     * Logger
     */
    LOG_LEVEL: z
      .enum(["error", "warn", "info", "http", "debug"])
      .default("info"),

    /**
     * Rate Limit
     */
    RATE_LIMIT_WINDOW_MS: z.coerce
      .number()
      .default(15 * 60 * 1000),

    RATE_LIMIT_MAX_REQUESTS: z.coerce
      .number()
      .default(100),

    /**
     * Upload
     */
    MAX_FILE_SIZE: z.coerce
      .number()
      .default(5 * 1024 * 1024),
  })
  .superRefine((env, ctx) => {
    if (env.NODE_ENV === "production" && !env.REDIS_URL) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["REDIS_URL"],
        message: "REDIS_URL is required in production.",
      });
    }
  });

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error("\n❌ Invalid environment variables:\n");
  console.error(parsedEnv.error.format());
  process.exit(1);
}

export const env = parsedEnv.data;