// server/controllers/coupon.controller.js
const couponService = require('../services/coupon.service');

// Tạo mã giảm giá
exports.createCoupon = async (req, res) => {
  try {
    const coupon = await couponService.createCoupon(req.body);
    const savedCoupon = await coupon.save();
    res.status(201).json(savedCoupon);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Lấy tất cả mã giảm giá
exports.getAllCoupons = async (req, res) => {
  try {
    const coupons = await couponService.getAllCoupons();
    res.json(coupons);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Lấy mã giảm giá khả dụng
exports.getAvailableCoupons = async (req, res) => {
  try {
    const coupons = await couponService.getAvailableCoupons();
    res.json(coupons);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Lấy mã giảm giá theo ID
exports.getCouponById = async (req, res) => {
  try {
    const coupon = await couponService.getCouponById(req.params.id);
    if (!coupon) return res.status(404).json({ error: 'Không tìm thấy mã giảm giá' });
    res.json(coupon);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Cập nhật mã giảm giá
exports.updateCoupon = async (req, res) => {
  try {
    const updated = await couponService.updateCoupon(req.params.id, req.body);

    if (!updated) {
      return res.status(404).json({ message: 'Coupon not found' });
    }

    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Xoá mã giảm giá
exports.deleteCoupon = async (req, res) => {
  try {
    const deleted = await couponService.deleteCoupon(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Không tìm thấy mã giảm giá' });

    res.json({ message: 'Xoá thành công' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};