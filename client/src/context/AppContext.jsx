import { createContext, useState, useEffect } from "react";
import { products } from "../assets/assets";
import { useNavigate } from "react-router-dom";

// Tạo context
export const AppContext = createContext();

// Tạo provider
export const AppProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const currency = "đ";
  const delivery_fee = 1000;
  const getCartCount = () => {
    return 5;
  };
  const updateQuatity = null;
  const getCartAmount = () => {
    return 2;
  };

  useEffect(() => {
    if (token === "") {
      localStorage.removeItem("token");
    }
    localStorage.setItem("token", token);
  }, [token]);

  const value = {
    currency,
    delivery_fee,
    getCartCount,
    updateQuatity,
    getCartAmount,
    products,
    token,
    setToken,
    backendUrl,
    navigate,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
