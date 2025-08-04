// server/validations/product.validation.js
const Joi = require('joi');

const createProductSchema = Joi.object({
  name: Joi.string().trim().required(),
  description: Joi.string().allow(''),
  categoryId: Joi.string().required(),
  images: Joi.array().items(Joi.string().uri()),
  price: Joi.number().min(0).required(),
  salePrice: Joi.number().min(0),
  quantity: Joi.number().integer().min(0).required(),
});

const updateProductSchema = Joi.object({
  name: Joi.string().trim(),
  description: Joi.string().allow(''),
  categoryId: Joi.string(),
  images: Joi.array().items(Joi.string().uri()),
  price: Joi.number().min(0),
  salePrice: Joi.number().min(0),
  quantity: Joi.number().integer().min(0),
});

module.exports = {
  createProductSchema,
  updateProductSchema,
};