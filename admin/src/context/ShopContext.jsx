import { createContext, useEffect, useState } from "react";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    if (token === "") {
      localStorage.removeItem("token");
    }
    localStorage.setItem("token", token);
  }, [token]);

  const logOut = () => {
    setToken("");
    localStorage.removeItem("token");
  };
  const value = {
    token,
    setToken,
    backendUrl,
    logOut,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
