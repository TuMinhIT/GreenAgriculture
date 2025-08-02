import { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Routers from "../Routers";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState("Overview");
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  return (
    <div className="min-h-screen bg-green-200">
      <div className="">
        {<Header currentPage={currentPage} toggleSidebar={toggleSidebar} />}
      </div>

      <div className="flex">
        {/* desktop */}
        <div className="hidden lg:block w-64   shadow-lg border-r border-gray-500 ">
          <Sidebar />
        </div>

        {/* mobi */}
        {sidebarOpen && (
          <div className="fixed z-50 w-64 top-20  shadow-lg border-r  lg:hidden">
            <div onClick={() => setSidebarOpen(false)}>
              <Sidebar />
            </div>
          </div>
        )}
        <div className="flex flex-col w-full bg-gray-100">
          <div className="flex flex-col my-5 mx-5 md:mx-10 lg:mx-20">
            <Routers />
          </div>
          {/* <Footer /> */}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
