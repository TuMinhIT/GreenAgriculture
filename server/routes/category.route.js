// server/routes/category.route.js
const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller');
// const { verifyToken, checkRole } = require('../middleware/auth');
const { validateBody } = require('../middleware/validateObjectId');
const {
  createCategorySchema,
  updateCategorySchema,
} = require('../validations/category.validation');

// Public routes
router.get('/', categoryController.getCategories);
router.get('/:id', categoryController.getCategory);

// Protected routes (admin only)
router.post(
    '/',
    // verifyToken,
    // checkRole("admin"),
    validateBody(createCategorySchema), 
    categoryController.createCategory
);

router.put('/:id',
    // verifyToken,
    // checkRole("admin"),
    validateBody(updateCategorySchema), 
    categoryController.updateCategory
);

router.delete('/:id',
    // verifyToken,
    // checkRole("admin"),
    categoryController.deleteCategory
);

module.exports = router;