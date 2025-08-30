import axios from "axios";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

export const userService = () => {
  const { backendUrl, setToken, token } = useContext(AppContext);
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

  const GetUserInfo = async () => {
    try {
      const res = await axios.get(
        backendUrl + resource + "profile",

        {
          headers: {
            token,
          },
        }
      );
      if (res.data.success) {
        return res.data.data;
      } else {
        toast.error(res.data.message);
      }
      return [];
    } catch (err) {
      toast.error(err.message);
      return [];
    }
  };

  const UpdateUser = async ({ userInfo }) => {
    try {
      const res = await axios.put(
        backendUrl + resource + "profile",
        {
          user: userInfo,
        },
        {
          headers: {
            token,
          },
        }
      );
      if (res.data.success) {
        return res.data.data;
      } else {
        console.log(res.data);
        toast.error(res.data.message);
      }
      return [];
    } catch (err) {
      toast.error(err.message);
      return [];
    }
  };

  const ChangePassword = async ({ currentPassword, newPassword }) => {
    try {
      const res = await axios.post(
        backendUrl + resource + "profile/change-password",
        {
          currentPassword,
          newPassword,
        },
        {
          headers: {
            token,
          },
        }
      );
      if (res.data.success) {
        return res.data;
      } else {
        console.log(res.data);
        toast.error(res.data.message);
      }
      return [];
    } catch (err) {
      toast.error(err.message);
      return [];
    }
  };
  return {
    LoginUser,
    Register,
    UpdateUser,
    SendOTP,
    VerifyOTP,
    GetUserInfo,
    ChangePassword,
  };
};
