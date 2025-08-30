// services/user.service.js
const User = require("../models/users.model");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/emailSender");

const generateToken = (user) => {
  return jwt.sign(
    { email: user.email, role: user.role },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

//service for customer

const register = async ({ name, email, password }) => {
  let user = await User.findOne({ email });
  if (user) {
    throw new Error("Email đã được sử dụng");
  }
  const newUser = new User({ name, email, password });
  newUser.save();
  return newUser;
};

const login = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) {
    return {
      success: false,
      message: "Email chưa đăng kí!",
    };
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch)
    return {
      success: false,
      message: "Mật khẩu không đúng!",
    };

  const token = generateToken(user);
  return {
    success: true,
    data: token,
  };
};

const changePassword = async (userId, oldPassword, newPassword) => {
  const user = await User.findById(userId).select("+password");
  if (!user) throw new Error("Người dùng không tồn tại");
  const isMatch = await user.comparePassword(oldPassword);
  if (!isMatch) {
    return {
      success: false,
      message: "Mật khẩu cũ không đúng",
    };
  }

  user.password = newPassword;
  await user.save();
  return {
    success: true,
    data: user,
  };
};

const forgotPassword = async (email) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Email không tồn tại");

  const resetToken = generateResetToken(user);
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
  const message = `Bạn đã yêu cầu đặt lại mật khẩu. Vui lòng truy cập link sau (trong 15 phút): \n${resetUrl}`;

  await sendEmail({
    email: user.email,
    subject: "Yêu cầu đặt lại mật khẩu",
    message,
  });

  return { message: "Email reset password đã được gửi" };
};

const resetPassword = async (token, newPassword) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("+password");
    if (!user) throw new Error("Người dùng không tồn tại");
    user.password = newPassword;
    await user.save();
    return { message: "Đổi mật khẩu thành công" };
  } catch (err) {
    throw new Error("Token không hợp lệ hoặc đã hết hạn");
  }
};

const updateProfile = async (userId, data) => {
  const updates = {
    name: data.name,
    address: data.address,
    phone: data.phone,
  };

  const updateUser = await User.findByIdAndUpdate(
    userId,
    { $set: updates },
    { new: true }
  );

  return updateUser;
};

const getMyProfile = async (userId) => {
  return await User.findById(userId, "-password");
};

const sendOTP = async (email) => {
  try {
    let user = await User.findOne({ email });
    if (user) {
      return {
        success: false,
        message: "Email đã tồn tại!",
      };
    } else {
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      // tạo JWT chứa otp và email, hết hạn sau 2 phút
      const otpToken = jwt.sign({ email, otp }, process.env.JWT_SECRET, {
        expiresIn: "3m",
      });

      // suwar 2p
      await sendEmail({
        to: email,
        subject: "Mã OTP xác minh",
        text: `Mã OTP của bạn là: ${otp} (hết hạn trong 3 phút)`,
      });
      return {
        success: true,
        data: otpToken,
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

const verifyOTP = async (otpToken, OTP) => {
  try {
    const decoded = jwt.verify(otpToken, process.env.JWT_SECRET);

    if (decoded.otp !== OTP) {
      throw new Error("OTP không chính xác");
    }
    return { message: "Xác minh OTP thành công" };
  } catch (err) {
    throw new Error("OTP không hợp lệ hoặc đã hết hạn");
  }
};

//service for admin manager

const loginAdmin = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) {
    return {
      success: false,
      message: "Bạn không được phép truy cập!!",
    };
  }

  if (user.role !== "admin") {
    return {
      success: false,
      message: "Bạn không được phép truy cập!!",
    };
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch)
    return {
      success: false,
      message: "Mật khẩu không đúng!",
    };

  const token = generateToken(user);
  return {
    success: true,
    data: token,
  };
};

const deleteUser = async (userId) => {
  const user = await User.findByIdAndDelete(userId);
  if (!user)
    return {
      success: false,
      message: "Người dùng không tồn tại",
    };

  return {
    success: true,
    message: "Xóa người dùng thành công",
  };
};

const getAllUsers = async () => {
  const users = await User.find();

  const result = users.filter((user) => user.role !== "admin");

  return result;
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

  loginAdmin,
  getAllUsers,
};
