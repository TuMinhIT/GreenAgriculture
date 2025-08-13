// controllers/order.controller.js
const orderService = require('../services/order.service');

const createOrder = async (req, res, next) => {
  try {
    const newOrder = await orderService.createOrder(req.body);
    res.status(201).json(newOrder);
  } catch (err) {
    next(err);
  }
};

const getAllOrders = async (req, res, next) => {
  try {
    const orders = await orderService.getAllOrders();
    res.json(orders);
  } catch (err) {
    next(err);
  }
};

const getOrderById = async (req, res, next) => {
  try {
    const order = await orderService.getOrderById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (err) {
    next(err);
  }
};

const updateOrderStatus = async (req, res, next) => {
  try {
    const updated = await orderService.updateOrderStatus(req.params.id, req.body.status);
    if (!updated) return res.status(404).json({ message: 'Order not found' });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

const deleteOrder = async (req, res, next) => {
  try {
    const deleted = await orderService.deleteOrder(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Order not found' });
    res.json({ message: 'Order deleted successfully' });
  } catch (err) {
    next(err);
  }
};

// Lấy đơn của user đang đăng nhập
const getMyOrders = async (req, res, next) => {
  try {
    const userId = req.user?.id || req.user?._id;
    const result = await orderService.getOrdersByUser(userId, req.query);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

// Lấy chi tiết 1 đơn của user đang đăng nhập
const getMyOrderById = async (req, res, next) => {
  try {
    const userId = req.user?.id || req.user?._id;
    const order = await orderService.getMyOrderById(req.params.id, userId);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (err) {
    next(err);
  }
};

// Admin: lấy đơn theo userId bất kỳ
const getOrdersByUserId = async (req, res, next) => {
  try {
    const result = await orderService.getOrdersByUser(req.params.userId, req.query);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
  getMyOrders,
  getMyOrderById,
  getOrdersByUserId,
};