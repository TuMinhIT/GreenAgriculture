// server/controllers/cart.controller.js
const cartService = require("../services/cart.service");

// Lấy giỏ hàng của người dùng
exports.getCart = async (req, res) => {
  try {
    const cart = await cartService.getCartByUserId(req.params.userId);
    res.json(cart || { _id: req.params.userId, products: [] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Cập nhật giỏ hàng
// Chỉ cập nhật sản phẩm, không xóa sản phẩm cũ, ví dụ: thêm số lượng,...
exports.updateCart = async (req, res) => {
  try {
    const updatedCart = await cartService.updateCart(
      req.params.userId,
      req.body
    );
    res.json(updatedCart);
  } catch (err) {
    res.status(500).json({ error: err.message });
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
    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Xóa sản phẩm khỏi giỏ hàng
exports.removeFromCart = async (req, res) => {
  try {
    const productId = req.params.productId;
    const userId = req.user._id;

    const updatedCart = await cartService.removeFromCart(userId, productId);
    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
