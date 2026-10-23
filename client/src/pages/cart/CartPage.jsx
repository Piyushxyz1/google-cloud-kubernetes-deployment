import React from "react";
import { ArrowLeft, Minus, Plus, ShoppingCart, Trash2, ShieldCheck, Truck, CreditCard } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useCart from "../../hooks/useCart";
import "./cartPage.css";

const CartPage = () => {
  const {
    removeItemFromCart,
    increaseItemQuantity,
    decreaseItemQuantity,
    clearAllCart,
    cartItems,
  } = useCart();

  const navigate = useNavigate();

  // Empty cart
  if (cartItems.length === 0) {
    return (
      <section className="cart-page cart-empty-page">
        <div className="empty-cart">
          <div className="empty-cart-icon">
            <ShoppingCart size={42} />
          </div>

          <span className="cart-eyebrow">YOUR CART</span>

          <h1>Your cart is empty</h1>

          <p>
            Looks like you haven't added anything to your cart yet.
            Explore our collection and find something you'll love.
          </p>

          <button
            className="continue-shopping-btn"
            onClick={() => navigate("/products")}
          >
            <ArrowLeft size={18} />
            Continue Shopping
          </button>
        </div>
      </section>
    );
  }

  const subtotal = cartItems.reduce(
    (total, item) =>
      total +
      Number(item.price || 0) * Number(item.quantity || 1),
    0
  );

  const shipping = subtotal >= 50000 ? 0 : 499;

  const total = subtotal + shipping;

  const totalItems = cartItems.reduce(
    (total, item) => total + Number(item.quantity || 1),
    0
  );

  return (
    <section className="cart-page">
      <div className="cart-container">

        {/* Header */}
        <div className="cart-header">
          <div>
            <span className="cart-eyebrow">NEXORA CART</span>

            <h1>
              Your <span>Shopping Cart</span>
            </h1>

            <p>
              {totalItems}{" "}
              {totalItems === 1 ? "item" : "items"} in your cart
            </p>
          </div>

          <button
            className="continue-shopping"
            onClick={() => navigate("/products")}
          >
            <ArrowLeft size={17} />
            Continue Shopping
          </button>
        </div>

        {/* Cart Layout */}
        <div className="cart-layout">

          {/* Left */}
          <div className="cart-items-section">

            <div className="cart-items-header">
              <h2>Cart Items</h2>

              <button
                className="clear-cart-btn"
                onClick={clearAllCart}
              >
                Clear Cart
              </button>
            </div>

            <div className="cart-items">

              {cartItems.map((item) => (
                <article
                  className="cart-item"
                  key={item.productId}
                >

                  {/* Image */}
                  <div
                    className="cart-item-image"
                    onClick={() =>
                      navigate(`/products/${item.productId}`)
                    }
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                    />
                  </div>

                  {/* Details */}
                  <div className="cart-item-details">

                    <div className="cart-item-top">

                      <div>
                        <span className="cart-item-category">
                          {item.category}
                        </span>

                        <h3
                          onClick={() =>
                            navigate(
                              `/products/${item.productId}`
                            )
                          }
                        >
                          {item.name}
                        </h3>

                        <p>
                          {item.brand} Technology
                        </p>
                      </div>

                      <button
                        className="remove-item-btn"
                        onClick={() =>
                          removeItemFromCart(item.productId)
                        }
                        aria-label={`Remove ${item.name}`}
                      >
                        <Trash2 size={18} />
                      </button>

                    </div>

                    <div className="cart-item-bottom">

                      {/* Quantity */}
                      <div className="quantity-control">

                        <button
                          onClick={() =>
                            decreaseItemQuantity(
                              item.productId
                            )
                          }
                          aria-label={`Decrease quantity of ${item.name}`}
                        >
                          <Minus size={15} />
                        </button>

                        <span>{item.quantity}</span>

                        <button
                          onClick={() =>
                            increaseItemQuantity(
                              item.productId
                            )
                          }
                          aria-label={`Increase quantity of ${item.name}`}
                        >
                          <Plus size={15} />
                        </button>

                      </div>

                      {/* Price */}
                      <div className="cart-item-price">

                        <span>
                          ₹
                          {Number(
                            item.price || 0
                          ).toLocaleString("en-IN")}{" "}
                          each
                        </span>

                        <strong>
                          ₹
                          {(
                            Number(item.price || 0) *
                            Number(item.quantity || 1)
                          ).toLocaleString("en-IN")}
                        </strong>

                      </div>

                    </div>
                  </div>
                </article>
              ))}

            </div>
          </div>

          {/* Right */}
          <aside className="order-summary">

            <div className="summary-header">
              <span>ORDER SUMMARY</span>
              <h2>Checkout</h2>
            </div>

            <div className="summary-rows">

              <div>
                <span>Subtotal</span>

                <strong>
                  ₹{subtotal.toLocaleString("en-IN")}
                </strong>
              </div>

              <div>
                <span>Shipping</span>

                <strong>
                  {shipping === 0
                    ? "FREE"
                    : `₹${shipping.toLocaleString("en-IN")}`}
                </strong>
              </div>

            </div>

            {shipping === 0 && (
              <div className="free-shipping-message">
                Free shipping applied to your order
              </div>
            )}

            <div className="summary-total">

              <span>Total</span>

              <strong>
                ₹{total.toLocaleString("en-IN")}
              </strong>

            </div>

            <button
              className="checkout-btn"
              onClick={() => navigate("/checkout")}
            >
              Proceed to Checkout
              <CreditCard size={18} />
            </button>

            <div className="cart-trust">

              <div className="cart-trust-item">

                <ShieldCheck size={19} />

                <div>
                  <strong>Secure Checkout</strong>
                  <span>
                    Your payment is protected
                  </span>
                </div>

              </div>

              <div className="cart-trust-item">

                <Truck size={19} />

                <div>
                  <strong>Fast Delivery</strong>
                  <span>
                    Reliable doorstep delivery
                  </span>
                </div>

              </div>

            </div>

          </aside>

        </div>
      </div>
    </section>
  );
};

export default CartPage;