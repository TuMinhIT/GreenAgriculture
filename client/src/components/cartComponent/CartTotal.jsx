import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { useLocation } from "react-router-dom";
const CartTotal = () => {
  const location = useLocation();
  const { getCartAmount, currency, delivery_fee, navigate } =
    useContext(ShopContext);
  return (
    <div className="mt-6 h-full  rounded-lg border bg-white p-6 shadow-md md:mt-0 max-w-1/3 w-full min-w-[300px] right-0">
      <div className="mb-2 flex justify-between">
        <p className="text-gray-700">Subtotal</p>
        <p className="text-gray-700">
          {currency}
          {getCartAmount()}.00
        </p>
      </div>
      <div className="flex justify-between">
        <p className="text-gray-700">Shipping</p>
        <p className="text-gray-700">
          {currency}
          {delivery_fee}.00
        </p>
      </div>
      <hr className="my-4" />
      <div className="flex justify-between">
        <p className="text-lg font-bold">Total</p>
        <div className="">
          <p className="mb-1 text-lg font-bold">
            {currency}
            {getCartAmount() + delivery_fee}.00
          </p>
          <p className="text-sm text-gray-700">including VAT</p>
        </div>
      </div>
      {location.pathname.includes("/cart") ? (
        <button
          onClick={() => {
            navigate("/place-order");
          }}
          className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600"
        >
          Check out
        </button>
      ) : null}
    </div>
  );
};

export default CartTotal;
