import React from "react";
import { products } from "../../../assets/productStore/searchItems";
import "./accessories.css";
import ProductCard from "../../../components/productCard/ProductCard";

const AccessoriesPage = () => {
  const accessories = products.filter(
    (product) => product.category === "Accessories"
  );

  return (
    <div className="accessories-page">

      {/* ================= HERO ================= */}
      <section className="accessories-hero">

        <div className="accessories-hero-content">

          <span className="accessories-label">
            NEXORA ACCESSORIES
          </span>

          <h1>
            Upgrade Your
            <span> Setup</span>
          </h1>

          <p>
            Discover premium accessories designed to complement
            your Nexora devices. From connectivity and productivity
            to comfort and organization, find everything you need
            to build a better workspace.
          </p>

          <div className="accessories-hero-stats">

            <div className="accessory-stat">
              <strong>{accessories.length}+</strong>
              <span>Products</span>
            </div>

            <div className="accessory-stat">
              <strong>Premium</strong>
              <span>Quality</span>
            </div>

            <div className="accessory-stat">
              <strong>Nexora</strong>
              <span>Designed</span>
            </div>

          </div>

        </div>

      </section>


      {/* ================= FEATURES ================= */}
      <section className="accessories-features">

        <div className="accessory-feature">

          <div className="feature-icon">
            ⚡
          </div>

          <div>
            <h3>Built for Performance</h3>

            <p>
              Reliable accessories designed to improve
              your everyday computing experience.
            </p>
          </div>

        </div>


        <div className="accessory-feature">

          <div className="feature-icon">
            🔌
          </div>

          <div>
            <h3>Better Connectivity</h3>

            <p>
              Stay connected with practical solutions
              for your laptops and desktop setup.
            </p>
          </div>

        </div>


        <div className="accessory-feature">

          <div className="feature-icon">
            ✦
          </div>

          <div>
            <h3>Clean & Modern</h3>

            <p>
              Minimal designs that fit naturally into
              your modern workspace.
            </p>
          </div>

        </div>

      </section>


      {/* ================= PRODUCTS ================= */}
      <section className="accessories-products">

        <div className="accessories-products-header">

          <div>
            <span className="section-label">
              EXPLORE COLLECTION
            </span>

            <h2>
              Accessories
            </h2>

            <p>
              Complete your setup with carefully selected
              Nexora accessories.
            </p>
          </div>

          <div className="product-count">
            {accessories.length} Products
          </div>

        </div>


        <div className="product-grid">

          {accessories.map((product) => (

            <ProductCard
              key={product.id}
              product={product}
            />

          ))}

        </div>

      </section>


      {/* ================= BOTTOM INFO ================= */}
      <section className="accessories-info">

        <div>
          <span className="section-label">
            COMPLETE YOUR SETUP
          </span>

          <h2>
            Everything You Need.
            <br />
            All in One Place.
          </h2>

          <p>
            Whether you're upgrading your workstation,
            improving connectivity, or simply making your
            setup more comfortable, Nexora accessories
            are designed to work seamlessly with your
            technology.
          </p>
        </div>


        <div className="info-points">

          <div>
            <strong>01</strong>

            <span>
              Modern & functional designs
            </span>
          </div>

          <div>
            <strong>02</strong>

            <span>
              Designed for everyday use
            </span>
          </div>

          <div>
            <strong>03</strong>

            <span>
              Compatible with your setup
            </span>
          </div>

        </div>

      </section>

    </div>
  );
};

export default AccessoriesPage;