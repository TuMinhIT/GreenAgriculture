import { createContext, useState } from "react";

// Tạo context
export const AppContext = createContext();

// Tạo provider
export const AppProvider = ({ children }) => {
  const [state, setState] = useState("hello");

  const value = { state, setState };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
