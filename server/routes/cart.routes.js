
import express from "express";

import auth from "../middleware/auth.js";

import {
  getCart,
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} from "../controllers/cart.controller.js";

const router = express.Router();

router.get("/", auth, getCart);

router.post("/add", auth, addToCart);

router.delete("/remove/:productId", auth, removeFromCart);

router.patch("/increase/:productId", auth, increaseQuantity);

router.patch("/decrease/:productId", auth, decreaseQuantity);

router.delete("/clear", auth, clearCart);

export default router;

