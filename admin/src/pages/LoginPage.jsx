import { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import Footer from "../components/Footer";
import { userService } from "../service/userService";
import { useMutation } from "@tanstack/react-query";
import Spinner from "../components/Spinner";
import { toast, ToastContainer } from "react-toastify";
import { ShopContext } from "../context/ShopContext";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { LoginUser } = userService();
  const { setToken } = useContext(ShopContext);

  const login = useMutation({
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

  const handleSubmit = (e) => {
    e.preventDefault();
    login.mutate({ email, password });
  };
  useEffect(() => {
    toast.warning("tài khoảng admin:vominhtu1212004@gmail.com, pass: 111111");
  }, []);
  return (
    <>
      <ToastContainer />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="w-full max-w-6xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              {login.isPending && <Spinner />}
              {/* Form Section */}
              <div className="flex-1 p-8 lg:p-12">
                <div className="max-w-md mx-auto">
                  <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                      Welcome Back
                    </h1>
                    <p className="text-gray-600">
                      Enter your credentials to access your account
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2  focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Password
                      </label>
                      <input
                        type="password"
                        // value={password}
                        required
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2  focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="w-4 h-4 text-green-600 border-gray-300 rounded "
                        />
                        <span className="ml-2 text-sm text-gray-600">
                          Remember me
                        </span>
                      </label>
                      <a
                        href="#"
                        className="text-sm text-green-600 hover:text-green-800 font-medium"
                      >
                        Forgot password?
                      </a>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-green-500  text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-600  focus:ring-4  transition-all duration-200 transform hover:-translate-y-0.5"
                    >
                      Sign In
                    </button>
                  </form>
                </div>
              </div>

              {/* Image Section */}
              <div className="hidden lg:flex bg-gradient-to-br bg-green-500 p-8 lg:p-12  items-center justify-center">
                <div className="text-center text-white">
                  <img
                    className="rounded-2xl w-full max-w-md mx-auto shadow-2xl mb-6"
                    src={assets.background}
                    alt="Login illustration"
                  />
                  <h2 className="text-2xl font-bold mb-4">
                    Join Our Community
                  </h2>
                  <p className="text-blue-100 text-lg">
                    Access your dashboard and manage your account with ease
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default LoginPage;
