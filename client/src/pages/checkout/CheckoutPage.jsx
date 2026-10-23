import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  CreditCard,
  ShoppingBag,
  Lock,
} from "lucide-react";

import { API_URL } from "../../config/api";
import { setCart } from "../../redux/cartSlice";

import "./checkout.css";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);

  const cartItems = useSelector(
    (state) => state.cart.items || []
  );

  const [loading, setLoading] = useState(false);
  const [cartLoading, setCartLoading] = useState(true);

  // ========================================
  // FETCH CART
  // ========================================
  useEffect(() => {
    if (!token) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    const fetchCart = async () => {
      try {
        setCartLoading(true);

        const response = await axios.get(
          `${API_URL}/api/cart`,
          {
            headers: {
              token: token,
            },
          }
        );

        if (response.data.success) {
          dispatch(
            setCart(response.data.cart || [])
          );
        }
      } catch (error) {
        console.error("Fetch Cart Error:", error);

        toast.error(
          error.response?.data?.message ||
            "Unable to fetch cart"
        );
      } finally {
        setCartLoading(false);
      }
    };

    fetchCart();
  }, [token, navigate, dispatch]);

  // ========================================
  // TOTAL
  // ========================================
  const totalAmount = cartItems.reduce(
    (total, item) =>
      total +
      Number(item.price || 0) *
        Number(item.quantity || 1),
    0
  );

  // ========================================
  // PAYMENT
  // ========================================
  const handlePayment = async () => {
    if (!cartItems.length) {
      toast.error("Your cart is empty");
      return;
    }

    try {
      setLoading(true);

      // ========================================
      // CREATE RAZORPAY ORDER
      // ========================================
      const response = await axios.post(
        `${API_URL}/api/payment/create-order`,
        {},
        {
          headers: {
            token: token,
          },
        }
      );

      if (!response.data.success) {
        toast.error(
          response.data.message ||
            "Unable to create payment order"
        );

        setLoading(false);
        return;
      }

      const {
        orderId,
        razorpayOrderId,
        amount,
        currency,
        key,
      } = response.data;

      // ========================================
      // RAZORPAY OPTIONS
      // ========================================
      const options = {
        key:
          key ||
          import.meta.env.VITE_RAZORPAY_KEY_ID,

        amount: amount,

        currency: currency,

        name: "NEXORA TECHNOLOGIES",

        description:
          "Nexora Technologies Order",

        order_id: razorpayOrderId,

        handler: async function (
          paymentResponse
        ) {
          try {
            setLoading(true);

            // ========================================
            // VERIFY PAYMENT
            // ========================================
            const verifyResponse =
              await axios.post(
                `${API_URL}/api/payment/verify-payment`,
                {
                  razorpay_order_id:
                    paymentResponse.razorpay_order_id,

                  razorpay_payment_id:
                    paymentResponse.razorpay_payment_id,

                  razorpay_signature:
                    paymentResponse.razorpay_signature,

                  orderId: orderId,
                },
                {
                  headers: {
                    token: token,
                  },
                }
              );

            if (
              verifyResponse.data.success
            ) {
              toast.success(
                "Payment successful!"
              );

              // Redux cart clear
              dispatch(setCart([]));

              navigate("/order-success");
            } else {
              toast.error(
                verifyResponse.data.message ||
                  "Payment verification failed"
              );
            }
          } catch (error) {
            console.error(
              "Payment Verification Error:",
              error
            );

            toast.error(
              error.response?.data?.message ||
                "Payment verification failed"
            );
          } finally {
            setLoading(false);
          }
        },

        modal: {
          ondismiss: () => {
            setLoading(false);
          },
        },

        theme: {
          color: "#2563eb",
        },
      };

      // ========================================
      // OPEN RAZORPAY
      // ========================================
      if (!window.Razorpay) {
        toast.error(
          "Razorpay SDK is not loaded"
        );

        setLoading(false);
        return;
      }

      const razorpay =
        new window.Razorpay(options);

      razorpay.on(
        "payment.failed",
        (response) => {
          console.error(
            "Payment Failed:",
            response.error
          );

          toast.error("Payment failed");

          setLoading(false);
        }
      );

      razorpay.open();
    } catch (error) {
      console.error(
        "Create Payment Error:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "Something went wrong"
      );

      setLoading(false);
    }
  };

  // ========================================
  // AUTH
  // ========================================
  if (!token) {
    return null;
  }

  // ========================================
  // CART LOADING
  // ========================================
  if (cartLoading) {
    return (
      <div className="checkout-page">
        <div className="checkout-container">
          <div className="checkout-empty">
            <h2>Loading cart...</h2>
          </div>
        </div>
      </div>
    );
  }

  // ========================================
  // EMPTY CART
  // ========================================
  if (!cartItems.length) {
    return (
      <div className="checkout-page">
        <div className="checkout-container">
          <div className="checkout-empty">
            <ShoppingBag size={50} />

            <h2>Your cart is empty</h2>

            <p>
              Add some products to your cart
              before proceeding to checkout.
            </p>

            <button
              className="pay-button"
              onClick={() => navigate("/")}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ========================================
  // PAGE
  // ========================================
  return (
    <div className="checkout-page">
      <div className="checkout-container">

        {/* HEADER */}
        <div className="checkout-header">
          <div>
            <h1>Checkout</h1>

            <p>
              Complete your purchase securely
            </p>
          </div>

          <Lock size={22} />
        </div>

        {/* CONTENT */}
        <div className="checkout-content">

          {/* ORDER SUMMARY */}
          <div className="order-summary">

            <div className="section-title">
              <ShoppingBag size={20} />

              <h2>
                Order Summary
              </h2>
            </div>

            <div className="checkout-items">

              {cartItems.map((item) => (
                <div
                  className="checkout-item"
                  key={item.productId}
                >

                  <div className="item-info">
                    <h3>{item.name}</h3>

                    <p>
                      Quantity:{" "}
                      {item.quantity || 1}
                    </p>
                  </div>

                  <div className="item-price">
                    ₹
                    {(
                      Number(
                        item.price || 0
                      ) *
                      Number(
                        item.quantity || 1
                      )
                    ).toLocaleString("en-IN")}
                  </div>

                </div>
              ))}

            </div>

            {/* PRICE */}
            <div className="price-details">

              <div>
                <span>
                  Subtotal
                </span>

                <span>
                  ₹
                  {totalAmount.toLocaleString(
                    "en-IN"
                  )}
                </span>
              </div>

              <div>
                <span>
                  Shipping
                </span>

                <span className="free">
                  FREE
                </span>
              </div>

              <div className="total-row">

                <span>
                  Total
                </span>

                <span>
                  ₹
                  {totalAmount.toLocaleString(
                    "en-IN"
                  )}
                </span>

              </div>

            </div>
          </div>

          {/* PAYMENT */}
          <div className="payment-section">

            <div className="section-title">
              <CreditCard size={20} />

              <h2>
                Payment
              </h2>
            </div>

            <div className="razorpay-info">

              <h3>
                Pay securely with Razorpay
              </h3>

              <p>
                Complete your payment using
                Razorpay's secure payment
                gateway.
              </p>

            </div>

            <button
              className="pay-button"
              onClick={handlePayment}
              disabled={loading}
            >
              {loading
                ? "Processing..."
                : `Pay ₹${totalAmount.toLocaleString(
                    "en-IN"
                  )}`}
            </button>

            <p className="secure-text">
              🔒 Secure payment powered by
              Razorpay
            </p>

          </div>

        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;