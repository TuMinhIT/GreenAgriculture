// services/user.service.js
const User = require('../models/users.model');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/emailSender');

const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

// tạo token reset password (ngắn hạn)
const generateResetToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });
};

const register = async ({ name, email, password }) => {
  let user = await User.findOne({ email });

  if (user && user.isVerified) {
    throw new Error("Email đã được sử dụng");
  }

  if (user && !user.isVerified) {
    user.name = name;
    user.password = password;
    user.isVerified = true;
    await user.save();
    return user;
  }

  throw new Error("Bạn cần xác minh OTP trước");
};

const login = async ({ email, password }) => {
  const user = await User.findOne({ email }).select('+password');
  if (!user) throw new Error('Email hoặc mật khẩu không đúng');
  const isMatch = await user.comparePassword(password);
  if (!isMatch) throw new Error('Email hoặc mật khẩu không đúng');
  const token = generateToken(user);
  return { user, token };
};

const changePassword = async (userId, oldPassword, newPassword) => {
  const user = await User.findById(userId).select('+password');
  if (!user) throw new Error('Người dùng không tồn tại');
  const isMatch = await user.comparePassword(oldPassword);
  if (!isMatch) throw new Error('Mật khẩu cũ không đúng');
  user.password = newPassword;
  await user.save();
  return user;
};

const forgotPassword = async (email) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error('Email không tồn tại');

  const resetToken = generateResetToken(user);
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
  const message = `Bạn đã yêu cầu đặt lại mật khẩu. Vui lòng truy cập link sau (trong 15 phút): \n${resetUrl}`;

  await sendEmail({
    email: user.email,
    subject: 'Yêu cầu đặt lại mật khẩu',
    message,
  });

  return { message: 'Email reset password đã được gửi' };
};

const resetPassword = async (token, newPassword) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('+password');
    if (!user) throw new Error('Người dùng không tồn tại');
    user.password = newPassword;
    await user.save();
    return { message: 'Đổi mật khẩu thành công' };
  } catch (err) {
    throw new Error('Token không hợp lệ hoặc đã hết hạn');
  }
};

const updateProfile = async (userId, data) => {
  const user = await User.findByIdAndUpdate(userId, data, { new: true });
  return user;
};

const getMyProfile = async (userId) => {
  return await User.findById(userId);
};

const deleteUser = async (userId) => {
  const user = await User.findByIdAndDelete(userId);
  if (!user) throw new Error('Người dùng không tồn tại');
    return { message: 'Xóa người dùng thành công' };
}

const updateUser = async (userId, data) => {
  const user = await User.findByIdAndUpdate(userId, data, { new: true });
  if (!user) throw new Error('Người dùng không tồn tại');
    return user;
}

const sendOTP = async (email, purpose = "register") => {
  let user = await User.findOne({ email });

  if (purpose === "register") {
    if (user) throw new Error("Email đã tồn tại, vui lòng đăng nhập");
    // Tạo temp user chờ xác minh OTP
    user = await User.create({ email, name: "Temp User", password: "temp1234" });
  } else {
    if (!user) throw new Error("Email chưa đăng ký");
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  user.otpCode = otp;
  user.otpExpires = Date.now() + 5 * 60 * 1000;
  await user.save();

  console.log(`✅ OTP for ${user.email}: ${otp}`);

  await sendEmail({
    to: user.email,
    subject: "Mã OTP xác minh",
    text: `Mã OTP của bạn là: ${otp} (hết hạn trong 5 phút)`
  });

  return { message: "OTP đã được gửi đến email" };
};

const verifyOTP = async (email, otp) => {
  const user = await User.findOne({ email }).select("+otpCode +otpExpires");
  if (!user) throw new Error("Email không tồn tại");

  if (user.otpCode !== otp) throw new Error("OTP không chính xác");
  if (Date.now() > user.otpExpires) throw new Error("OTP đã hết hạn");

  // Xác minh thành công => xoá OTP
  user.otpCode = undefined;
  user.otpExpires = undefined;
  await user.save();

  return { message: "Xác minh OTP thành công" };
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
};