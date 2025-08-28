// server/services/cart.service.js
const Cart = require("../models/carts.model");
const Product = require("../models/products.model");

exports.getCartByUserId = async (userId) => {
  const cartData = await Cart.findById(userId).populate({
    path: "products.product",
  });
  return cartData;
};

exports.updateCart = async (userId, productId, quantity) => {
  const cart = await Cart.findOne({ _id: userId });
  if (!cart) {
    // Nếu giỏ hàng chưa tồn tại, tạo mới
    const newCart = new Cart({
      _id: userId,
      products: [{ product: productId, quantity }],
    });

    return await newCart.save();
  }

  // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
  const itemIndex = cart.products.findIndex((item) => {
    return item._id.toString() === productId.toString();
  });

  if (itemIndex > -1) {
    // Nếu sản phẩm đã tồn tại, cập nhật số lượng
    cart.products[itemIndex].quantity = quantity;
    return await cart.save();
  } else {
    // Nếu sản phẩm chưa tồn tại, thêm mới
    cart.products.push({ product: productId, quantity });
  }
  return await cart.save();
};

exports.clearCart = async (userId) => {
  return await Cart.findByIdAndUpdate(userId, { products: [] }, { new: true });
};

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
