import axios from "axios";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

export const userService = () => {
  const API_URL = "hbfw";
  const { backendUrl } = useContext(AppContext);
  const resource = "/api/users/";
  const LoginUser = async (data) => {
    try {
      const res = await fetch(`${API_URL}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");

      // fallback token keys: accessToken | token | access_token
      const tokenFromApi =
        data.accessToken ?? data.token ?? data.access_token ?? null;

      // Dùng context để login
      login(data.user, tokenFromApi);

      console.log("Login -> user:", data.user, "token:", tokenFromApi);
      alert("Đăng nhập thành công!");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const SendOTP = async (data) => {
    try {
      const res = await axios.post(backendUrl + resource + "send-otp", {
        email: data,
      });
      if (res.data.success) {
        return res.data;
      } else {
        throw new Error(res.data.message || "Gửi OTP thất bại");
      }
    } catch (err) {
      console.error(err.message);
      throw new Error(err.response?.data?.message || err.message);
    }
  };

  const VerifyOTP = async ({ tokenOTP, confirmOTP }) => {
    try {
      const res = await axios.post(backendUrl + resource + "verify-otp", {
        otpToken: tokenOTP,
        OTP: confirmOTP,
      });
      return res.data;
    } catch (err) {
      toast.error(err.message);
      throw new Error(err.message);
    }
  };

  const Register = async ({ name, email, password }) => {
    try {
      const res = await axios.post(backendUrl + resource + "register", {
        name,
        email,
        password,
      });
      return res.data;

      return;
    } catch (err) {
      alert(err.message);
    }
  };
  const UpdateUser = (patch) => {
    setUser((prev) => {
      const next =
        typeof patch === "function"
          ? patch(prev || {})
          : { ...(prev || {}), ...patch };
      try {
        localStorage.setItem("user", JSON.stringify(next));
      } catch (err) {
        // ignore storage errors
      }
      return next;
    });
  };
  const DeleteUser = async (data) => {};
  return { LoginUser, Register, UpdateUser, DeleteUser, SendOTP, VerifyOTP };
};
