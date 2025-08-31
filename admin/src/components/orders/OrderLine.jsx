import { useContext, useState } from "react";
import { orderService } from "../../service/ordersService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ShopContext } from "../../context/ShopContext";
import { toast } from "react-toastify";
import Spinner from "../../components/Spinner";
import OrderDetail from "./OrderDetail";

const OrderLine = ({ orders, order, index }) => {
  const { currency } = useContext(ShopContext);
  const { UpdateOrderStatus, deleteOrder } = orderService();
  const [showDetail, setShowDetail] = useState(false);
  const queryClient = useQueryClient();
  //update status
  const { mutate: updateOrder, isPending: loadUpdate } = useMutation({
    mutationFn: UpdateOrderStatus,
    onSuccess: (res) => {
      if (res.success) {
        queryClient.invalidateQueries("orders");
      } else {
        toast.error(res.message);
      }
    },
  });

  const { mutate: mutateDeleteOrder, isPending: loadDeleted } = useMutation({
    mutationFn: deleteOrder,
    onSuccess: (res) => {
      if (res.success) {
        queryClient.invalidateQueries("orders");
      } else {
        toast.error(res.message);
      }
    },
  });
  const handleDeleteOrder = async (id) => {
    if (!window.confirm("Are you sure delete this Order?")) return;
    mutateDeleteOrder({ id });
  };
  return (
    <>
      <tr className="hover:bg-gray-50">
        <td className="px-6 py-4 text-sm font-medium text-gray-900">
          {orders.length - index}
        </td>
        <td className="px-6 py-4 text-sm text-gray-900">{order.fullName}</td>
        <td className="px-6 py-4 text-sm text-gray-900">
          {order.totalPrice}
          {currency}
        </td>
        <td className="px-6 py-4 text-sm text-gray-900">
          {new Date(order.createdAt).toDateString()}
        </td>
        <td className="px-2 py-4 font-bold">
          <select
            onChange={(e) => {
              e.preventDefault();
              if (e.target.value.toString() != order.status) {
                updateOrder({
                  id: order._id,
                  status: e.target.value,
                });
              }
            }}
            defaultValue={order.status}
            className="p-2 font-semibold text-green-700"
          >
            <option value="Pending">Pending</option>
            <option className="text-amber-800" value="Packing">
              Packing
            </option>
            <option className="text-blue-600" value="Delivering">
              Delivering
            </option>
            <option className="text-red-500" value="Cancelled">
              Cancelled
            </option>
            <option className="text-yellow-600" value="Completed">
              Completed
            </option>
            {/* "Pending", "Packing", "Delivering", "Cancelled","cOmpleted"], */}
          </select>
        </td>

        <td className="px-6 py-4 text-sm space-x-2">
          <button
            onClick={() => setShowDetail(true)}
            className="text-blue-600 hover:text-blue-800"
          >
            View
          </button>
          <button
            onClick={() => handleDeleteOrder(order._id)}
            className="text-red-600 hover:text-red-800"
          >
            delete
          </button>
        </td>
      </tr>
      {showDetail && (
        <tr>
          <td colSpan="6">
            <OrderDetail order={order} setShowDetail={setShowDetail} />
          </td>
        </tr>
      )}
    </>
  );
};

export default OrderLine;
