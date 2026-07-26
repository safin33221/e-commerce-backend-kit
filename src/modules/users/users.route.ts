import express, { Router } from "express";

const router: Router = express.Router();

/**
 * Health Route
 */
router.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Auth route is working.",
  });
});

export const userRoutes= router