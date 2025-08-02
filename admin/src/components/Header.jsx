import { useState } from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
const Header = ({ currentPage, toggleSidebar }) => {
  const [search, setSearch] = useState("");
  const handleSearch = () => {
    console.log(search);
  };

  return (
    <div className="sticky top-0 z-50 backdrop-blur-md border border-gray-400 px-2 sm:px-4">
      <div className="flex items-center justify-between px-2 sm:px-5 lg:px-15 py-3 sm:py-5">
        {/* Desktop Logo */}
        <div className="hidden lg:flex items-center  space-x-4">
          <img className="  w-20 sm:w-25" src={assets.logo} alt="" />

          <p className="lg:ml-20 text-3xl font-bold text-green-800">
            {currentPage}
          </p>
        </div>

        {/* Mobile Header */}
        <div className="flex lg:hidden items-center justify-between w-full">
          <div className="flex items-center space-x-5">
            <button onClick={toggleSidebar} className="p-2">
              <img className="w-5 h-5" src={assets.density_medium} alt="Menu" />
            </button>
            <img className="w-16 sm:w-20" src={assets.logo} alt="" />
            <p className="ml-5 text-xl font-bold text-green-800">
              {currentPage}
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <img className="w-5 h-5" src={assets.sell} alt="" />
            <Link to={"/profile"}>
              <img
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full"
                src={assets.user_img}
                alt=""
              />
            </Link>
          </div>
        </div>

        {/* Desktop Search & Actions */}
        <div className="hidden lg:flex items-center justify-between flex-1  max-w-xl ml-8">
          <div className="max-w-xl flex items-center border border-gray-700 rounded-full  flex-1 ">
            <input
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 w-full text-base outline-none bg-inherit px-5 py-2"
              type="text"
              placeholder="Search"
              value={search}
            />
            {search && (
              <img
                onClick={() => setSearch("")}
                className="w-4 cursor-pointer mx-2 hover:scale-110 transition-transform"
                src={assets.close}
                alt=""
              />
            )}
            <div className="flex items-center justify-center bg-blue-600 rounded-r-full hover:bg-blue-800 h-full py-2 w-12 transition-colors">
              <img
                onClick={handleSearch}
                className="w-6 hover:scale-105 transition-transform cursor-pointer"
                src={assets.search}
                alt=""
              />
            </div>
          </div>

          <div className="flex items-center space-x-5 ml-6">
            <img className="w-5 h-5" src={assets.sell} alt="" />
            <Link to={"/profile"}>
              <img
                className="w-10 h-10 rounded-full"
                src={assets.user_img}
                alt=""
              />
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="lg:hidden px-2 justify-center sm:px-5 pb-3">
        <div className=" w-96  flex items-center border border-gray-700 rounded-full">
          <input
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 text-sm sm:text-base outline-none bg-inherit px-3 sm:px-5 py-2"
            type="text"
            placeholder="Search"
            value={search}
          />
          {search && (
            <img
              onClick={() => setSearch("")}
              className="w-4 cursor-pointer mx-2 hover:scale-110 transition-transform"
              src={assets.close}
              alt=""
            />
          )}
          <div className="flex items-center justify-center bg-blue-600 rounded-r-full hover:bg-blue-800 h-full py-2 w-10 sm:w-12 transition-colors">
            <img
              onClick={handleSearch}
              className="w-5 sm:w-6 hover:scale-105 transition-transform cursor-pointer"
              src={assets.search}
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
