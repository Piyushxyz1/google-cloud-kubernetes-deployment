import { useState } from "react";
import "./navbar.css";

import products from "../../assets/productStore/searchItems";
import useCart from "../../hooks/useCart";

import {
  Menu,
  X,
  Search,
  ShoppingCart,
  UserPlus,
  LogIn,
  LogOut,
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "../../redux/authSlice";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ================= AUTH =================

  const { isAuthenticated } = useSelector(
    (state) => state.auth
  );

  // ================= CART =================

  const { cartItems } = useCart();

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // ================= SEARCH PRODUCTS =================

  const filteredProducts = products.filter((product) => {
    const query = search.trim().toLowerCase();

    if (!query) return false;

    return (
      product.name?.toLowerCase().includes(query) ||
      product.category?.toLowerCase().includes(query) ||
      product.brand?.toLowerCase().includes(query)
    );
  });

  // ================= PRODUCT SEARCH CLICK =================

  const handleProductClick = (productId) => {
    navigate(`/products/${productId}`);

    setSearch("");
    setMenuOpen(false);
  };

  // ================= SEARCH INPUT =================

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  // ================= CART =================

  const handleCartClick = () => {
    navigate("/cart");
    setMenuOpen(false);
  };

  // ================= AUTH =================

  const handleSignIn = () => {
    navigate("/login");
    setMenuOpen(false);
  };

  const handleCreateAccount = () => {
    navigate("/signup");
    setMenuOpen(false);
  };

  const handleSignOut = () => {
    dispatch(logout());

    setMenuOpen(false);
    setSearch("");

    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="nav-container">

        {/* ================= LOGO ================= */}

        <Link to="/" className="nav-logo">
          <strong>NEXORA</strong>
          <span>TECHNOLOGIES</span>
        </Link>

        {/* ================= DESKTOP LINKS ================= */}

        <div className="nav-links">
          <Link to="/products">
            Products
          </Link>

          <Link to="/accessories">
            Accessories
          </Link>

          <Link to="/offers">
            Offers
          </Link>
        </div>

        {/* ================= DESKTOP SEARCH ================= */}

        <div className="search-wrapper">

          <div className="nav-search">

            <Search size={17} />

            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={handleSearchChange}
            />

            {search && (
              <button
                type="button"
                className="search-clear"
                onClick={() => setSearch("")}
                aria-label="Clear search"
              >
                <X size={15} />
              </button>
            )}

          </div>

          {/* DESKTOP SEARCH RESULTS */}

          {search.trim() && (
            <div className="search-results">

              {filteredProducts.length > 0 ? (

                filteredProducts.map((product) => (

                  <div
                    className="search-result-item"
                    key={product.id}
                    onClick={() =>
                      handleProductClick(product.id)
                    }
                  >

                    <img
                      src={product.image}
                      alt={product.name}
                    />

                    <div className="search-product-info">

                      <h4>{product.name}</h4>

                      <span>
                        {product.category}
                      </span>

                      <p>
                         ₹{(product.price ?? product.originalPrice ?? 0).toLocaleString("en-IN")}
                      </p>

                    </div>

                  </div>

                ))

              ) : (

                <div className="no-results">
                  No products found
                </div>

              )}

            </div>
          )}

        </div>

        {/* ================= ACTIONS ================= */}

        <div className="nav-actions">

          {/* AUTH */}

          {isAuthenticated ? (

            <button
              type="button"
              className="nav-signin-btn"
              onClick={handleSignOut}
            >
              <LogOut size={17} />

              <span>
                Sign Out
              </span>
            </button>

          ) : (

            <>
              <button
                type="button"
                className="nav-signin-btn"
                onClick={handleSignIn}
              >
                <LogIn size={17} />

                <span>
                  Sign In
                </span>
              </button>

              <button
                type="button"
                className="nav-signup-btn"
                onClick={handleCreateAccount}
              >
                <UserPlus size={17} />

                <span>
                  Create Account
                </span>
              </button>
            </>

          )}

          {/* ================= CART ================= */}

          <button
            type="button"
            className="cart-btn"
            onClick={handleCartClick}
            aria-label="Shopping Cart"
          >
            <ShoppingCart size={21} />

            <span className="cart-count">
              {cartCount}
            </span>
          </button>

          {/* ================= BRAND LOGO ================= */}

          <button
            type="button"
            className="nav-circle-logo"
            aria-label="Nexora"
          >

            <svg
              className="trust-ring"
              viewBox="0 0 100 100"
            >

              <defs>

                <path
                  id="trustCirclePath"
                  d="
                    M 50,50
                    m -36,0
                    a 36,36 0 1,1 72,0
                    a 36,36 0 1,1 -72,0
                  "
                />

              </defs>

              <text className="trust-text">

                <textPath
                  href="#trustCirclePath"
                  startOffset="0%"
                >
                  NEXORA • TECHNOLOGY • INNOVATION •
                </textPath>

              </text>

            </svg>

            <span className="trust-d">
              N
            </span>

          </button>

          {/* ================= MENU ================= */}

          <button
            type="button"
            className="menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Menu"
          >

            {menuOpen ? (
              <X size={22} />
            ) : (
              <Menu size={22} />
            )}

          </button>

        </div>

      </div>

      {/* ================= MOBILE MENU ================= */}

      {menuOpen && (

        <div className="mobile-menu">

          {/* ================= MOBILE SEARCH ================= */}

          <div className="mobile-search-wrapper">

            <div className="mobile-search">

              <Search size={17} />

              <input
                type="text"
                placeholder="Search laptops, headphones..."
                value={search}
                onChange={handleSearchChange}
              />

              {search && (
                <button
                  type="button"
                  className="search-clear"
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                >
                  <X size={15} />
                </button>
              )}

            </div>

            {/* MOBILE SEARCH RESULTS */}

            {search.trim() && (

              <div className="mobile-search-results">

                {filteredProducts.length > 0 ? (

                  filteredProducts.map((product) => (

                    <div
                      className="search-result-item"
                      key={product.id}
                      onClick={() =>
                        handleProductClick(product.id)
                      }
                    >

                      <img
                        src={product.image}
                        alt={product.name}
                      />

                      <div className="search-product-info">

                        <h4>
                          {product.name}
                        </h4>

                        <span>
                          {product.category}
                        </span>

                        <p>
                          ₹
                          {product.price?.toLocaleString(
                            "en-IN"
                          )}
                        </p>

                      </div>

                    </div>

                  ))

                ) : (

                  <div className="no-results">
                    No products found
                  </div>

                )}

              </div>

            )}

          </div>

          {/* ================= MOBILE LINKS ================= */}

          <Link
            to="/products"
            onClick={() => setMenuOpen(false)}
          >
            Products
          </Link>

          <Link
            to="/accessories"
            onClick={() => setMenuOpen(false)}
          >
            Accessories
          </Link>

          <Link
            to="/offers"
            onClick={() => setMenuOpen(false)}
          >
            Offers
          </Link>

          {/* ================= MOBILE AUTH ================= */}

          <div className="mobile-auth">

            {isAuthenticated ? (

              <button
                type="button"
                className="mobile-signin"
                onClick={handleSignOut}
              >
                <LogOut size={18} />
                Sign Out
              </button>

            ) : (

              <>
                <button
                  type="button"
                  className="mobile-signin"
                  onClick={handleSignIn}
                >
                  <LogIn size={18} />
                  Sign In
                </button>

                <button
                  type="button"
                  className="mobile-signup"
                  onClick={handleCreateAccount}
                >
                  <UserPlus size={18} />
                  Create Account
                </button>
              </>

            )}

          </div>

          {/* ================= MOBILE CART ================= */}

          <button
            type="button"
            className="mobile-cart"
            onClick={handleCartClick}
          >
            <ShoppingCart size={19} />

            <span>
              Cart
            </span>

            {cartCount > 0 && (
              <span className="mobile-cart-count">
                {cartCount}
              </span>
            )}

          </button>

        </div>

      )}

    </nav>
  );
};

export default Navbar;