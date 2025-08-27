import { createContext, useState, useEffect } from "react";
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

  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    if (cartItems && cartItems.length > 0) {
      const totalCount = cartItems.reduce(
        (count, item) => count + item.quantity,
        0
      );

      let cartAmount = 0;
      for (const item of cartItems) {
        cartAmount += item.product.price * item.quantity;
      }

      setCartCount(totalCount);
      setAmount(cartAmount);
    }
  }, [cartItems]);

  useEffect(() => {
    if (token === "") {
      localStorage.removeItem("token");
    }
    localStorage.setItem("token", token);
  }, [token]);

  const value = {
    currency,
    delivery_fee,

    cartCount,
    setCartCount,
    amount,
    cartItems,
    setCartItems,

    token,
    setToken,
    backendUrl,
    navigate,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
