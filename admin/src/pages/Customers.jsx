import { useEffect, useState } from "react";
import axios from "axios";
import { Trash2, User as UserIcon, Mail, Phone, Shield } from "lucide-react";
import { userService } from "../service/userService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
const Customers = () => {
  const [loading, setLoading] = useState(true);
  const { GetAllUser, DeleteUser } = userService();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: DeleteUser,
    onSuccess: (res) => {
      if (res.success) {
        queryClient.invalidateQueries("users");
      }
    },
  });
  const deleteUser = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa user này?")) return;
    try {
      mutate({ userId: id });
    } catch (error) {
      console.error(error);
      toast.error("Xóa thất bại!");
    }
  };

  const { data: users, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: GetAllUser,
  });

  if (isLoading) return <p className="text-center mt-10">Đang tải...</p>;

  return (
    <div className="">
      <h1 className="text-2xl font-bold mb-6 text-green-700">
        🌿 Quản lý User
      </h1>

      <div className="overflow-hidden rounded-2xl shadow-lg border border-gray-200">
        <table className="w-full text-sm">
          <thead className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
            <tr>
              <th className="p-3 text-left ">Tên</th>
              <th className="p-3 text-left flex">Email</th>
              <th className="p-3 text-left">SĐT</th>
              <th className="p-3 text-left">ngày tạo</th>
              <th className="p-3 text-center">Hành động</th>
            </tr>
          </thead>
          {users && users.length > 0 && (
            <tbody className="bg-white divide-y divide-gray-100">
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="hover:bg-green-50 transition duration-150"
                >
                  <td className="p-3  items-center gap-2">{user.name}</td>
                  <td className="p-3  items-center gap-2">{user.email}</td>
                  <td className="p-3  items-center gap-2">
                    {user.phone || "-"}
                  </td>
                  <td className="p-3  items-center gap-2">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>

                  <td className="p-3 text-center">
                    <button
                      onClick={() => deleteUser(user._id)}
                      className="inline-flex items-center gap-1 bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};

export default Customers;
