// server/validations/cart.validation.js
const Joi = require('joi');

const productItemSchema = Joi.object({
  productId: Joi.string().hex().length(24).required(),
  name: Joi.string().required(),
  price: Joi.number().min(0).required(),
  quantity: Joi.number().integer().min(1).required()
});

const updateCartSchema = Joi.object({
  products: Joi.array().items(productItemSchema).required()
});

const addToCartSchema = productItemSchema;

module.exports = {
  updateCartSchema,
  addToCartSchema
};