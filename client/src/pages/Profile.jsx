import { useState, useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import { useQuery } from "@tanstack/react-query";
import { userService } from "../services/userService";
import Spinner from "../components/Spinner";
import SecurityTab from "../components/profile/securityTab";
import ProfileTab from "../components/profile/ProfileTab";
const Profile = () => {
  const { token, backendUrl } = useContext(AppContext || {});

  const [activeTab, setActiveTab] = useState("profile");

  const { GetUserInfo } = userService();
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: GetUserInfo,
  });

  const tabs = [
    { id: "profile", name: "Thông tin cá nhân", icon: "👤" },
    { id: "security", name: "Bảo mật", icon: "🔒" },
  ];

  return (
    <>
      {isLoading && <Spinner />}
      {user && (
        <div className="min-h-screen bg-gray-50 py-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <img
                    src={user.avatar || assets.profile_icon}
                    alt="Avatar"
                    className="w-20 h-20 rounded-full object-cover border-4 border-green-100"
                  />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {user.name || "Người dùng"}
                  </h1>
                  <p className="text-gray-600">{user.email}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-sm p-4">
                  <nav className="space-y-2">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                          activeTab === tab.id
                            ? "bg-green-100 text-green-700 font-medium"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        }`}
                      >
                        <span className="text-lg">{tab.icon}</span>
                        <span>{tab.name}</span>
                      </button>
                    ))}
                  </nav>
                </div>
              </div>

              {/* Main Content */}
              <div className="lg:col-span-3">
                <div className="bg-white rounded-xl shadow-sm">
                  {/* Profile Tab */}
                  {activeTab === "profile" && user && (
                    <ProfileTab user={user} />
                  )}

                  {/* Security Tab */}
                  {activeTab === "security" && <SecurityTab />}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
