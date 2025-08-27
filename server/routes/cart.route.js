// server/routes/cart.route.js
const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart.controller");
const { validateBody } = require("../middleware/validateObjectId");
const {
  updateCartSchema,
  addToCartSchema,
} = require("../validations/cart.validation");

const { authUser } = require("../middleware/auth");

router.get("/", authUser, cartController.getCart);

router.put(
  "/:userId",
  // verifyToken,
  validateBody(updateCartSchema),
  cartController.updateCart
);
router.delete(
  "/all/:userId",
  // verifyToken,
  cartController.clearCart
);
router.post(
  "/",
  // validateBody(addToCartSchema), // lỗi r
  authUser,
  cartController.addToCart
);
router.delete("/:productId", authUser, cartController.removeFromCart);

module.exports = router;
