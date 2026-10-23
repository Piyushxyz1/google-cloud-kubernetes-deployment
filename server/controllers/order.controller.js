
import Order from "../models/order.model.js";

/*
  GET ALL ORDERS OF LOGGED-IN USER
  GET /api/orders
*/
export const getOrders = async (req, res) => {
  try {
    const userId = req.userId;

    const orders = await Order.find({ userId })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("Get Orders Error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch orders",
    });
  }
};


/*
  GET SINGLE ORDER
  GET /api/orders/:orderId
*/
export const getOrderById = async (req, res) => {
  try {
    const userId = req.userId;
    const { orderId } = req.params;

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

    return res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("Get Order By ID Error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch order",
    });
  }
}
