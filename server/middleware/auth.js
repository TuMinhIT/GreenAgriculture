// server/middleware/auth.js
const jwt = require("jsonwebtoken");
const User = require("../models/users.model");
exports.verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Format: "Bearer TOKEN"
  if (!token) return res.status(401).json({ message: "No token provided." });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // gồm _id, email, role, ...
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token." });
  }
};

exports.checkRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Permission denied." });
    }
    next();
  };
};

exports.authAdmin = async (req, res, next) => {
  const token = req.headers.token; // Format: "token: token...."
  if (!token)
    return res.send({
      success: false,
      message: "Unauthorized!",
    });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role === "admin")
      //  email, role, ...
      next();
  } catch (error) {
    return res.send({
      success: false,
      message: "Invalid or expired token.",
    });
  }
};

exports.authUser = async (req, res, next) => {
  const token = req.headers.token; // Format: "token: token...."

  if (!token) {
    console.log("Unauthorized");
    return res.send({
      success: false,
      message: "Unauthorized!",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.email) {
      const user = await User.findOne({ email: decoded.email });
      if (user) {
        req.user = user._id;
        next();
      } else
        return res.send({
          success: false,
          message: "Unauthorized!",
        });
    }
  } catch (error) {
    console.log("auth" + error.message);
    return res.send({
      success: false,
      message: "Invalid or expired token.",
    });
  }
};
