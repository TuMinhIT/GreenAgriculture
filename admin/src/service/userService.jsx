import axios from "axios";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";

export const userService = () => {
  const { backendUrl, setToken, token } = useContext(ShopContext);
  const resource = "/api/users/";

  const LoginUser = async ({ email, password }) => {
    try {
      const res = await axios.post(backendUrl + resource + "loginAdmin", {
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

  const GetAllUser = async () => {
    try {
      const res = await axios.get(backendUrl + resource, {
        headers: {
          token: token,
        },
      });
      if (res.data.success) {
        return res.data.data;
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };
  const DeleteUser = async ({ userId }) => {
    try {
      const res = await axios.delete(backendUrl + resource + userId, {
        headers: {
          token,
        },
      });
      return res.data;
    } catch (err) {
      console.error(err.message);
      throw new Error(err.response?.data?.message || err.message);
    }
  };
  return { LoginUser, Register, DeleteUser, SendOTP, VerifyOTP, GetAllUser };
};
