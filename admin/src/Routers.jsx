import { Routes, Route } from "react-router-dom";
import OverView from "./pages/OverView";
import Orders from "./pages/Orders";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import Products from "./pages/Products";
import Customers from "./pages/Customers";
import Inbox from "./pages/Inbox";
const Routers = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<OverView />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/products" element={<Products />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/inbox" element={<Inbox />} />
      </Routes>
    </>
  );
};

export default Routers;
