// server/services/coupon.service.js
const Coupon = require('../models/coupon.model');

exports.createCoupon = async (data) => {
  return await Coupon.create(data);
};

exports.getAllCoupons = async () => {
  return await Coupon.find();
};

exports.getAvailableCoupons = async () => {
  const today = new Date();

  // Lấy trước những coupon còn hiệu lực và đang active
  const allValidCoupons = await Coupon.find({
    isActive: true,
    validFrom: { $lte: today },
    validTo: { $gte: today },
  });

  // Lọc tiếp theo logic usedCount < usageLimit (nếu có limit)
  const availableCoupons = allValidCoupons.filter((coupon) =>
    coupon.usageLimit === 0 || coupon.usedCount < coupon.usageLimit
  );

  return availableCoupons;
};

exports.getCouponById = async (id) => {
  return await Coupon.findById(id);
};

exports.updateCoupon = async (id, data) => {
  return await Coupon.findByIdAndUpdate(id, data, { new: true });
};

exports.deleteCoupon = async (id) => {
  return await Coupon.findByIdAndDelete(id);
};