// routes/order.route.js
const router = require("express").Router();
const summaryController = require("../controllers/summary.controller");
const { authAdmin } = require("../middleware/auth");

// [POST] /api/order (User: tạo đơn hàng)
router.get("/", authAdmin, summaryController.getSummary);

module.exports = router;
