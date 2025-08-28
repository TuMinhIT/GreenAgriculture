// models/orders.model.js
const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
});

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fullName: { type: String },
    phone: {
      type: String,
    },
    message: {
      type: String,
    },

    items: {
      type: [orderItemSchema],
      required: true,
      validate: [
        (arr) => arr.length > 0,
        "Đơn hàng phải có ít nhất một sản phẩm",
      ],
    },
    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    profit: {
      type: Number,
      // required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Paid", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
    },
    paymentMethod: {
      type: String,
      enum: ["cod", "stripe", "razorpay"],
      default: "Cash",
    },
    payment: {
      type: Boolean,
      default: false,
    },
    shippingAddress: {
      type: String,
      required: true,
    },
    promotionCode: {
      type: String,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
