import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import HomePage from "./pages/HomePage";

import Contact from "./pages/Contact";
import About from "./pages/About";

import ProductsPage from "./pages/ProductsPage";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import { useContext } from "react";
import { AppContext } from "./context/AppContext";
const Routers = () => {
  const { token } = useContext(AppContext);
  return (
    <>
      <Routes>
        {/* Chỉ hiện login/signup khi chưa có token */}
        {!token && (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </>
        )}

        {/* Luôn có */}
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/products" element={<ProductsPage />} />

        {/* Chỉ hiện khi có token */}
        {token && (
          <>
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile" element={<Profile />} />
          </>
        )}
      </Routes>
    </>
  );
};

export default Routers;
