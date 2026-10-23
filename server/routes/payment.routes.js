
import express from "express";
import auth from "../middleware/auth.js";

import {
  createRazorpayOrder,
  verifyRazorpayPayment,
} from "../controllers/payment.controller.js";

const router = express.Router();

router.post(
  "/create-order",
  auth,
  createRazorpayOrder
);

router.post(
  "/verify-payment",
  auth,
  verifyRazorpayPayment
);

export default router;
