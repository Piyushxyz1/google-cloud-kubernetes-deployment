import React from "react";
import products from "../../assets/productStore/searchItems";
import ProductCard from "../../components/productCard/ProductCard";
import "./offers.css";

const Offers = () => {
  // Only products having onOffer: true
  // Also fixes missing price automatically
  const offerProducts = products
    .filter((product) => product.onOffer === true)
    .map((product) => ({
      ...product,
      price:
        product.price ??
        Math.round(
          product.originalPrice * (1 - product.discount / 100)
        ),
    }));

  const bestDiscount =
    offerProducts.length > 0
      ? Math.max(...offerProducts.map((product) => product.discount || 0))
      : 0;

  return (
    <div className="offers-page">

      {/* ================= HERO ================= */}
      <section className="offers-hero">
        <div className="offers-hero-content">
          <span className="offers-badge">
          LIMITED TIME OFFERS
          </span>

          <h1>
            Special <span>Offers</span>
          </h1>

          <p>
            Grab amazing deals on selected Nexora products.
            Upgrade your setup and save more while stocks last!
          </p>

          <div className="offers-hero-stats">
            <div>
              <strong>{offerProducts.length}+</strong>
              <span>Products on Sale</span>
            </div>

            <div>
              <strong>{bestDiscount}%</strong>
              <span>Maximum Discount</span>
            </div>

            <div>
              <strong>24/7</strong>
              <span>Online Shopping</span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= DEAL BANNER ================= */}
      <section className="deal-banner">
        <div className="deal-banner-icon">
          ⚡
        </div>

        <div className="deal-banner-content">
          <span>EXCLUSIVE DEALS</span>
          <h2>Upgrade Your Tech for Less</h2>
          <p>
            Premium Nexora products at special prices.
            Don't miss these limited-time offers.
          </p>
        </div>

        <div className="deal-banner-offer">
          <strong>SALE</strong>
          <span>Limited Time</span>
        </div>
      </section>

      {/* ================= PRODUCTS ================= */}
      <section className="offers-section">

        <div className="offers-heading">
          <div>
            <span className="offers-small-title">
              BEST DEALS
            </span>

            <h2>Products on Offer</h2>

            <p>
              Save big on our handpicked products
            </p>
          </div>

          <span className="offer-count">
            {offerProducts.length} Offers Available
          </span>
        </div>

        {offerProducts.length > 0 ? (
          <div className="offers-grid">
            {offerProducts.map((product) => (
              <div
                className="offer-product-wrapper"
                key={product.id}
              >
                <div className="offer-discount">
                  🔥 {product.discount}% OFF
                </div>

                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="no-offers">
            <div className="no-offers-icon">🎁</div>

            <h3>No offers available right now</h3>

            <p>
              Check back soon for exciting deals and
              exclusive discounts!
            </p>
          </div>
        )}
      </section>

      {/* ================= WHY SHOP OFFERS ================= */}
      <section className="offers-benefits">

        <div className="benefits-heading">
          <span>WHY SHOP WITH US</span>
          <h2>More Value, Better Deals</h2>
          <p>
            Get more from every purchase with Nexora.
          </p>
        </div>

        <div className="benefits-grid">

          <div className="benefit-card">
            <div className="benefit-icon">💰</div>
            <h3>Best Prices</h3>
            <p>
              Enjoy special prices and exclusive
              discounts on selected products.
            </p>
          </div>

          <div className="benefit-card">
            <div className="benefit-icon">🚚</div>
            <h3>Fast Delivery</h3>
            <p>
              Get your products delivered quickly
              and safely to your doorstep.
            </p>
          </div>

          <div className="benefit-card">
            <div className="benefit-icon">🛡️</div>
            <h3>Trusted Quality</h3>
            <p>
              Shop confidently with reliable and
              high-quality Nexora products.
            </p>
          </div>

          <div className="benefit-card">
            <div className="benefit-icon">🔄</div>
            <h3>Easy Returns</h3>
            <p>
              Simple return options for a smooth
              and hassle-free shopping experience.
            </p>
          </div>

        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="offers-cta">
        <div>
          <span>DON'T MISS OUT</span>

          <h2>
            Great Deals Don't Last Forever!
          </h2>

          <p>
            Grab your favourite products before
            these offers disappear.
          </p>
        </div>

        <div className="cta-icon">
          🛍️
        </div>
      </section>

    </div>
  );
};

export default Offers;