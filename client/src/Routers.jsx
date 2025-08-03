import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import HomePage from "./pages/HomePage";

import Contact from "./pages/Contact";
import About from "./pages/About";
import Products from "./pages/Products";
const Routers = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/products" element={<Products />} />
        {/* <Route path="/cart" element={<Cart />} /> */}
        <Route path="/*" element={<Signup />} />
      </Routes>
    </>
  );
};

export default Routers;
