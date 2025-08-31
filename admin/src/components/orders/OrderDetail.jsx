import { useContext } from "react";
import ProductOrder from "./ProductOrder";
import { ShopContext } from "../../context/ShopContext";

const OrderDetail = ({ order, setShowDetail }) => {
  const { currency } = useContext(ShopContext);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div
        className="absolute inset-0 cursor-pointer"
        onClick={() => setShowDetail(false)}
      />
      <div className="relative w-full max-w-4xl h-[70vh] mt-10 rounded-2xl shadow-2xl border border-gray-300 bg-white flex flex-col overflow-hidden">
        <div className="flex flex-col flex-1 overflow-y-auto hide-scrollbar p-6">
          <h2 className="text-2xl text-left font-bold">Order detail</h2>
          <div
            onClick={() => setShowDetail(false)}
            className="absolute top-4 right-6 cursor-pointer hover:scale-110"
          >
            X
          </div>
          <div className=" p-6">
            <div className="flex flex-col md:flex-row flex-wrap lg:items-center justify-between gap-6">
              {/* Product Info */}
              {order.items.map((item) => {
                return <ProductOrder key={item._id} item={item} />;
              })}
            </div>
            {/* Order Status */}
            <div className="flex flex-col mt-5 ">
              <span className="text-sm font-medium text-green-600">
                Status: {order.status}
              </span>

              <div className="">
                <p className="text-lg font-semibold text-gray-900 mb-2">
                  total Price: {order.totalPrice.toLocaleString("vi-VN")}{" "}
                  {currency}
                </p>
              </div>
            </div>

            {/* Order Details */}

            <div className="flex flex-col gap-5 flex-wrap pt-2 border-t border-gray-200  text-sm text-gray-700">
              <span>Shipping address: {order.shippingAddress}</span>
              <span>Message: {order.message}</span>
            </div>

            {/* /payment */}
            <div className="mt-4 py-2 border-t border-gray-100">
              <div className="flex flex-wrap items-center justify-between text-sm text-gray-500">
                <span>Payment method: {order.paymentMethod}</span>
                <span>
                  Placed on:{new Date(order.createdAt).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
