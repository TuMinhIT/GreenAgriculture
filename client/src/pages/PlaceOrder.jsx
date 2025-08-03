import React, { useContext, useEffect, useState } from "react";
import Title from "../component/Title";
import CartTotal from "../component/CartTotal";
import { assets, products } from "../assets/frontend_assets/assets";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import axios from "axios";
const PlaceOrder = () => {
  const {
    delivery_fee,
    backendUrl,
    cartItems,
    products,
    getCartAmount,
    navigate,
    token,
    setCartItems,
  } = useContext(ShopContext);
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    zipcode: "",
    phone: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate form
    if (!formData.firstName || !formData.email) {
      alert("Please fill required fields");
      return;
    }
    try {
      let orderItems = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          const itemInfo = structuredClone(
            products.find((product) => product._id === items)
          );
          if (itemInfo) {
            itemInfo.size = item;
            itemInfo.quantity = cartItems[items][item];
            orderItems.push(itemInfo);
          }
        }
      }
      let orderData = {
        address:
          formData.street + ", " + formData.city + ", " + formData.zipcode,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };
      // // Process order based on payment method
      // place order
      if (paymentMethod === "cod") {
        try {
          const res = await axios.post(
            backendUrl + "/api/orders/place",
            orderData,
            {
              headers: {
                token,
              },
            }
          );
          if (res.data.success) {
            setCartItems({});
            navigate("/orders");
          } else {
            toast.error(res.data.message);
          }
        } catch (error) {
          console.log(error);
          toast.error(error.message);
        }
      }
      //stripe order
      switch (paymentMethod) {
        case "stripe":
          const res = await axios.post(
            backendUrl + "/api/orders/stripe",
            orderData,
            {
              headers: {
                token,
              },
            }
          );
          if (res.data.success) {
            setCartItems({});
            navigate("/orders");
          } else {
            toast.error(res.data.message);
          }

          break;
        case "razorpay":
          break;

        default:
          // console.log("No payment method selected");
          break;
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row justify-between gap-8 pt-5 sm:pt-14 min-h-[80vh] max-w-6xl mx-auto"
    >
      {/* Left side - Delivery Information */}
      <div className="flex flex-col gap-6 w-full sm:max-w-[500px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>

        <div className="flex gap-3">
          <input
            required
            className="border border-gray-300 rounded-md py-3 px-4 w-full focus:outline-none focus:border-black transition-colors"
            type="text"
            placeholder="First Name"
            value={formData.firstName}
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
          />
          <input
            required
            className="border border-gray-300 rounded-md py-3 px-4 w-full focus:outline-none focus:border-black transition-colors"
            type="text"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
          />
        </div>

        <input
          required
          className="border border-gray-300 rounded-md py-3 px-4 w-full focus:outline-none focus:border-black transition-colors"
          type="email"
          placeholder="Email address"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />

        <input
          required
          className="border border-gray-300 rounded-md py-3 px-4 w-full focus:outline-none focus:border-black transition-colors"
          type="text"
          placeholder="Street Address"
          value={formData.street}
          onChange={(e) => setFormData({ ...formData, street: e.target.value })}
        />

        <div className="flex gap-3">
          <input
            required
            className="border border-gray-300 rounded-md py-3 px-4 w-full focus:outline-none focus:border-black transition-colors"
            type="text"
            placeholder="City"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
          />
          <input
            required
            className="border border-gray-300 rounded-md py-3 px-4 w-full focus:outline-none focus:border-black transition-colors"
            type="text"
            placeholder="Zipcode"
            value={formData.zipcode}
            onChange={(e) =>
              setFormData({ ...formData, zipcode: e.target.value })
            }
          />
        </div>

        <input
          required
          className="border border-gray-300 rounded-md py-3 px-4 w-full focus:outline-none focus:border-black transition-colors"
          type="tel"
          placeholder="Phone number"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />
      </div>

      {/* Right side - Cart Total & Payment */}
      <div className="w-full sm:max-w-[400px]">
        <div className="mb-8">
          <CartTotal />
        </div>

        <div className="mb-6">
          <div className="text-xl sm:text-2xl mb-4">
            <Title text1={"PAYMENT"} text2={"METHOD"} />
          </div>

          {/* Payment Methods */}
          <div className="flex flex-col gap-3">
            <label className="flex items-center cursor-pointer ">
              <input
                checked={paymentMethod === "stripe"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                type="radio"
                name="payment"
                value="stripe"
                className="mr-3"
              />
              <img className="w-20" src={assets.stripe_logo} alt="" />
            </label>

            <label className="flex items-center cursor-pointer">
              <input
                checked={paymentMethod === "razorpay"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                type="radio"
                name="payment"
                value="razorpay"
                className="mr-3"
              />
              <img className="w-20" src={assets.razorpay_logo} alt="" />
            </label>

            <label className="flex items-center cursor-pointer">
              <input
                checked={paymentMethod === "cod"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                type="radio"
                name="payment"
                value="cod"
                className="mr-3"
              />
              <span>Cash on Delivery</span>
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-black text-center text-white py-3 px-6 rounded-md hover:bg-gray-800 transition-colors font-medium"
        >
          PLACE ORDER
        </button>
      </div>
    </form>
  );
};

export default PlaceOrder;
