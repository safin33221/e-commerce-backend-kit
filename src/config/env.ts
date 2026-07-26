import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]),

  PORT: z.coerce.number().default(5000),

  DATABASE_URL: z.string().min(1),

  JWT_ACCESS_SECRET: z.string().min(32),

  JWT_ACCESS_EXPIRES_IN: z.string(),

  JWT_REFRESH_SECRET: z.string().min(32),

  JWT_REFRESH_EXPIRES_IN: z.string(),

  BCRYPT_SALT_ROUNDS: z.coerce.number().default(12),

  FRONTEND_URL: z.string().url(),

  COOKIE_SECRET: z.string().min(16),

  CLOUDINARY_CLOUD_NAME: z.string(),

  CLOUDINARY_API_KEY: z.string(),

  CLOUDINARY_API_SECRET: z.string(),

  REDIS_URL: z.string().optional(),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error(
    "❌ Invalid environment variables:\n",
    parsedEnv.error.flatten().fieldErrors
  );

  process.exit(1);
}

export const env = parsedEnv.data;