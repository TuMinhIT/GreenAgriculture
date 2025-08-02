// server/middleware/notFound.js
const notFound = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} không tồn tại`,
    timestamp: new Date().toISOString()
  });
};

module.exports = notFound;