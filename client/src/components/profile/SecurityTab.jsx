import { useState } from "react";
import { userService } from "../../services/userService";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

const SecurityTab = () => {
  const loading = true;
  const [showEdit, setShowEdit] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const { ChangePassword } = userService();
  const { mutate, isPending } = useMutation({
    mutationFn: ChangePassword,
    onSuccess: (res) => {
      if (res.success) {
        toast.success("Đổi mật khẩu thành công!");
        setShowEdit(false);
        setPasswordData({});
      } else {
        toast.success(res.message);
      }
    },
  });
  // CHANGE PASSWORD (PUT /users/change-password)
  const handleChangePassword = async (e) => {
    e.preventDefault();
    // Check confirm password trước khi gọi API
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("Mật khẩu xác nhận không khớp!");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      toast.error("Mật khẩu mới phải có ít nhất 6 ký tự!");
      return;
    }
    mutate({
      currentPassword: passwordData.currentPassword,
      newPassword: passwordData.newPassword,
    });
  };

  return (
    <>
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Bảo mật tài khoản
        </h2>
        {!showEdit && (
          <div className="flex flex-row gap-10 items-center mt-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              ✓ Đã xác thực
            </span>

            <button
              onClick={() => setShowEdit(true)}
              className="inline-flex items-center px-2.5 py-2 hover:bg-green-500 rounded-full text-xs font-medium bg-green-300 text-green-800"
            >
              Đổi mật khẩu
            </button>
          </div>
        )}
        {showEdit && (
          <form onSubmit={handleChangePassword} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mật khẩu hiện tại
              </label>
              <input
                type="password"
                value={passwordData.currentPassword}
                placeholder="........."
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    currentPassword: e.target.value,
                  })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mật khẩu mới
              </label>
              <input
                type="password"
                value={passwordData.newPassword}
                placeholder="........."
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    newPassword: e.target.value,
                  })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Xác nhận mật khẩu mới
              </label>
              <input
                type="password"
                value={passwordData.confirmPassword}
                placeholder="........."
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    confirmPassword: e.target.value,
                  })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>

            <button
              type="submit"
              // disabled={isPending}
              className="w-full md:w-auto px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              {isPending ? "Đang cập nhật..." : "Đổi mật khẩu"}
            </button>
          </form>
        )}
      </div>
    </>
  );
};

export default SecurityTab;
