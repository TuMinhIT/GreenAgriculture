import { useContext } from "react";

import { useLocation } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

const CartTotal = () => {
  const location = useLocation();
  const { amount, currency, delivery_fee } = useContext(AppContext);
  return (
    <div className="mt-6 h-full  rounded-lg border bg-white p-6 shadow-md md:mt-0 max-w-1/3 w-full min-w-[300px] right-0">
      <div className="mb-2 flex justify-between">
        <p className="text-gray-700">Tổng thanh toán</p>
        <p className="text-gray-700">
          {amount.toLocaleString("vi-VN")} {currency}
        </p>
      </div>
      <div className="flex justify-between">
        <p className="text-gray-700">Phí vận chuyển</p>
        <p className="text-gray-700">
          {delivery_fee.toLocaleString("vi-VN")} {currency}
        </p>
      </div>
      <hr className="my-4" />
      <div className="flex justify-between">
        <p className="text-lg font-bold">Tổng cộng</p>
        <div className="">
          <p className="mb-1 text-lg font-bold">
            {(amount + delivery_fee).toLocaleString("vi-Vn")} {currency}
          </p>
          <p className="text-sm text-gray-700">Bao gồm VAT</p>
        </div>
      </div>
      {location.pathname.includes("/cart") ? (
        <button
          onClick={() => {
            navigate("/place-order");
          }}
          className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600"
        >
          Tiến hành đặt hàng
        </button>
      ) : null}
    </div>
  );
};

export default CartTotal;
