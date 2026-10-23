
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Package, ShoppingBag, ArrowRight } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

import { API_URL } from "../../config/api";
import "./orderstatus.css";

const Orders = () => {
  const navigate = useNavigate();

  const { token, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated || !token) {
      toast.error("Please login to view your orders");
      navigate("/login");
      return;
    }

    fetchOrders();
  }, [isAuthenticated, token]);

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `${API_URL}/api/orders`,
        {
          headers: {
            token: token,
          },
        }
      );

      if (response.data.success) {
        setOrders(response.data.orders || []);
      }
    } catch (error) {
      console.error("Fetch Orders Error:", error);

      toast.error(
        error.response?.data?.message ||
          "Unable to fetch orders"
      );
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatPrice = (price) => {
    return Number(price || 0).toLocaleString("en-IN");
  };

  if (loading) {
    return (
      <div className="orders-page">
        <div className="orders-loading">
          Loading your orders...
        </div>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <div className="orders-container">

        {/* Header */}
        <div className="orders-header">
          <h1>My Orders</h1>

          <p>
            Track and manage all your NEXORA TECHNOLOGIES
            orders.
          </p>
        </div>

        {/* No Orders */}
        {orders.length === 0 ? (
          <div className="empty-orders">
            <Package size={55} strokeWidth={1.5} />

            <h2>No Orders Yet</h2>

            <p>
              You haven't placed any orders yet.
              Start shopping and your orders will appear here.
            </p>

            <button
              className="order-btn"
              onClick={() => navigate("/")}
            >
              <ShoppingBag size={16} />
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="orders-list">

            {orders.map((order) => (
              <div
                className="order-card"
                key={order._id}
              >

                {/* Top */}
                <div className="order-card-top">

                  <div className="order-id">
                    <span>Order ID</span>

                    <strong>
                      #{order._id}
                    </strong>
                  </div>

                  <span
                    className={`order-status ${
                      order.orderStatus || "pending"
                    }`}
                  >
                    {order.orderStatus || "pending"}
                  </span>

                </div>

                {/* Info */}
                <div className="order-info">

                  <div className="order-info-item">
                    <span>Order Date</span>

                    <strong>
                      {formatDate(order.createdAt)}
                    </strong>
                  </div>

                  <div className="order-info-item">
                    <span>Payment</span>

                    <strong
                      className={`order-status ${
                        order.paymentStatus || "pending"
                      }`}
                    >
                      {order.paymentStatus || "pending"}
                    </strong>
                  </div>

                  <div className="order-info-item">
                    <span>Items</span>

                    <strong>
                      {order.items?.length || 0}{" "}
                      {order.items?.length === 1
                        ? "Item"
                        : "Items"}
                    </strong>
                  </div>

                </div>

                {/* Items */}
                <div className="order-items">

                  {order.items
                    ?.slice(0, 3)
                    .map((item) => (
                      <div
                        className="order-item"
                        key={item.productId}
                      >

                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                          />
                        ) : (
                          <div
                            style={{
                              width: "60px",
                              height: "60px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              background:
                                "rgba(255,255,255,0.05)",
                              borderRadius: "8px",
                            }}
                          >
                            <Package size={25} />
                          </div>
                        )}

                        <div className="order-item-details">
                          <h4>{item.name}</h4>

                          <p>
                            Quantity: {item.quantity}
                          </p>
                        </div>

                        <div className="order-item-price">
                          ₹
                          {formatPrice(
                            item.price * item.quantity
                          )}
                        </div>

                      </div>
                    ))}

                  {/* More Items */}
                  {order.items?.length > 3 && (
                    <p
                      style={{
                        color: "var(--text-muted)",
                        fontSize: "13px",
                        margin: "5px 0 0",
                      }}
                    >
                      + {order.items.length - 3} more item(s)
                    </p>
                  )}

                </div>

                {/* Footer */}
                <div className="order-card-footer">

                  <div className="order-total">
                    <span>Total Amount</span>

                    <strong>
                      ₹{formatPrice(order.totalAmount)}
                    </strong>
                  </div>

                  <button
                    className="order-btn"
                    onClick={() =>
                      navigate(
                        `/orders/${order._id}`
                      )
                    }
                  >
                    View Details
                    <ArrowRight size={16} />
                  </button>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
};

export default Orders;

