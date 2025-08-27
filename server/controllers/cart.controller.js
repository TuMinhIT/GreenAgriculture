// server/controllers/cart.controller.js
const cartService = require("../services/cart.service");

// Lấy giỏ hàng của người dùng
exports.getCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const cart = await cartService.getCartByUserId(userId);
    if (!cart) {
      return res.send({
        success: true,
        data: { _id: userId, products: [] },
      });
    }
    return res.send({
      success: true,
      data: cart || { _id: userId, products: [] },
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }
};
// Cập nhật số lượng giỏ hàng
exports.updateCartItem = async (req, res) => {
  try {
    const productId = req.params.productId;
    const userId = req.user;
    const { quantity } = req.body;
    if (quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be greater than 0",
      });
    }
    const updatedCart = await cartService.updateCart(
      userId,
      productId,
      quantity
    );
    res.json({
      success: true,
      data: updatedCart,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Xóa all
exports.clearCart = async (req, res) => {
  try {
    const clearedCart = await cartService.clearCart(req.params.userId);
    res.json(clearedCart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Thêm sản phẩm vào giỏ hàng
exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user._id;
    const updatedCart = await cartService.addToCart(
      userId,
      productId,
      quantity
    );
    res.status(200).json({
      success: true,
      data: updatedCart,
    });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ error: err.message });
  }
};

// Xóa sản phẩm khỏi giỏ hàng
exports.removeFromCart = async (req, res) => {
  try {
    const productId = req.params.productId;
    const userId = req.user;
    const updatedCart = await cartService.removeFromCart(userId, productId);
    res.status(200).json({
      success: true,
      data: updatedCart,
    });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};
