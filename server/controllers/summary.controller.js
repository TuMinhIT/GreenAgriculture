const Product = require("../models/products.model");
const User = require("../models/users.model");
const Order = require("../models/orders.model");

const getSummary = async (req, res, next) => {
  try {
    const [product, user, order, orders] = await Promise.all([
      Product.countDocuments(),
      User.countDocuments(),
      Order.countDocuments(),
      Order.find().sort({ createdAt: -1 }).limit(10),
    ]);

    const totalUsers = user - 1;

    const allOrders = await Order.find({}, "profit"); // chỉ lấy field profit
    const totalProfit = allOrders.reduce((sum, item) => sum + item.profit, 0);

    res.json({
      totalProducts: product,
      totalUsers,
      totalOrders: order,
      totalProfit,
      recentOrders: orders,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getSummary,
};
