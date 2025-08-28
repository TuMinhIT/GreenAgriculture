import { useContext, useEffect, useState } from "react";

import { toast } from "react-toastify";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { orderService } from "../services/orderService";
import { useQuery } from "@tanstack/react-query";
import Title from "../components/Title";
import Spinner from "../components/Spinner";
import ProductOrder from "../components/orders/productOrder";
import OrderStatus from "../components/orders/OrderStatus";
import OrderDetail from "../components/orders/OrderDetail";
const Orders = () => {
  const { currency, backendUrl, token } = useContext(AppContext);

  const { getOrderHistory } = orderService();

  const { data: orders, isloading } = useQuery({
    queryFn: getOrderHistory,
    queryKey: ["orders"],
  });

  return (
    <div className="pt-14 max-w-6xl mx-auto min-h-200">
      <div className="text-2xl mb-8">
        <Title text1={"MY"} text2={"ORDERS"} />
        {isloading && <Spinner />}
      </div>

      {orders && orders.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-gray-500">
          <div className="text-6xl mb-4">📦</div>
          <h3 className="text-2xl font-semibold mb-2">No orders yet</h3>
          <p className="text-gray-400">Your order history will appear here</p>
        </div>
      )}
      {orders && orders.length != 0 && (
        <div className="space-y-6">
          {orders.map((order, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col md:flex-row flex-wrap lg:items-center justify-between gap-6">
                {/* Product Info */}
                {order.items.map((item) => {
                  return <ProductOrder key={item._id} item={item} />;
                })}

                {/* Order Status */}
                <OrderStatus order={order} />
              </div>

              {/* Order Details */}
              <OrderDetail order={order} />
              <div className="flex flex-wrap pt-2 border-t border-gray-200 items-center justify-between text-sm text-gray-700">
                <span>Shipping address: {order.shippingAddress}</span>
                <span>Message: {order.message}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
