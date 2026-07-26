import express, { Router } from "express";

import { authRoutes } from "../modules/auth/auth.route.js";
import { userRoutes } from "../modules/users/users.route.js";

const router: Router = express.Router();

const moduleRoutes = [
  // ==============================
  // Authentication
  // ==============================
  {
    path: "/auth",
    route: authRoutes,
  },

  // ==============================
  // User Management
  // ==============================
  {
    path: "/users",
    route: userRoutes,
  },

  // ==============================
  // Catalog Management
  // ==============================
//   {
//     path: "/categories",
//     route: categoryRoutes,
//   },
//   {
//     path: "/brands",
//     route: brandRoutes,
//   },
//   {
//     path: "/products",
//     route: productRoutes,
//   },

  // ==============================
  // Inventory
  // ==============================
//   {
//     path: "/inventory",
//     route: inventoryRoutes,
//   },

  // ==============================
  // Marketing
  // ==============================
//   {
//     path: "/coupons",
//     route: couponRoutes,
//   },

  // ==============================
  // Shipping
  // ==============================
//   {
//     path: "/shipping",
//     route: shippingRoutes,
//   },

  // ==============================
  // Orders
  // ==============================
//   {
//     path: "/orders",
//     route: orderRoutes,
//   },

  // ==============================
  // Payments
  // ==============================
//   {
//     path: "/payments",
//     route: paymentRoutes,
//   },

  // ==============================
  // Reviews
  // ==============================
//   {
//     path: "/reviews",
//     route: reviewRoutes,
//   },

  // ==============================
  // File Uploads
  // ==============================
//   {
//     path: "/uploads",
//     route: uploadRoutes,
//   },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;