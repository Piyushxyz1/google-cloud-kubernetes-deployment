
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  CheckCircle2,
  Package,
  ShoppingBag,
  ArrowRight,
} from "lucide-react";
import "./orderstatus.css"

const OrderSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Order ID can come from navigation state
  // or from query params if needed later
  const orderId =
    location.state?.orderId ||
    new URLSearchParams(location.search).get("orderId");

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <div className="order-success-page">
      <div className="success-container">

        {/* Success Icon */}
        <div className="success-icon-wrapper">
          <div className="success-circle">
            <CheckCircle2 size={72} strokeWidth={1.8} />
          </div>
        </div>

        {/* Heading */}
        <h1>Order Placed Successfully!</h1>

        <p className="success-message">
          Thank you for shopping with <strong>NEXORA TECHNOLOGIES</strong>.
          Your payment has been successfully verified and your order is now
          confirmed.
        </p>

        {/* Order Card */}
        <div className="order-card">

          <div className="order-card-header">
            <div className="header-icon">
              <Package size={22} />
            </div>

            <div>
              <h3>Order Confirmed</h3>
              <span>Your order has been received</span>
            </div>
          </div>

          <div className="order-details">

            <div className="detail-item">
              <span>Payment Status</span>
              <strong className="paid">
                <CheckCircle2 size={16} />
                Paid
              </strong>
            </div>

            <div className="detail-item">
              <span>Order Status</span>
              <strong>Confirmed</strong>
            </div>

            {orderId && (
              <div className="detail-item order-id">
                <span>Order ID</span>
                <strong>{orderId}</strong>
              </div>
            )}

          </div>
        </div>

      
       

        {/* Buttons */}
        <div className="success-actions">

          <button
            className="primary-btn"
            onClick={() => navigate("/orders")}
          >
            View My Orders
            <ArrowRight size={18} />
          </button>

          <button
            className="secondary-btn"
            onClick={() => navigate("/products")}
          >
            <ShoppingBag size={18} />
            Continue Shopping
          </button>

        </div>

        <p className="support-text">
          Need help with your order? Contact NEXORA TECHNOLOGIES support.
        </p>

      </div>

      
    </div>
  );
};

export default OrderSuccess;

