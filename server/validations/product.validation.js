// server/validations/product.validation.js
const Joi = require("joi");

const createProductSchema = Joi.object({
  name: Joi.string().trim().required(),
  description: Joi.string().allow(""),
  category: Joi.string().required(),
  brand: Joi.string().required(),
  images: Joi.array().items(Joi.string().uri()),
  price: Joi.number().min(0),
  cost: Joi.number().min(0),
  stock: Joi.number().integer().min(0).required(),
});

const updateProductSchema = Joi.object({
  name: Joi.string().trim().required(),
  description: Joi.string().allow(""),
  category: Joi.string().required(),
  brand: Joi.string().required(),
  images: Joi.array().items(Joi.string().uri()),
  price: Joi.number().min(0).required(),
  cost: Joi.number().min(0),
  stock: Joi.number().integer().min(0).required(),
});

module.exports = {
  createProductSchema,
  updateProductSchema,
};
