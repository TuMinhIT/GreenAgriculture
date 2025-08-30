import { useEffect, useState } from "react";
import { userService } from "../../services/userService";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const ProfileTab = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const { UpdateUser } = userService();

  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    avatar: "",
  });

  useEffect(() => {
    if (user) {
      setUserInfo({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
        avatar: user.avatar || "",
      });
    }
  }, [user]);

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: UpdateUser,
    onSuccess: (res) => {
      toast.success("update successfully!");
      setIsEditing(false);
      queryClient.invalidateQueries("user");
    },
  });

  return (
    <>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Thông tin cá nhân
          </h2>
          <button
            onClick={() => setIsEditing((s) => !s)}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
            <span>{isEditing ? "Hủy" : "Chỉnh sửa"}</span>
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            mutate({ userInfo });
          }}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Họ và tên
              </label>
              <input
                type="text"
                value={userInfo.name}
                onChange={(e) =>
                  setUserInfo({
                    ...userInfo,
                    name: e.target.value,
                  })
                }
                disabled={!isEditing}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-gray-50 disabled:text-gray-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={userInfo.email}
                disabled
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Số điện thoại
              </label>
              <input
                type="tel"
                value={userInfo.phone}
                maxLength={11}
                onChange={(e) =>
                  setUserInfo({
                    ...userInfo,
                    phone: e.target.value,
                  })
                }
                disabled={!isEditing}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-gray-50 disabled:text-gray-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Địa chỉ
              </label>
              <textarea
                value={userInfo.address}
                onChange={(e) =>
                  setUserInfo({
                    ...userInfo,
                    address: e.target.value,
                  })
                }
                disabled={!isEditing}
                rows="3"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-gray-50 disabled:text-gray-500"
              />
            </div>
          </div>

          {isEditing && (
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => {
                  if (userInfo) setUserInfo(userInfo);
                  setIsEditing(false);
                }}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Hủy
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
              >
                {isPending ? "Đang lưu..." : "Lưu thay đổi"}
              </button>
            </div>
          )}
        </form>
      </div>
    </>
  );
};

export default ProfileTab;
