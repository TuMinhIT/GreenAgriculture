import { assets } from "../assets/assets";
import { useState } from "react";
import { data, Link } from "react-router-dom";
import ConfirmOTP from "../components/ConfirmOTP";
import { toast } from "react-toastify";
import { userService } from "../services/userService";
import Spinner from "../components/Spinner";
import { useMutation } from "@tanstack/react-query";
const Signup = () => {
  const [showOTP, setShowOTP] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { SendOTP, VerifyOTP, Register } = userService();

  const sendEmail = useMutation({
    mutationFn: SendOTP,
    onSuccess: (res) => {
      toast.success("Đã gửi mã OTP qua email của bạn, vui lòng nhập code!");
      setShowOTP(true);
      console.log(res.data);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to send email");
    },
  });

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Mật khẩu xác nhận không khớp!");
      return;
    }
    sendEmail.mutate(email);
  };

  return (
    <>
      {sendEmail.isPending && <Spinner />}

      {showOTP && <ConfirmOTP setShowOTP={setShowOTP} />}
      <div
        className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center p-4"
        style={{ backgroundImage: `url(${assets.loginBg})` }}
      >
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Đăng ký
          </h2>

          <form onSubmit={handleSignUp} className="space-y-4">
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
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg"
            >
              Đăng ký
            </button>
          </form>

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
    </>
  );
};

export default Signup;
