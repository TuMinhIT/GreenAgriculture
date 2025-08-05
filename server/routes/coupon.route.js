// server/routes/coupon.route.js
const express = require('express');
const router = express.Router();
const couponController = require('../controllers/coupon.controller');
// const { verifyToken, checkRole } = require('../middleware/auth');
const { validateBody } = require('../middleware/validateObjectId');
const {
  createCouponSchema,
  updateCouponSchema,
} = require('../validations/coupon.validation');

// ROUTES
router.get('/available', couponController.getAvailableCoupons);

router.get('/',
    // checkRole('admin'),
    couponController.getAllCoupons
);

router.get('/:id', couponController.getCouponById);

router.post(
  '/',
  // verifyToken,
  // checkRole('admin'),
  validateBody(createCouponSchema),
  couponController.createCoupon
);

router.put(
  '/:id',
  // verifyToken,
  // checkRole('admin'),
  validateBody(updateCouponSchema),
  couponController.updateCoupon
);

router.delete(
  '/:id',
  // verifyToken,
  // checkRole('admin'),
  couponController.deleteCoupon
);

module.exports = router;