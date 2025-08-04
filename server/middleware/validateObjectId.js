// server/middleware/validateObjectId.js
// Import Joi for validation: npm install joi
exports.validateBody = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        message: "Validation failed.",
        details: error.details.map((err) => err.message),
      });
    }
    next();
  };
};