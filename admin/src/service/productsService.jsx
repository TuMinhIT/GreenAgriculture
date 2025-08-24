import { useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ShopContext } from "../context/ShopContext";

export const ProductsService = () => {
  const { backendUrl, token } = useContext(ShopContext);
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

  const createProduct = async ({ data }) => {
    try {
      const res = await axios.post(backendUrl + resource, data, {
        headers: {
          token,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res.data);
      return res.data;
    } catch (err) {
      toast.error("Failed to create product: " + (err.message || ""));
      console.error(err);
    }
  };

  const updateProduct = async (id, data) => {
    try {
      const res = await axios.post(backendUrl + "/api/products", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.data.success) {
        return res.data.data;
      }
    } catch (err) {
      toast.error("Failed to update product: " + (err.message || ""));
      console.error(err);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const res = await axios.delete(backendUrl + "/api/products/" + id);
      return res.data;
    } catch (err) {
      toast.error("Failed to delete product: " + (err.message || ""));
      console.error(err);
    }
  };

  return { getAllProducts, createProduct, updateProduct, deleteProduct };
};
