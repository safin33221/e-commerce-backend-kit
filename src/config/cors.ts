import { CorsOptions } from "cors";
import { env } from "./env.js";

const allowedOrigins = [
  env.FRONTEND_URL,
  "http://localhost:3000",
  "http://127.0.0.1:3000",
];

export const corsOptions: CorsOptions = {
  origin(origin, callback) {
    // Allow requests from Postman, curl, server-to-server, etc.
    if (!origin) {
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    callback(new Error("CORS: Origin not allowed."));
  },

  credentials: true,

  methods: [
    "GET",
    "POST",
    "PUT",
    "PATCH",
    "DELETE",
    "OPTIONS",
  ],

  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "Authorization",
  ],

  exposedHeaders: ["Set-Cookie"],

  optionsSuccessStatus: 204,
};