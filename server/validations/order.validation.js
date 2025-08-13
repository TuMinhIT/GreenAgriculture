// validations/order.validation.js
const Joi = require('joi');

const orderItemSchema = Joi.object({
  productId: Joi.string().hex().length(24).required(),
  name: Joi.string().required(),
  price: Joi.number().min(0).required(),
  quantity: Joi.number().integer().min(1).required(),
});

const createOrderSchema = Joi.object({
  userId: Joi.string().hex().length(24).required(),
  items: Joi.array().items(orderItemSchema).min(1).required(),
  totalPrice: Joi.number().min(0).required(),
  status: Joi.string().valid('Pending', 'Paid', 'Shipped', 'Delivered', 'Cancelled'),
  paymentMethod: Joi.string().valid('Cash', 'Stripe', 'PayPal'),
  shippingAddress: Joi.string().required(),
  promotionCode: Joi.string().allow('', null),
});

const updateOrderStatusSchema = Joi.object({
  status: Joi.string()
    .valid('Pending', 'Paid', 'Shipped', 'Delivered', 'Cancelled')
    .required(),
});

const objectId = () => Joi.string().hex().length(24);

const paramsIdSchema = Joi.object({
  id: objectId().required(),
});

const paramsUserIdSchema = Joi.object({
  userId: objectId().required(),
});

const paginationQuerySchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
});

module.exports = {
  createOrderSchema,
  updateOrderStatusSchema,
  paramsIdSchema,
  paramsUserIdSchema,
  paginationQuerySchema,
};