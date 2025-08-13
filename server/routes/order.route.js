// routes/order.route.js
const router = require('express').Router();
const orderController = require('../controllers/order.controller');
const { validateBody } = require('../middleware/validateObjectId');
// const { verifyToken, checkRole } = require('../middleware/auth');
const {
  createOrderSchema,
  updateOrderStatusSchema,
} = require('../validations/order.validation');

// [GET] /api/orders/my  (User: xem đơn hàng của mình)
router.get(
  '/my',
  // verifyToken,
  orderController.getMyOrders
);

// [GET] /api/orders/my/:id (User: xem chi tiết đơn hàng của mình)
router.get(
  '/my/:id',
  // verifyToken,
  orderController.getMyOrderById
);

// [GET] /api/orders/user/:userId (Admin: xem đơn theo user bất kỳ)
router.get(
  '/user/:userId',
  // verifyToken,
  // checkRole('admin'),
  orderController.getOrdersByUserId
);

// [GET] /api/orders (Admin: xem tất cả đơn)
router.get(
  '/',
  // verifyToken,
  // checkRole('admin'),
  orderController.getAllOrders
);

// [GET] /api/orders/:id (Admin hoặc chủ đơn)
router.get(
  '/:id',
  // verifyToken,
  orderController.getOrderById
);

// [POST] /api/orders (User: tạo đơn hàng)
router.post(
  '/',
  // verifyToken,
  validateBody(createOrderSchema),
  orderController.createOrder
);

// [PATCH] /api/orders/:id/status (Admin: cập nhật trạng thái đơn)
router.patch(
  '/:id/status',
  // verifyToken,
  // checkRole('admin'),
  validateBody(updateOrderStatusSchema),
  orderController.updateOrderStatus
);

// [DELETE] /api/orders/:id (Admin: xoá đơn)
router.delete(
  '/:id',
  // verifyToken,
  // checkRole('admin'),
  orderController.deleteOrder
);

module.exports = router;