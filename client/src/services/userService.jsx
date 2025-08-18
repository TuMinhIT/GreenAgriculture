import axios from "axios";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

export const userService = () => {
  const { backendUrl, setToken } = useContext(AppContext);
  const resource = "/api/users/";
  const LoginUser = async ({ email, password }) => {
    try {
      const res = await axios.post(backendUrl + resource + "login", {
        email,
        password,
      });

      return res.data;
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };

  const SendOTP = async (data) => {
    try {
      const res = await axios.post(backendUrl + resource + "send-otp", {
        email: data,
      });
      return res.data;
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
