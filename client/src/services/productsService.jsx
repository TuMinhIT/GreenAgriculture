import { useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";
export const ProductsService = () => {
  const { backendUrl, token } = useContext(AppContext);

  const resource = "/api/products/";

  const getAllProducts = async () => {
    try {
      const res = await axios.get(backendUrl + resource);
      return res.data;
    } catch (err) {
      toast.error("Failed to fetch products: " + (err.message || ""));
      console.error(err);
      return [];
    }
  };

  return { getAllProducts };
};
