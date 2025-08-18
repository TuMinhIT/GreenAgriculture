import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { userService } from "../services/userService";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { LoginUser } = userService();
  const { navigate, setToken } = useContext(AppContext);

  const authUser = useMutation({
    mutationFn: LoginUser,
    onSuccess: (res) => {
      if (res.success) {
        setToken(res.data);
        navigate("/");
        console.log("login success");
      } else {
        toast.error(res.message);
      }
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    authUser.mutate({ email, password });
  };

  return (
    <>
      {authUser.isPending && <Spinner />}
      <div
        className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center p-4"
        style={{ backgroundImage: `url(${assets.loginBg})` }}
      >
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Đăng nhập
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                placeholder="••••••••"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="ml-2 text-sm text-gray-600">Ghi nhớ tôi</span>
              </label>
              <a
                href="#"
                className="text-sm text-indigo-600 hover:text-indigo-500"
              >
                Quên mật khẩu?
              </a>
            </div>

            <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors">
              Đăng nhập
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            Chưa có tài khoản?{" "}
            <Link
              to={"/signup"}
              className="text-indigo-600 hover:text-indigo-500 font-medium"
            >
              Đăng ký ngay
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
