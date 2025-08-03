import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../component/Title";
import { toast } from "react-toastify";
import axios from "axios";
const Orders = () => {
  const { products, currency, backendUrl, token } = useContext(ShopContext);
  const [orders, setOrders] = useState([]);
  const loadOrders = async () => {
    try {
      if (token) {
        const res = await axios.post(
          backendUrl + "/api/orders/userorders",
          {},
          {
            headers: {
              token,
            },
          }
        );
        if (res.data.success) {
          let allOrdersItem = [];
          res.data.orders.forEach((order) => {
            order.items.forEach((item) => {
              item["orderDate"] = order.date;
              item["orderStatus"] = order.status;
              item["paymentMethod"] = order.paymentMethod;
              item["payment"] = order.payment;
              allOrdersItem.push(item);
            });
          });
          setOrders(allOrdersItem.reverse());
        } else {
          toast.error(res.data.message);
        }
      } else return null;
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  useEffect(() => {
    loadOrders();
  }, [token]);

  return (
    <div className="pt-14 max-w-6xl mx-auto">
      <div className="text-2xl mb-8">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>

      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-500">
          <div className="text-6xl mb-4">📦</div>
          <h3 className="text-2xl font-semibold mb-2">No orders yet</h3>
          <p className="text-gray-400">Your order history will appear here</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((item, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                {/* Product Info */}
                <div className="flex items-start gap-4 flex-1">
                  <img
                    src={item.image[0]}
                    alt="product-image"
                    className="w-20 h-20 object-cover rounded-md border"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-2">
                      Price: {currency}
                      {item.price}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>Quantity: {item.quantity}</span>
                      <span>Size: {item.size}</span>
                    </div>
                  </div>
                </div>

                {/* Order Status */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4  lg:gap-6">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium text-green-600">
                      {item.orderStatus}
                    </span>
                  </div>

                  <div className="text-right">
                    <p className="text-lg font-semibold text-gray-900 mb-2">
                      {currency}
                      {item.price}
                    </p>
                    <button
                      onClick={loadOrders}
                      className="bg-black text-white px-4 py-2 rounded-md text-sm hover:bg-gray-800 transition-colors"
                    >
                      Track Order
                    </button>
                  </div>
                </div>
              </div>

              {/* Order Details */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex flex-wrap items-center justify-between text-sm text-gray-500">
                  <span>Payment method: {item.paymentMethod}</span>
                  <span>
                    Placed on: {new Date(item.orderDate).toDateString()}
                  </span>
                  <span>
                    Expected delivery:{" "}
                    {new Date(
                      item.orderDate + 7 * 24 * 60 * 60 * 1000
                    ).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
