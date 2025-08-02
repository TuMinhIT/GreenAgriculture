// models/coupon.model.js
const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: [true, 'Mã giảm giá là bắt buộc'],
      unique: true,
      uppercase: true,
      trim: true,
    },
    description: {
      type: String,
      default: '',
    },
    discountType: {
      type: String,
      enum: ['percent', 'fixed'], // phần trăm or số tiền cụ thể
      required: true,
    },
    discountValue: {
      type: Number,
      required: true,
      min: 0,
    },
    validFrom: {
      type: Date,
      required: true,
    },
    validTo: {
      type: Date,
      required: true,
    },
    usageLimit: {
      type: Number,
      default: 0, // 0 nghĩa là no limit
    },
    usedCount: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Optional: Middleware tự disable nếu hết hạn
couponSchema.pre('save', function (next) {
  if (this.validTo < new Date()) {
    this.isActive = false;
  }
  next();
});

const Coupon = mongoose.model('Coupon', couponSchema);

module.exports = Coupon;