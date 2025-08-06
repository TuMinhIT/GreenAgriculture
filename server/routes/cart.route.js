// server/routes/cart.route.js
const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart.controller');
const { validateBody } = require('../middleware/validateObjectId');
const { 
    updateCartSchema, 
    addToCartSchema,
} = require('../validations/cart.validation');

router.get('/:userId',
    // verifyToken,
    cartController.getCart
);
router.put('/:userId',
    // verifyToken,
    validateBody(updateCartSchema), 
    cartController.updateCart
);
router.delete('/:userId',
    // verifyToken,
    cartController.clearCart
);
router.post("/cart/add", 
    validateBody(addToCartSchema), 
    //verifyToken, 
    cartController.addToCart);
router.delete("/cart/remove/:productId", 
    //verifyToken, 
    cartController.removeFromCart);

module.exports = router;