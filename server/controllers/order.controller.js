// controllers/order.controller.js
const orderService = require("../services/order.service");
const cartService = require("../services/cart.service");

//user thêm order mới
const createOrder = async (req, res, next) => {
  try {
    const { orderData } = req.body;
    const userId = req.user;
    const newOrder = await orderService.createOrder(userId, orderData);
    if (newOrder) {
      cartService.clearCart(userId);
      res.status(201).json({
        success: true,
        newOrder,
      });
    }
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};

// Lấy tất cã các đơn hàng của user
const getAllUserOrders = async (req, res, next) => {
  try {
    const userId = req.user;
    const result = await orderService.getAllByUser(userId);
    res.json({
      success: true,
      data: result.reverse(),
    });
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};

// const getAllOrders = async (req, res, next) => {
//   try {
//     const orders = await orderService.getAllOrders();
//     res.json(orders);
//   } catch (err) {
//     next(err);
//   }
// };

// const getOrderById = async (req, res, next) => {
//   try {
//     const order = await orderService.getOrderById(req.params.id);
//     if (!order) return res.status(404).json({ message: "Order not found" });
//     res.json(order);
//   } catch (err) {
//     next(err);
//   }
// };

// const updateOrderStatus = async (req, res, next) => {
//   try {
//     const updated = await orderService.updateOrderStatus(
//       req.params.id,
//       req.body.status
//     );
//     if (!updated) return res.status(404).json({ message: "Order not found" });
//     res.json(updated);
//   } catch (err) {
//     next(err);
//   }
// };

// const deleteOrder = async (req, res, next) => {
//   try {
//     const deleted = await orderService.deleteOrder(req.params.id);
//     if (!deleted) return res.status(404).json({ message: "Order not found" });
//     res.json({ message: "Order deleted successfully" });
//   } catch (err) {
//     next(err);
//   }
// };

// Lấy chi tiết 1 đơn của user đã xác thực
// const getMyOrderById = async (req, res, next) => {
//   try {
//     const userId = req.user;
//     const order = await orderService.getMyOrderById(req.params.id, userId);
//     if (!order) return res.status(404).json({ message: "Order not found" });
//     res.json(order);
//   } catch (err) {
//     next(err);
//   }
// };

// Admin: lấy đơn theo userId bất kỳ
// const getOrdersByUserId = async (req, res, next) => {
//   try {
//     const result = await orderService.getOrdersByUser(
//       req.params.userId,
//       req.query
//     );
//     res.json(result);
//   } catch (err) {
//     next(err);
//   }
// };

module.exports = {
  createOrder,
  getAllUserOrders,
};
