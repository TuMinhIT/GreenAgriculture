import { useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";
export const categoriesService = () => {
  const { backendUrl } = useContext(AppContext);

  const getAllCategories = async () => {
    try {
      const res = await axios.get(backendUrl + "/api/categories");
      if (!res.data.success) {
        toast.error(res.data.message);
        return null;
      }
      return res.data.data;
    } catch (err) {
      toast.error("Failed to fetch categories: " + (err.message || ""));
      console.error(err);
      return null;
    }
  };

  return { getAllCategories };
};
