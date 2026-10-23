
import React, { useState } from "react";

import {
  ArrowRight,
  Zap,
} from "lucide-react";

import products from "../../assets/productStore/searchItems";
import "./productPage.css";
import ProductCard from "../../components/productCard/ProductCard";

const ProductPage = () => {


  // Selected category
  const [selectedCategory, setSelectedCategory] = useState("All Products");


  // Get unique categories
  const categories = [
    "All Products",
    ...new Set(products.map((product) => product.category)),
  ];

  // Filter products according to clicked category
  const filteredProducts =
    selectedCategory === "All Products"
      ? products
      : products.filter(
          (product) => product.category === selectedCategory
        );

  return (
    <section className="product-page" id="products">

      {/* HEADER */}
      <div className="product-page-header">
        <div>
          <span className="product-eyebrow">
            NEXORA COLLECTION
          </span>

          <h1>
            Explore Our
            <span> Technology</span>
          </h1>

          <p>
            Discover high-performance laptops, desktops, monitors,
            audio devices and accessories designed for modern
            computing.
          </p>
        </div>

        <div className="product-count">
          <strong>{filteredProducts.length}</strong>
          <span>Products</span>
        </div>
      </div>

      {/* CATEGORY FILTER */}
      <div className="product-categories">
        {categories.map((category) => (
          <button
            key={category}
            className={
              selectedCategory === category
                ? "category-active"
                : ""
            }
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* PRODUCT GRID */}
      <div className="product-grid">

        {filteredProducts.map((product,index) => (
          <ProductCard key={index} product = {product}/>
        ))}

      </div>

      {/* NO PRODUCTS MESSAGE */}
      {filteredProducts.length === 0 && (
        <div className="no-products">
          <h3>No products found</h3>
          <p>
            There are currently no products in this category.
          </p>
        </div>
      )}

      {/* BOTTOM CTA */}
      <div className="products-bottom">

        <div>

          <span className="products-bottom-icon">
            <Zap size={18} />
          </span>

          <div>
            <h3>
              Built for what's next.
            </h3>

            <p>
              Performance, innovation and reliability
              in one ecosystem.
            </p>
          </div>

        </div>

        <button
          onClick={() =>
            document
              .getElementById("products")
              ?.scrollIntoView({
                behavior: "smooth",
              })
          }
        >
          Explore Collection
          <ArrowRight size={17} />
        </button>

      </div>

    </section>
  );
};

export default ProductPage;

