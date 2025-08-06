// server/services/cart.service.js
const Cart = require('../models/carts.model');

exports.getCartByUserId = async (userId) => {
  return await Cart.findById(userId);
};

exports.updateCart = async (userId, cartData) => {
  return await Cart.findByIdAndUpdate(userId, cartData, { new: true, upsert: true });
};

exports.clearCart = async (userId) => {
  return await Cart.findByIdAndUpdate(userId, { products: [] }, { new: true });
};

exports.addToCart = async (userId, productId, quantity) => {
  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    // Nếu chưa có cart thì tạo mới
    cart = new Cart({ user: userId, items: [] });
  }

  // Xử lý hàng có hay không từ trước đó
  const existingItem = cart.items.find(item => item.product.toString() === productId);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({ product: productId, quantity });
  }

  return await cart.save();
};

exports.removeFromCart = async (userId, productId) => {
  const cart = await Cart.findOne({ user: userId });

  if (!cart) {
    throw new Error("Cart not found");
  }

  cart.items = cart.items.filter(item => item.product.toString() !== productId);

  return await cart.save();
};