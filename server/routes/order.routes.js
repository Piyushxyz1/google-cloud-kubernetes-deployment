
import express from "express";

import {
  getOrders,
  getOrderById,
} from "../controllers/order.controller.js";

import auth from "../middleware/auth.js";

const router = express.Router();

/*
  Get all orders of logged-in user
*/
router.get("/", auth, getOrders);

/*
  Get single order
*/
router.get("/:orderId", auth, getOrderById);

export default router;

