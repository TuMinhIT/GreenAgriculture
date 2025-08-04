import { createContext, useState } from "react";
import { assets, products } from "../assets/assets";

// Tạo context
export const AppContext = createContext();

// Tạo provider
export const AppProvider = ({ children }) => {
  const [state, setState] = useState("hello");
  const currency = "đ";

  const delivery_fee = 1000;
  // const cartItems,
  // const navigate = useNavigate();
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
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
