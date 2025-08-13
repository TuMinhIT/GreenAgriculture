// services/order.service.js
const Order = require('../models/orders.model');

// Tạo đơn hàng mới
exports.createOrder = async (orderData) => {
  const newOrder = new Order(orderData);
  return await newOrder.save();
};

// Lấy tất cả đơn hàng
exports.getAllOrders = async () => {
  return await Order.find().populate('userId', 'name email').populate('items.productId', 'name');
};

// Lấy đơn hàng theo ID
exports.getOrderById = async (orderId) => {
  return await Order.findById(orderId)
    .populate('userId', 'name email')
    .populate('items.productId', 'name');
};

// Cập nhật trạng thái đơn hàng
exports.updateOrderStatus = async (orderId, status) => {
  return await Order.findByIdAndUpdate(
    orderId,
    { status },
    { new: true }
  );
};

// Xóa đơn hàng
exports.deleteOrder = async (orderId) => {
  return await Order.findByIdAndDelete(orderId);
};

// Lấy đơn hàng theo người dùng với phân trang
exports.getOrdersByUser = async (userId, { page = 1, limit = 10 } = {}) => {
  const query = { userId };
  const [data, total] = await Promise.all([
    Order.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate('userId', 'name email')
      .populate('items.productId', 'name'),
    Order.countDocuments(query),
  ]);
  return {
    data,
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
  };
};

// Lấy đơn hàng của người dùng theo ID
exports.getMyOrderById = async (orderId, userId) => {
  return await Order.findOne({ _id: orderId, userId })
    .populate('userId', 'name email')
    .populate('items.productId', 'name');
};