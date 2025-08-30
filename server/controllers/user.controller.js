// controllers/user.controller.js
const userService = require("../services/user.service");
const { cloudinary } = require("../utils/upload");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await userService.register({ name, email, password });
    res.send({
      success: true,
      data: user.name,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    const result = await userService.sendOTP(email);
    return res.send(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const verifyOTP = async (req, res) => {
  try {
    const { otpToken, OTP } = req.body;
    const result = await userService.verifyOTP(otpToken, OTP);
    if (result) {
      console.log("register success");
      return res.send({
        success: true,
        message: result,
      });
    }
  } catch (err) {
    return res.send({
      success: false,
      message: err.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const result = await userService.login(req.body);
    res.json(result);
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};

const loginAdmin = async (req, res, next) => {
  try {
    const result = await userService.loginAdmin(req.body);
    res.json(result);
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};

const changePassword = async (req, res, next) => {
  try {
    const result = await userService.changePassword(
      req.user,
      req.body.currentPassword,
      req.body.newPassword
    );
    res.send(result);
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};

const forgotPassword = async (req, res, next) => {
  try {
    const result = await userService.forgotPassword(req.body.email);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const result = await userService.resetPassword(
      req.body.token,
      req.body.newPassword
    );
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const userId = req.user;
    const { user } = req.body;
    const updated = await userService.updateProfile(userId, user);
    if (!updated)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    return res.json({ success: true, user: updated });
  } catch (err) {
    next(err);
  }
};

const getMyProfile = async (req, res, next) => {
  try {
    const userId = req.user;
    const result = await userService.getMyProfile(userId);
    res.json({
      success: true,
      data: result,
    });
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    await userService.deleteUser(req.params.id);
    res.json({ message: "Xóa người dùng thành công" });
  } catch (err) {
    next(err);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const result = await userService.updateProfile(req.params.id, req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (err) {
    next(err);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user)
      return res.status(404).json({ message: "Người dùng không tồn tại" });
    res.json(user);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  register,
  login,
  changePassword,
  forgotPassword,
  resetPassword,
  updateProfile,
  getMyProfile,
  sendOTP,
  verifyOTP,
  deleteUser,
  updateUser,
  getUserById,
  getAllUsers,
  loginAdmin,
};
