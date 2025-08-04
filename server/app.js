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
// Routes
app.use('/api/categories', require('./routes/category.route'));
app.use('/api/products', require('./routes/product.route'));

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
