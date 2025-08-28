import { useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";
export const orderService = () => {
  const { backendUrl, token, setCartItems } = useContext(AppContext);

  const resource = "/api/order/";

  const createOrder = async (orderData) => {
    if (token) {
      try {
        const res = await axios.post(
          backendUrl + resource,
          {
            orderData,
          },
          {
            headers: {
              token,
            },
          }
        );
        if (res.data.success) {
          return res.data;
        } else {
          toast.error(res.data.message);
          return res.data;
        }
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    } else toast.error("Unauthorized!");
  };

  const getOrderHistory = async () => {
    try {
      const res = await axios.get(backendUrl + resource + "user/", {
        headers: {
          token,
        },
      });
      if (res.data.success) {
        return res.data.data;
      } else {
        toast.error(res.data.message);
        return [];
      }
      return [];
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const cancelOrder = async ({ productId, quantity }) => {
    if (token) {
      try {
        const res = await axios.put(
          backendUrl + resource + productId,
          {
            quantity,
          },
          {
            headers: {
              token,
            },
          }
        );
        if (res.data.success) {
          //  to do sothing
          // const cartData = res.data.data;
          // setCartItems(cartData.products);
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  return { cancelOrder, createOrder, getOrderHistory };
};
