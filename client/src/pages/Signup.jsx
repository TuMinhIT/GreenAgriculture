import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
import { useState } from "react";

const Signup = () => {
  const [step, setStep] = useState(1); // 1: nhập email, 2: nhập OTP, 3: nhập form đăng ký
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

  const handleSendOTP = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/auth/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      alert("OTP đã gửi đến email!");
      setStep(2);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      alert("OTP hợp lệ, tiếp tục đăng ký!");
      setStep(3);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Mật khẩu xác nhận không khớp!");
      return;
    }
    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      alert("Đăng ký thành công!");
      console.log("User:", data);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center p-4"
      style={{ backgroundImage: `url(${assets.loginBg})` }}
    >
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Đăng ký
        </h2>

        {step === 1 && (
          <form onSubmit={handleSendOTP} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Địa chỉ Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="your@email.com"
                required
              />
            </div>
            <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg">
              Gửi OTP
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleVerifyOTP} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nhập mã OTP
              </label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="Nhập OTP"
                required
              />
            </div>
            <button className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 rounded-lg">
              Xác nhận OTP
            </button>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Họ và tên
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="your name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mật khẩu
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="••••••••"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Xác nhận mật khẩu
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="••••••••"
                required
              />
            </div>
            <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg">
              Đăng ký
            </button>
          </form>
        )}

        <div className="mt-6 text-center text-sm text-gray-600">
          Đã có tài khoản?{" "}
          <Link
            to={"/login"}
            className="text-indigo-600 hover:text-indigo-500 font-medium"
          >
            Đăng nhập
          </Link>
        </div>
        <div className="flex flex-col mt-10 gap-4">
          <div className="flex justify-center flex-row gap-2 items-center">
            <hr className="w-20" />
            <span className="text-gray-700 font-bold">hoặc</span>
            <hr className="w-20" />
          </div>

          <div className=" justify-center flex flex-row items-center cursor-pointer hover:bg-gray-100   w-full px-4 py-2 border border-gray-500 rounded-lg ">
            <img className="w-5 h-5 mr-5" src={assets.google} alt="" />
            Đăng nhập với google
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup; 