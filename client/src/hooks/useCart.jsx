
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";

import {
  setCart,
} from "../redux/cartSlice";

import { API_URL } from "../config/api";

const useCart = () => {
  const dispatch = useDispatch();

  const cartItems = useSelector(
    (state) => state.cart.items || []
  );

  const { token, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  // ========================================
  // GET CART FROM BACKEND
  // ========================================
  const fetchCart = async () => {
    if (!isAuthenticated || !token) {
      dispatch(setCart([]));
      return;
    }

    try {
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

      // Token invalid/expired hone par
      // backend error ko silently handle kar sakte hain
      if (error.response?.status !== 401) {
        toast.error(
          error.response?.data?.message ||
            "Unable to fetch cart"
        );
      }
    }
  };

  // ========================================
  // FETCH CART ON LOGIN / PAGE REFRESH
  // ========================================
  useEffect(() => {
    fetchCart();
  }, [isAuthenticated, token]);

  // ========================================
  // ADD ITEM
  // ========================================
  const addItemToCart = async (product) => {
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
          image: product.image,
          // price: product.price,
          // category: product.category,
          // brand: product.brand,
        },
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

        toast.success("Item added to cart");
      }
    } catch (error) {
      console.error("Add Cart Error:", error);

      toast.error(
        error.response?.data?.message ||
          "Unable to add item to cart"
      );
    }
  };

  // ========================================
  // REMOVE ITEM
  // ========================================
  const removeItemFromCart = async (productId) => {
    if (!isAuthenticated || !token) {
      toast.error("You must be logged in to continue");
      return;
    }

    try {
      const response = await axios.delete(
        `${API_URL}/api/cart/remove/${productId}`,
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

        toast.success("Item removed from cart");
      }
    } catch (error) {
      console.error("Remove Cart Error:", error);

      toast.error(
        error.response?.data?.message ||
          "Unable to remove item"
      );
    }
  };

  // ========================================
  // INCREASE QUANTITY
  // ========================================
  const increaseItemQuantity = async (productId) => {
    if (!isAuthenticated || !token) {
      toast.error("You must be logged in to continue");
      return;
    }

    try {
      const response = await axios.patch(
        `${API_URL}/api/cart/increase/${productId}`,
        {},
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
      console.error(
        "Increase Quantity Error:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "Unable to increase quantity"
      );
    }
  };

  // ========================================
  // DECREASE QUANTITY
  // ========================================
  const decreaseItemQuantity = async (productId) => {
    if (!isAuthenticated || !token) {
      toast.error("You must be logged in to continue");
      return;
    }

    try {
      const response = await axios.patch(
        `${API_URL}/api/cart/decrease/${productId}`,
        {},
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
      console.error(
        "Decrease Quantity Error:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "Unable to decrease quantity"
      );
    }
  };

  // ========================================
  // CLEAR CART
  // ========================================
  const clearAllCart = async () => {
    if (!isAuthenticated || !token) {
      toast.error("You must be logged in to continue");
      return;
    }

    try {
      const response = await axios.delete(
        `${API_URL}/api/cart/clear`,
        {
          headers: {
            token: token,
          },
        }
      );

      if (response.data.success) {
        dispatch(setCart([]));

        toast.success("Cart cleared");
      }
    } catch (error) {
      console.error("Clear Cart Error:", error);

      toast.error(
        error.response?.data?.message ||
          "Unable to clear cart"
      );
    }
  };

  return {
    fetchCart,
    addItemToCart,
    removeItemFromCart,
    increaseItemQuantity,
    decreaseItemQuantity,
    clearAllCart,
    cartItems,
  };
};

export default useCart;

