// models/products.model.js
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Tên sản phẩm là bắt buộc"],
      trim: true,
    },
    barcode: {
      type: String,
      required: [true, "Mã sản phẩm là bắt buộc"],
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "categories",
      required: true,
    },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "brands",
      required: true,
    },
    images: [
      {
        url: { type: String, required: true },
        public_id: { type: String, required: true }, // public_id dùng để xóa ảnh trên Cloudinary
      },
    ],
    cost: {
      type: Number,
      required: [true, "Giá gốc là bắt buộc"],
      min: 0,
    },
    price: {
      type: Number,
      min: 0,
      required: [true, "Giá bán là bắt buộc"],
      default: 0,
    },
    warrantyMonths: {
      type: Number,
      min: 0,
      required: [true, "Tháng bảo hành là bắt buộc!"],
      default: 0,
    },
    stock: {
      type: Number,
      required: [true, "Số lượng tồn kho là bắt buộc"],
      min: 0,
    },
  },
  { timestamps: true }
);

// Middleware
productSchema.pre("save", function (next) {
  if (!this.salePrice || this.salePrice === 0) {
    this.salePrice = this.price;
  }
  next();
});

const Product = mongoose.model("products", productSchema);

module.exports = Product;
