import crypto from "crypto";
import Razorpay from "razorpay";
import Cart from "../models/cart.model.js";
import Order from "../models/order.model.js";

// ========================================
// CREATE RAZORPAY ORDER
// ========================================
export const createRazorpayOrder = async (req, res) => {
  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
  
  try {
    const userId = req.userId;

    const cart = await Cart.findOne({ userId });

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty",
      });
    }

    // Calculate amount from database
    const totalAmount = cart.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );

    const razorpayOrder = await razorpay.orders.create({
      amount: Math.round(totalAmount * 100),
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    });

    // Create pending order
    const order = await Order.create({
      userId,
      items: cart.items,
      totalAmount,
      paymentMethod: "razorpay",
      paymentStatus: "pending",
      orderStatus: "pending",
      razorpayOrderId: razorpayOrder.id,
    });

    return res.status(200).json({
      success: true,
      orderId: order._id,
      razorpayOrderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error("Create Razorpay Order Error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to create payment order",
    });
  }
};

// ========================================
// VERIFY RAZORPAY PAYMENT
// ========================================
export const verifyRazorpayPayment = async (req, res) => {
  try {
    const userId = req.userId;

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderId,
    } = req.body;

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature ||
      !orderId
    ) {
      return res.status(400).json({
        success: false,
        message: "Payment details are incomplete",
      });
    }

    // Create signature
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    // Verify signature
    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment signature",
      });
    }

    // Find order
    const order = await Order.findOne({
      _id: orderId,
      userId,
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Update order
    order.paymentStatus = "paid";
    order.orderStatus = "confirmed";
    order.razorpayPaymentId = razorpay_payment_id;
    order.razorpaySignature = razorpay_signature;

    await order.save();

    // Clear cart
    await Cart.findOneAndUpdate(
      { userId },
      {
        $set: {
          items: [],
          totalAmount: 0,
        },
      },
    );

    return res.status(200).json({
      success: true,
      message: "Payment verified successfully",
      orderId: order._id,
    });
  } catch (error) {
    console.error("Verify Payment Error:", error);

    return res.status(500).json({
      success: false,
      message: "Payment verification failed",
    });
  }
};
