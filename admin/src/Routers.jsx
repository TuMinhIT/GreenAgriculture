import { Routes, Route } from "react-router-dom";
import OverView from "./pages/OverView";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";
import Products from "./pages/Products";
import Customers from "./pages/Customers";
import Inbox from "./pages/Inbox";
import CategoryBrandManager from "./pages/CategoriesAndBrand";

const Routers = () => {
  return (
    <>
      <Routes>
        <Route path="/*" element={<OverView />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/products" element={<Products />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/inbox" element={<Inbox />} />
        <Route path="/categories" element={<CategoryBrandManager />} />
      </Routes>
    </>
  );
};

export default Routers;
