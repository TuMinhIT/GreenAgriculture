const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");

const app = express();

// Middleware toàn cục
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const userRoutes = require("./routes/user.route");
const categoryRoutes = require("./routes/category.route");
const productRoutes = require("./routes/product.route");
const couponRoutes = require("./routes/coupon.route");
const cartRoutes = require("./routes/cart.route");
const brandRoutes = require("./routes/brand.route");
const orderRoutes = require('./routes/order.route');

// Routes
app.use("/api/users", userRoutes);
app.use("/api/brands", brandRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/coupons", couponRoutes);
app.use("/api/cart", cartRoutes);
app.use('/api/orders', orderRoutes);

// Test API thử
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API E-commerce Nông Nghiệp đang hoạt động",
    timestamp: new Date().toISOString(),
  });
});

// Middleware lỗi
app.use(notFound);
app.use(errorHandler);

module.exports = app;
