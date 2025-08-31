import { useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ShopContext } from "../context/ShopContext";
export const orderService = () => {
  const { backendUrl, token } = useContext(ShopContext);
  const resource = "/api/order/";
  const getAllOrder = async () => {
    try {
      const res = await axios.get(backendUrl + resource, {
        headers: {
          token,
        },
      });
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

  const deleteOrder = async ({ id }) => {
    try {
      const res = await axios.delete(
        backendUrl + resource + id,
        {},
        {
          headers: {
            token,
          },
        }
      );

      return res.data;
    } catch (err) {
      toast.error("Failed to delete category: " + (err.message || ""));
      console.error(err);
    }
  };

  const UpdateOrderStatus = async ({ id, status }) => {
    try {
      const res = await axios.patch(
        backendUrl + resource + id + "/status",
        {
          status,
        },
        {
          headers: {
            token,
          },
        }
      );
      return res.data;
    } catch (err) {
      toast.error("Failed to delete category: " + (err.message || ""));
      console.error(err);
    }
  };

  return {
    getAllOrder,
    UpdateOrderStatus,
    deleteOrder,
  };
};
