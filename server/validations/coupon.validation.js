// server/validations/coupon.validation.js
const Joi = require('joi');

const createCouponSchema = Joi.object({
  code: Joi.string().uppercase().required(),
  description: Joi.string().allow('').optional(),
  discountType: Joi.string().valid('percent', 'fixed').required(),
  discountValue: Joi.number().positive().required(),
  validFrom: Joi.date().iso().required(),
  validTo: Joi.date().iso().greater(Joi.ref('validFrom')).required(),
  usageLimit: Joi.number().integer().min(0).default(0),
  isActive: Joi.boolean().default(true)
});

const updateCouponSchema = Joi.object({
  code: Joi.string().uppercase(),
  description: Joi.string().allow(''),
  discountType: Joi.string().valid('percent', 'fixed'),
  discountValue: Joi.number().positive(),
  validFrom: Joi.date().iso(),
  validTo: Joi.date().iso().custom((value, helpers) => {
    const { validFrom } = helpers?.state?.ancestors?.[0];
    if (validFrom && new Date(value) <= new Date(validFrom)) {
      return helpers.message('"validTo" must be greater than "validFrom"');
    }
    return value;
  }),
  usageLimit: Joi.number().integer().min(0),
  isActive: Joi.boolean()
}).min(1);

module.exports = {
  createCouponSchema,
  updateCouponSchema
};