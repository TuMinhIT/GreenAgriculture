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
        <div className="flex items-center space-x-4">
          <div className="flex lg:hidden items-center space-x-5">
            <button onClick={toggleSidebar} className="p-2">
              <img className="w-5 h-5" src={assets.density_medium} alt="Menu" />
            </button>
          </div>
          <img
            className=" w-20 sm:w-25 hidden lg:block"
            src={assets.logo}
            alt=""
          />

          <p className="lg:ml-20 text-3xl font-bold text-green-800">
            {currentPage}
          </p>
        </div>

        {/* Desktop */}
        <div className="flex items-center justify-between ">
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
    </div>
  );
};

export default Header;
