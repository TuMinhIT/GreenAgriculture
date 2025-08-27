import { useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";
export const cartService = () => {
  const { backendUrl, token, setCartItems } = useContext(AppContext);

  const resource = "/api/cart/";

  const addToCart = async (productId, quantity) => {
    if (token) {
      try {
        const res = await axios.post(
          backendUrl + resource,
          {
            productId: productId,
            quantity,
          },
          {
            headers: {
              token,
            },
          }
        );
        if (res.data.success) {
          // setCartItems(cartData);
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

  const getCartData = async () => {
    try {
      const res = await axios.get(backendUrl + resource, {
        headers: {
          token,
        },
      });
      if (res.data.success) {
        const cart = res.data.data;
        setCartItems(cart.products);
        return cart.products;
      } else {
        toast.error(res.data.message);
        return [];
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const deteteCartItem = async (itemId) => {
    if (token) {
      try {
        const res = await axios.delete(backendUrl + resource + itemId, {
          headers: { token },
        });

        if (res.data.success) {
          return res.data;
        } else {
          toast.error(res.data.message);
          return res.data;
        }
      } catch (error) {
        console.log(error.message);
        toast.error(error.message);
      }
    }
  };

  // const updateQuatity = async (itemId, size, quantity) => {
  //   let cartData = structuredClone(cartItems);
  //   cartData[itemId][size] = quantity;
  //   if (token) {
  //     try {
  //       const res = await axios.post(
  //         backendUrl + "/api/cart/update",
  //         {
  //           productId: itemId,
  //           size,
  //           quantity,
  //         },
  //         {
  //           headers: {
  //             token,
  //           },
  //         }
  //       );
  //       if (res.data.success) {
  //         setCartItems(cartData);
  //       } else {
  //         toast.error(res.data.message);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //       toast.error(error.message);
  //     }
  //   }
  // };

  // const getCartCount = () => {
  //   let count = 0;
  //   for (let item in cartItems) {
  //     for (let size in cartItems[item]) {
  //       try {
  //         if (cartItems[item][size] > 0) count += cartItems[item][size];
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     }
  //   }
  //   return count;
  // };

  // const getCartAmount = () => {
  //   let amount = 0;
  //   for (let item in cartItems) {
  //     for (let size in cartItems[item]) {
  //       try {
  //         if (cartItems[item][size] > 0) {
  //           const product = products.find((product) => product._id === item);
  //           amount += product.price * cartItems[item][size];
  //         }
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     }
  //   }
  //   return amount;
  // };

  return { addToCart, getCartData, deteteCartItem };
};
