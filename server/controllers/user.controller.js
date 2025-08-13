// controllers/user.controller.js
const userService = require('../services/user.service');
const { sendMail } = require("../utils/emailSender");

let otpStore = {};

const register = async (req, res, next) => {
  try {
    const result = await userService.register(req.body);
    res.status(201).json(result);
  } catch (err) { next(err); }
};

const login = async (req, res, next) => {
  try {
    const result = await userService.login(req.body);
    res.json(result);
  } catch (err) { next(err); }
};

const changePassword = async (req, res, next) => {
  try {
    const result = await userService.changePassword(req.user.id, req.body.oldPassword, req.body.newPassword);
    res.json({ message: 'Đổi mật khẩu thành công', user: result });
  } catch (err) { next(err); }
};

const forgotPassword = async (req, res, next) => {
  try {
    const result = await userService.forgotPassword(req.body.email);
    res.json(result);
  } catch (err) { next(err); }
};

const resetPassword = async (req, res, next) => {
  try {
    const result = await userService.resetPassword(req.body.token, req.body.newPassword);
    res.json(result);
  } catch (err) { next(err); }
};

const updateProfile = async (req, res, next) => {
  try {
    const result = await userService.updateProfile(req.user.id, req.body);
    res.json(result);
  } catch (err) { next(err); }
};

const getMyProfile = async (req, res, next) => {
  try {
    const result = await userService.getMyProfile(req.user.id);
    res.json(result);
  } catch (err) { next(err); }
};

const deleteUser = async (req, res, next) => {
  try {
    await userService.deleteUser(req.params.id);
    res.json({ message: 'Xóa người dùng thành công' });
  } catch (err) { next(err); }
};

const updateUser = async (req, res, next) => {
  try {
    const result = await userService.updateProfile(req.params.id, req.body);
    res.json(result);
  } catch (err) { next(err); }
};

// Gửi OTP
const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    otpStore[email] = { otp, expires: Date.now() + 5 * 60 * 1000 }; // Hết hạn 5 phút

    await sendMail(email, "Mã OTP của bạn", `Mã OTP: ${otp}`);

    res.json({ message: "OTP đã được gửi qua email" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Xác minh OTP
const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const record = otpStore[email];

    if (!record) {
      return res.status(400).json({ error: "Chưa yêu cầu OTP hoặc OTP hết hạn" });
    }

    if (Date.now() > record.expires) {
      delete otpStore[email];
      return res.status(400).json({ error: "OTP đã hết hạn" });
    }

    if (record.otp !== otp) {
      return res.status(400).json({ error: "OTP không chính xác" });
    }

    delete otpStore[email];
    res.json({ message: "Xác minh OTP thành công" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (err) { next(err); }
};

const getUserById = async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) return res.status(404).json({ message: 'Người dùng không tồn tại' });
    res.json(user);
  } catch (err) { next(err); }
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
};