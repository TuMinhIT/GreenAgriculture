// models/products.model.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Tên sản phẩm là bắt buộc'],
      trim: true,
    },
    description: {
      type: String,
      default: '',
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    images: {
      type: [String], // các URL ảnh
      default: [],
    },
    price: {
      type: Number,
      required: [true, 'Giá gốc là bắt buộc'],
      min: 0,
    },
    salePrice: {
      type: Number,
      min: 0,
      default: 0, // nếu không giảm giá
    },
    quantity: {
      type: Number,
      required: [true, 'Số lượng tồn kho là bắt buộc'],
      min: 0,
    },
  },
  { timestamps: true }
);

// Middleware
productSchema.pre('save', function (next) {
  if (!this.salePrice || this.salePrice === 0) {
    this.salePrice = this.price;
  }
  next();
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;