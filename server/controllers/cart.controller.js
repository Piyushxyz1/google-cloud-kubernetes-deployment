import Cart from "../models/cart.model.js";
import products from "../product-data/products.js";

// Calculate total
const calculateTotal = (items) => {
  return items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
};

// Sync cart prices with backend product catalogue
const syncPricesFromCatalogue = (cart) => {
  cart.items = cart.items.filter((item) =>
    products.some(
      (product) => Number(product.id) === Number(item.productId)
    )
  );

  cart.items.forEach((item) => {
    const product = products.find(
      (product) => Number(product.id) === Number(item.productId)
    );

    item.price = product.price;
  });

  cart.totalAmount = calculateTotal(cart.items);
};

// GET /api/cart
export const getCart = async (req, res) => {
  try {
    const userId = req.userId;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = await Cart.create({
        userId,
        items: [],
        totalAmount: 0,
      });
    }

    syncPricesFromCatalogue(cart);
    await cart.save();

    return res.status(200).json({
      success: true,
      cart: cart.items,
      totalAmount: cart.totalAmount,
    });
  } catch (error) {
    console.error("Get Cart Error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch cart",
    });
  }
};

// POST /api/cart/add
export const addToCart = async (req, res) => {
  try {
    const userId = req.userId;
    const { id } = req.body;

    const productId = Number(id);

    if (
      id === undefined ||
      id === null ||
      id === "" ||
      !Number.isSafeInteger(productId)
    ) {
      return res.status(400).json({
        success: false,
        message: "Valid product ID is required",
      });
    }

    const product = products.find(
      (item) => item.id === productId && item.name === req.body.name
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({
        userId,
        items: [],
        totalAmount: 0,
      });
    }

    syncPricesFromCatalogue(cart);

    const existingItem = cart.items.find(
      (item) => item.productId === String(product.id)
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.items.push({
        productId: String(product.id),
        name: product.name,
        price: product.price,
        image: req.body.image || "",
        category: product.category || "",
        brand: product.brand || "",
        quantity: 1,
      });
    }

    cart.totalAmount = calculateTotal(cart.items);

    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Item added to cart",
      cart: cart.items,
      totalAmount: cart.totalAmount,
    });
  } catch (error) {
    console.error("Add To Cart Error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to add item to cart",
    });
  }
};

// DELETE /api/cart/remove/:productId
export const removeFromCart = async (req, res) => {
  try {
    const userId = req.userId;
    const { productId } = req.params;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    syncPricesFromCatalogue(cart);

    cart.items = cart.items.filter(
      (item) => item.productId !== String(productId)
    );

    cart.totalAmount = calculateTotal(cart.items);

    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Item removed from cart",
      cart: cart.items,
      totalAmount: cart.totalAmount,
    });
  } catch (error) {
    console.error("Remove From Cart Error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to remove item",
    });
  }
};

// PATCH /api/cart/increase/:productId
export const increaseQuantity = async (req, res) => {
  try {
    const userId = req.userId;
    const { productId } = req.params;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    syncPricesFromCatalogue(cart);

    const item = cart.items.find(
      (item) => item.productId === String(productId)
    );

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Product not found in cart",
      });
    }

    item.quantity += 1;

    cart.totalAmount = calculateTotal(cart.items);

    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Quantity increased",
      cart: cart.items,
      totalAmount: cart.totalAmount,
    });
  } catch (error) {
    console.error("Increase Quantity Error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to increase quantity",
    });
  }
};

// PATCH /api/cart/decrease/:productId
export const decreaseQuantity = async (req, res) => {
  try {
    const userId = req.userId;
    const productId = String(req.params.productId).trim();

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Valid product ID is required",
      });
    }

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    syncPricesFromCatalogue(cart);

    const item = cart.items.find(
      (item) => item.productId === productId
    );

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Product not found in cart",
      });
    }

    if (item.quantity > 1) {
      item.quantity -= 1;
    } else {
      cart.items = cart.items.filter(
        (cartItem) => cartItem.productId !== productId
      );
    }

    cart.totalAmount = calculateTotal(cart.items);

    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Quantity decreased",
      cart: cart.items,
      totalAmount: cart.totalAmount,
    });
  } catch (error) {
    console.error("Decrease Quantity Error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to decrease quantity",
    });
  }
};

// DELETE /api/cart/clear
export const clearCart = async (req, res) => {
  try {
    const userId = req.userId;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    cart.items = [];
    cart.totalAmount = 0;

    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Cart cleared",
      cart: [],
      totalAmount: 0,
    });
  } catch (error) {
    console.error("Clear Cart Error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to clear cart",
    });
  }
};