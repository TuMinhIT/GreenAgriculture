import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Tạo context
export const AppContext = createContext();

// Tạo provider
export const AppProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const currency = "đ";
  const delivery_fee = 1000;

  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(2);
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

  // const getCartData = async (token) => {
  //   try {
  //     const res = await axios.post(
  //       backendUrl + "/api/cart/get",
  //       {},
  //       {
  //         headers: {
  //           token,
  //         },
  //       }
  //     );
  //     if (res.data.success) {
  //       setCartItems(res.data.cartData);
  //     } else {
  //       toast.error(res.data.message);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     toast.error(error.message);
  //   }
  // };

  const getCartAmount = () => {
    let amount = 0;
    // for (let item in cartItems) {
    //   for (let size in cartItems[item]) {
    //     try {
    //       if (cartItems[item][size] > 0) {
    //         const product = products.find((product) => product._id === item);
    //         amount += product.price * cartItems[item][size];
    //       }
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   }
    // }
    return amount;
  };

  useEffect(() => {
    if (token === "") {
      localStorage.removeItem("token");
    }
    localStorage.setItem("token", token);
  }, [token]);

  const value = {
    currency,
    delivery_fee,

    getCartAmount,
    cartCount,
    setCartCount,

    token,
    setToken,
    backendUrl,
    navigate,
    cartItems,
    setCartItems,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
