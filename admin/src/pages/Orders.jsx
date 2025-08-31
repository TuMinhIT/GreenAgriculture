import { useContext, useState } from "react";
import { orderService } from "../service/ordersService";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/Spinner";
import { ShopContext } from "../context/ShopContext";
import * as XLSX from "xlsx";
import OrderLine from "../components/orders/OrderLine";

const Orders = () => {
  const [statusFilter, setStatusFilter] = useState("all");

  const { currency } = useContext(ShopContext);
  const { getAllOrder } = orderService();
  const { data: orders, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: getAllOrder,
  });

  const exportToExcel = () => {
    // const dataToExport = filteredOrders.map(
    //   ({ id, customer, status, total }) => ({
    //     OrderID: id,
    //     Customer: customer,
    //     Status: status,
    //     Total: total,
    //   })
    // );

    const worksheet = XLSX.utils.json_to_sheet(filteredOrders);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");
    XLSX.writeFile(workbook, "Orders.xlsx");
  };

  const filteredOrders =
    statusFilter === "all"
      ? orders
      : orders.filter((order) => order.status === statusFilter);

  return (
    <div>
      <div className="bg-white min-h-200 rounded-xl shadow-sm border">
        <div className="p-6 border-b flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">
            Order Management
          </h3>
          <div className="flex space-x-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
            >
              <option value="all">All Status</option>
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
              <option value="Packing">Packing</option>
              <option value="Cancelled">Cancelled</option>
            </select>

            <button
              onClick={exportToExcel}
              className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors"
            >
              Export to Excel
            </button>
          </div>
        </div>
        {isLoading && <Spinner />}

        <div className="overflow-x-auto">
          <table className="w-full" id="myTable">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Order
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Amount
                </th>

                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {filteredOrders &&
                filteredOrders.map((order, index) => (
                  <OrderLine
                    key={order._id}
                    orders={orders}
                    index={index}
                    order={order}
                  />
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Orders;

{
  /* <td className="px-6 py-4">
  <span
    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
      order.status === "Completed"
        ? "bg-green-100 text-green-800"
        : order.status === "Pending"
        ? "bg-yellow-100 text-yellow-800"
        : "bg-blue-100 text-blue-800"
    }`}
  >
    {order.status}
  </span>
</td>; */
}
