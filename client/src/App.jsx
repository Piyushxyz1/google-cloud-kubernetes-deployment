import React, { useState } from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/Home";
import ProductPage from "./pages/products/ProductsPage";
import ProductDetails from "./pages/productDetails/ProductDetails";
import CartPage from "./pages/cart/CartPage";
import Footer from "./components/footer/Footer";
import { ToastContainer, toast } from "react-toastify";
import AccessoriesPage from "./pages/cart/accesoriespage/AccessoriesPage";
import Offers from "./pages/offerspage/Offers";
import Welcome from "./pages/welcomepage/Welcome";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/SignUp";
import ProtectedRoute from "./routes/ProtectedRoutes";
import CheckoutPage from "./pages/checkout/CheckoutPage";
import OrderSuccess from "./pages/orderstatus/OrderSuccess";
import Orders from "./pages/orderstatus/Orders";
import useCart from "./hooks/useCart";

const App = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  useCart();
  return (
    <>
      <Navbar />
      <Routes>
        {/* =========================
          PUBLIC ROUTES
      ========================== */}

        <Route
          path="/"
          element={isAuthenticated ? <Navigate to="/home" /> : <Welcome />}
        />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route path="/products" element={<ProductPage />} />

        <Route path="/accessories" element={<AccessoriesPage />} />

        <Route path="/products/:id" element={<ProductDetails />} />

        <Route path="/offers" element={<Offers />} />

        {/* =========================
          AUTH ROUTES
      ========================== */}

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        {/* =========================
          PROTECTED ROUTES
      ========================== */}

        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <CartPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/order-success"
          element={
            <ProtectedRoute>
              <OrderSuccess />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
