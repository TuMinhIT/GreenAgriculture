// services/order.service.js
const Order = require("../models/orders.model");

// Tạo đơn hàng mới
exports.createOrder = async (userId, orderData) => {
  let totalCost = 0;

  orderData.cartItems.forEach((item) => {
    totalCost += item.product.cost * item.quantity;
  });

  const profit = orderData.totalPrice - totalCost;
  const newOrder = new Order({
    userId: userId,
    fullName: orderData.fullName,
    phone: orderData.phone,
    message: orderData.message,
    items: orderData.cartItems,
    totalPrice: orderData.totalPrice,
    profit: profit,
    paymentMethod: orderData.paymentMethod,
    shippingAddress: orderData.address,
  });
  const result = await newOrder.save();
  return result;
};

// lấy tất cã đơn hàng của 1 người dùng
exports.getAllByUser = async (userId) => {
  return await Order.find({ userId }, "-profit")
    .populate("userId", "name email")
    .populate("items.product", "name price images");
};

// Lấy tất cả đơn hàng
exports.getAllOrders = async () => {
  return await Order.find()
    .populate("userId", "name email")
    .populate("items.product");
};

// Lấy đơn hàng theo ID
exports.getOrderById = async (orderId) => {
  return await Order.findById(orderId)
    .populate("userId", "name email")
    .populate("items.productId", "name");
};

// Cập nhật trạng thái đơn hàng
exports.updateOrderStatus = async (orderId, status) => {
  const order = await Order.findById(orderId);
  order.status = status;
  order.save();

  return order.status;
};

// Xóa đơn hàng
exports.deleteOrder = async (orderId) => {
  await Order.findByIdAndDelete(orderId);
  return [];
};

// Lấy đơn hàng của người dùng theo ID
exports.getMyOrderById = async (orderId, userId) => {
  return await Order.findOne({ _id: orderId, userId })
    .populate("userId", "name email")
    .populate("items.productId", "name");
};

// Lấy đơn hàng theo người dùng với phân trang
// exports.getOrdersByUser = async (userId, { page = 1, limit = 10 } = {}) => {
//   const query = { userId };
//   const [data, total] = await Promise.all([
//     Order.find(query)
//       .sort({ createdAt: -1 })
//       .skip((page - 1) * limit)
//       .limit(limit)
//       .populate("userId", "name email")
//       .populate("items.productId", "name"),
//     Order.countDocuments(query),
//   ]);
//   return {
//     data,
//     page,
//     limit,
//     total,
//     totalPages: Math.ceil(total / limit),
//   };
// };
