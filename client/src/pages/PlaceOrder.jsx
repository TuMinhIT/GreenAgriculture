import { useContext, useEffect, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/cartComponent/CartTotal";
import { assets } from "../assets/assets";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";
import { orderService } from "../services/orderService";
import { useMutation } from "@tanstack/react-query";
import Spinner from "../components/Spinner";
const PlaceOrder = () => {
  const { cartItems, setCartItems, amount, navigate, setCartCount } =
    useContext(AppContext);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const { createOrder } = orderService();

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    message: "",
  });

  const { mutate: create, isPending } = useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      toast.success("order successfully!");
      setCartItems([]);
      setCartCount(0);
      navigate("/orders", { replace: true });
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate form
    if (!formData.fullName) {
      toast.warning("Please fill required fields");
      return;
    }

    try {
      let orderData = {
        fullName: formData.fullName,
        phone: formData.phone,
        message: formData.message,
        address: formData.address,
        totalPrice: amount,
        cartItems: cartItems,
        paymentMethod: paymentMethod,
      };
      // // Process order based on payment method
      // place order
      if (paymentMethod === "cod") {
        create(orderData);
      }
      if (paymentMethod === "stripe") {
        toast.success("Processing with stripe");
        create(orderData);
      }
      if (paymentMethod === "razorpay") {
        toast.success("Processing with razorpay");
        create(orderData);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <>
      {isPending && (
        <div className="absolute items-center justify-center flex bg-black/50 h-full w-full">
          {isPending && <Spinner />}
          <h1 className="flex text-2xl text-white">
            ............Procesing order.............
          </h1>
        </div>
      )}

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
              placeholder="Họ và tên"
              value={formData.firstName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
            />
          </div>

          <input
            required
            className="border border-gray-300 rounded-md py-3 px-4 w-full focus:outline-none focus:border-black transition-colors"
            type="text"
            placeholder="Địa chỉ"
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
          />

          <input
            required
            className="border border-gray-300 rounded-md py-3 px-4 w-full focus:outline-none focus:border-black transition-colors"
            type="tel"
            maxLength={11}
            placeholder="Số điện thoại"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
          />

          <input
            required
            className="border border-gray-300 rounded-md py-3 px-4 w-full focus:outline-none focus:border-black transition-colors"
            type="tel"
            placeholder="Lời nhắn"
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
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
                <img
                  className="w-20 h-10 rounded-2xl overflow-hidden"
                  src={assets.stripe_logo}
                  alt=""
                />
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
                <img
                  className="w-20 h-10 rounded-2xl overflow-hidden"
                  src={assets.razorpay_logo}
                  alt=""
                />
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
    </>
  );
};

export default PlaceOrder;
