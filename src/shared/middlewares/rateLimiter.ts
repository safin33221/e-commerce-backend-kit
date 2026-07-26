import rateLimit from "express-rate-limit";


export const globalRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes

  limit: 100,

  standardHeaders: "draft-8",

  legacyHeaders: false,

  message: {
    success: false,
    message:
      "Too many requests. Please try again later.",
  },
});



export const authRateLimiter = rateLimit({

  windowMs: 15 * 60 * 1000,

  limit: 5,

  message: {
    success: false,
    message:
      "Too many login attempts. Try again later.",
  },

  standardHeaders: true,

  legacyHeaders: false,
});