import { createContext, useState, useEffect } from "react";
import { assets, products } from "../assets/assets";

// Tạo context
export const AppContext = createContext();

// Tạo provider
export const AppProvider = ({ children }) => {
  const [state, setState] = useState("hello");

  // Thêm state quản lý user và token
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem("token") || null;
  });

  // Lưu vào localStorage khi user/token thay đổi
  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  }, [token]);

  // Hàm login/logout new
  const login = (userData, accessToken) => {
    setUser(userData);
    setToken(accessToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  const currency = "đ";
  const delivery_fee = 1000;

  const getCartCount = () => {
    return 5;
  };
  const updateQuatity = null;
  const getCartAmount = () => {
    return 2;
  };

  const value = {
    state,
    setState,
    currency,
    delivery_fee,
    getCartCount,
    updateQuatity,
    getCartAmount,
    products,

    // thêm auth new
    user,
    token,
    login,
    logout,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};