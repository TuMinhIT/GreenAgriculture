// server/services/cart.service.js
const Cart = require("../models/carts.model");

exports.getCartByUserId = async (userId) => {
  const cartData = await Cart.findById(userId).populate({
    path: "products.product",
    select: "-cost",
  });
  return cartData;
};

exports.updateCart = async (userId, cartData) => {
  return await Cart.findByIdAndUpdate(userId, cartData, {
    new: true,
    upsert: true,
  });
};

exports.clearCart = async (userId) => {
  return await Cart.findByIdAndUpdate(userId, { products: [] }, { new: true });
};

const Product = require("../models/products.model");

exports.addToCart = async (userId, productId, quantity) => {
  try {
    // 1. Tìm cart theo userId (_id của Cart = userId)
    let cart = await Cart.findById(userId);

    // Nếu chưa có cart thì tạo mới
    if (!cart) {
      cart = new Cart({
        _id: userId,
        products: [],
      });
    }

    // 2. Lấy thông tin sản phẩm (để snapshot name + price)
    const product = await Product.findById(productId);
    if (!product) {
      throw new Error("Product not found");
    }
    // 3. Kiểm tra sản phẩm đã tồn tại trong giỏ chưa
    const existingItem = cart.products.find(
      (item) => item.product.toString() === productId
    );

    if (existingItem) {
      // Nếu đã có thì tăng số lượng
      existingItem.quantity += quantity;
    } else {
      // Nếu chưa có thì push vào giỏ
      cart.products.push({
        product: product._id,
        barcode: product.barcode,
        name: product.name,
        price: product.price,
        quantity: quantity,
      });
    }
    const result = await cart.save();
    //  Lưu lại cart
    return result;
  } catch (error) {
    console.error("Error in addToCart:", error.message);
    throw error;
  }
};

exports.removeFromCart = async (userId, productId) => {
  const cart = await Cart.findOne({ _id: userId });

  if (!cart) {
    throw new Error("Cart not found");
  }

  cart.products = cart.products.filter(
    (item) => item.product.toString() !== productId
  );

  return await cart.save();
};
