// server/routes/category.route.js
const express = require("express");
const router = express.Router();
const brandController = require("../controllers/brand.controller");
const { validateBody } = require("../middleware/validateObjectId");

// Public routes
router.get("/", brandController.getBrands);
router.get("/:id", brandController.getBrand);

// Protected routes (admin only)
router.post(
  "/",
  // verifyToken,
  // checkRole("admin"),
  //   validateBody(createCategorySchema),
  brandController.createBrand
);

router.put(
  "/:id",
  // verifyToken,
  // checkRole("admin"),

  brandController.updateBrand
);

router.delete(
  "/:id",
  // verifyToken,
  // checkRole("admin"),
  brandController.deleteBrand
);

module.exports = router;
