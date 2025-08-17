const router = require('express').Router();
const productController = require('../controllers/product.controller');
const { validateBody } = require('../middleware/validateObjectId');
const { upload } = require('../utils/upload');
// const { verifyToken, checkRole } = require('../middleware/auth');
const {
  createProductSchema,
  updateProductSchema,
} = require('../validations/product.validation');

// Public route
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);

// Protected routes (admin only)
// POST: Tạo sản phẩm mới
router.post(
  "/",
  // verifyToken,
  // checkRole("admin"),
  upload.array("images", 10),
  validateBody(createProductSchema),
  productController.createProduct
);

// PUT: Cập nhật sản phẩm
router.put(
  "/:id",
  // verifyToken,
  // checkRole("admin"),
  upload.array("images", 10),
  validateBody(updateProductSchema),
  productController.updateProduct
);

// DELETE: Xoá sản phẩm
router.delete(
  "/:id",
  // verifyToken,
  // checkRole("admin"),
  productController.deleteProduct
);

module.exports = router;