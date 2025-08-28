// routes/order.route.js
const router = require("express").Router();
const orderController = require("../controllers/order.controller");
const { validateBody } = require("../middleware/validateObjectId");
// const { verifyToken, checkRole } = require('../middleware/auth');
const {
  createOrderSchema,
  updateOrderStatusSchema,
} = require("../validations/order.validation");

const { authUser } = require("../middleware/auth");

// [POST] /api/orders (User: tạo đơn hàng)
router.post("/", authUser, orderController.createOrder);

// [GET] /api/orders/user + token (User: xem chi tiết đơn hàng của mình)
router.get("/user", authUser, orderController.getAllUserOrders);

// [GET] /api/orders/user/:userId (Admin: xem đơn theo user bất kỳ)
// router.get(
//   "/user/:userId",
//   // verifyToken,
//   // checkRole('admin'),
//   orderController.getOrdersByUserId
// );

// [GET] /api/orders (Admin: xem tất cả đơn)
// router.get(
//   "/",
//   // verifyToken,
//   // checkRole('admin'),
//   orderController.getAllOrders
// );

// [GET] /api/orders/:id (Admin hoặc chủ đơn)
// router.get(
//   "/:id",
//   // verifyToken,
//   orderController.getOrderById
// );

// [PATCH] /api/orders/:id/status (Admin: cập nhật trạng thái đơn)
// router.patch(
//   "/:id/status",
//   // verifyToken,
//   // checkRole('admin'),
//   validateBody(updateOrderStatusSchema),
//   orderController.updateOrderStatus
// );

// [DELETE] /api/orders/:id (Admin: xoá đơn)
// router.delete(
//   "/:id",
//   // verifyToken,
//   // checkRole('admin'),
//   orderController.deleteOrder
// );

module.exports = router;
