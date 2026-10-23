import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useCart from "../../hooks/useCart";
import { useSelector,useDispatch } from "react-redux";
import axios from "axios";
import { API_URL } from "../../config/api";
import {
  ArrowLeft,
  ArrowRight,
  ShoppingCart,
  Zap,
  Star,
  ShieldCheck,
  Truck,
  PackageCheck,
  Check,
} from "lucide-react";

import products from "../../assets/productStore/searchItems";
import "./productDetails.css";
import { toast } from "react-toastify";

import { setCart } from "../../redux/cartSlice";

import { productGalleryImages } from "../../assets/productStore/searchItems";


const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items || []);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setSelectedImage("");
  }, [id]);

  // Find product according to URL id
  const product = products.find((item) => item.id === Number(id));


  // INVALID PRODUCT


  const { addItemToCart } = useCart();

  const buyNow = async (product) => {


    if (!isAuthenticated || !token) {
      toast.error("You must be logged in to continue");
      return;
    }

    try {
      const response = await axios.post(
        `${API_URL}/api/cart/add`,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          category: product.category,
          brand: product.brand,
        },
        {
          headers: {
            token: token,
          },
        },
      );

      if (response.data.success) {
        dispatch(setCart(response.data.cart || []));

        navigate("/cart");
      }
    } catch (error) {
      console.error("Add Cart Error:", error);

      toast.error(
        error.response?.data?.message || "Unable to add item to cart",
      );
    }
  };

  if (!product) {
    return (
      <section className="product-details-page product-not-found">
        <div className="not-found-content">
          <span>404</span>

          <h1>Product Not Found</h1>

          <p>
            The product you are looking for does not exist or may have been
            removed.
          </p>

          <button onClick={() => navigate("/products")}>
            <ArrowLeft size={17} />
            Back to Products
          </button>
        </div>
      </section>
    );
  }

  // ============================
  // RELATED PRODUCTS
  // ============================

  const relatedProducts = products
    .filter(
      (item) => item.category === product.category && item.id !== product.id,
    )
    .slice(0, 4);

  // ============================
  // STOCK STATUS
  // ============================

  const isInStock = product.stock > 0;

  return (
    <section className="product-details-page">
      {/* =====================================================
          TOP NAVIGATION
      ===================================================== */}

      <div className="product-details-top">
        <button className="back-products" onClick={() => navigate("/products")}>
          <ArrowLeft size={17} />
          Back to Products
        </button>

        <span className="product-id">PRODUCT ID #{product.id}</span>
      </div>

      {/* =====================================================
          MAIN PRODUCT SECTION
      ===================================================== */}

      <div className="product-details-main">
        {/* ================= IMAGE ================= */}

        <div className="product-details-image-section">
          <div className="details-image-badge">NEXORA</div>

          {/* PRODUCT IMAGE GALLERY */}
          <div
            className="product-image-gallery"
            style={{
              display: "flex",
              alignItems: "stretch",
              gap: "14px",
              width: "100%",
              marginTop: "14px",
            }}
          >
            <div
              className="product-image-thumbnails"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                flexShrink: 0,
                width: "70px",
              }}
            >
              {[product.image, ...(productGalleryImages[product.category] || [])]
                .filter((image, index, images) => image && images.indexOf(image) === index)
                .map((image, index) => (
                  <button
                    type="button"
                    key={image}
                    onClick={() => setSelectedImage(image)}
                    aria-label={`View product image ${index + 1}`}
                    aria-pressed={(selectedImage || product.image) === image}
                    style={{
                      width: "70px",
                      height: "66px",
                      padding: "4px",
                      borderRadius: "6px",
                      border:
                        (selectedImage || product.image) === image
                          ? "2px solid #2563eb"
                          : "1px solid #d1d5db",
                      background: "#ffffff",
                      cursor: "pointer",
                      overflow: "hidden",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      src={image}
                      alt={`${product.name} view ${index + 1}`}
                      loading="lazy"
                      style={{
                        display: "block",
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                      }}
                    />
                  </button>
                ))}
            </div>

            <div
              className="details-image-container"
              style={{
                flex: "1",
                minWidth: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
              }}
            >
              <img
                src={selectedImage || product.image}
                alt={product.name}
                style={{
                  display: "block",
                  width: "100%",
                  height: "100%",
                  maxHeight: "440px",
                  objectFit: "contain",
                }}
              />
            </div>
          </div>

          {/* <div className="image-category">{product.category}</div> */}
        </div>

        {/* ================= PRODUCT INFO ================= */}

        <div className="product-details-content">
          <div className="details-meta">
            <span className="details-category">{product.category}</span>

            <div className="details-rating">
              <Star size={15} fill="currentColor" />

              <strong>{product.rating}</strong>

              <span>/ 5</span>
            </div>
          </div>

          <h1>{product.name}</h1>

          <p className="details-brand">{product.brand} Technology</p>

          {/* DESCRIPTION */}

          <p className="details-description">{product.description}</p>

          {/* PRICE */}

          <div className="details-price-section">
            <span>Current Price</span>

            <strong>₹{product.price.toLocaleString("en-IN")}</strong>
          </div>

          {/* STOCK */}

          <div
            className={`details-stock ${
              isInStock ? "in-stock" : "out-of-stock"
            }`}
          >
            <span className="stock-dot"></span>

            {isInStock
              ? `${product.stock} units available`
              : "Currently out of stock"}
          </div>

          {/* ACTIONS */}

          <div className="details-actions">
            <button
              className="buy-now-btn"
              disabled={!isInStock}
              onClick={() => buyNow(product)}
            >
              <Zap size={18} />
              Buy Now
            </button>

            <button
              className="add-cart-btn"
              onClick={() => addItemToCart(product)}
            >
              <ShoppingCart size={18} />
              Add to Cart
            </button>
          </div>

          {/* TRUST FEATURES */}

          <div className="details-trust">
            <div>
              <ShieldCheck size={20} />

              <div>
                <strong>Secure Purchase</strong>

                <span>Safe & reliable checkout</span>
              </div>
            </div>

            <div>
              <Truck size={20} />

              <div>
                <strong>Fast Delivery</strong>

                <span>{product.delivery}</span>
              </div>
            </div>

            <div>
              <PackageCheck size={20} />

              <div>
                <strong>Warranty</strong>

                <span>{product.warranty}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          PRODUCT INFORMATION
      ===================================================== */}

      <div className="product-information">
        {/* ================= SPECIFICATIONS ================= */}

        <div className="information-card">
          <div className="information-heading">
            <span>01</span>

            <div>
              <h2>Specifications</h2>

              <p>Technical details</p>
            </div>
          </div>

          <div className="specifications-list">
            {Object.entries(product.specifications).map(([key, value]) => (
              <div className="specification-row" key={key}>
                <span>{key}</span>

                <strong>{value}</strong>
              </div>
            ))}
          </div>
        </div>

        {/* ================= FEATURES ================= */}

        <div className="information-card">
          <div className="information-heading">
            <span>02</span>

            <div>
              <h2>Key Features</h2>

              <p>What makes it special</p>
            </div>
          </div>

          <div className="features-list">
            {product.features.map((feature, index) => (
              <div className="feature-item" key={index}>
                <Check size={17} />

                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* =====================================================
          PRODUCT HIGHLIGHTS
      ===================================================== */}

      <div className="product-highlights">
        <div className="highlights-header">
          <span>NEXORA ADVANTAGE</span>

          <h2>Built for what's next.</h2>

          <p>
            Designed around performance, reliability and a better technology
            experience.
          </p>
        </div>

        <div className="highlights-grid">
          {product.highlights.map((highlight, index) => (
            <div className="highlight-item" key={index}>
              <span>0{index + 1}</span>

              <p>{highlight}</p>
            </div>
          ))}
        </div>
      </div>

      {/* =====================================================
          IN THE BOX
      ===================================================== */}

      <div className="box-section">
        <div className="box-heading">
          <span>INCLUDED</span>

          <h2>What's in the box?</h2>
        </div>

        <div className="box-items">
          {product.inTheBox.map((item, index) => (
            <div className="box-item" key={index}>
              <PackageCheck size={18} />

              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* =====================================================
          RELATED PRODUCTS
      ===================================================== */}

      {relatedProducts.length > 0 && (
        <div className="related-products">
          <div className="related-header">
            <div>
              <span>YOU MAY ALSO LIKE</span>

              <h2>More {product.category}</h2>
            </div>

            <button onClick={() => navigate("/products")}>
              View All
              <ArrowRight size={17} />
            </button>
          </div>

          <div className="related-grid">
            {relatedProducts.map((relatedProduct) => (
              <article
                className="related-card"
                key={relatedProduct.id}
                onClick={() => navigate(`/products/${relatedProduct.id}`)}
              >
                <div className="related-image">
                  <img src={relatedProduct.image} alt={relatedProduct.name} />
                </div>

                <div className="related-content">
                  <span>{relatedProduct.category}</span>

                  <h3>{relatedProduct.name}</h3>

                  <div>
                    <strong>
                      ₹{relatedProduct.price.toLocaleString("en-IN")}
                    </strong>

                    <ArrowRight size={17} />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductDetails;
