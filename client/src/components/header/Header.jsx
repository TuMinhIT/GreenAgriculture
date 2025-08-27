import { useState, useEffect, useRef, useContext } from "react";
import { assets } from "../../assets/assets";
import { Link, NavLink, useNavigate } from "react-router-dom";
import MobileSidebar from "./MobileSidebar";
import { AppContext } from "../../context/AppContext";

const Header = () => {
  const [visible, setVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuRef = useRef();

  const { token, setToken, cartCount, navigate } = useContext(AppContext);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="flex flex-col items-center">
                <img
                  src={assets.logo}
                  className=" h-12 transition-transform group-hover:scale-105"
                  alt="Green Agriculture"
                />
                <p className="text-xs text-gray-500">Hữu cơ & Tươi</p>
              </div>
            </Link>

            {/* Menu */}
            <nav className="hidden lg:flex items-center space-x-8">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `text-sm font-medium ${
                    isActive ? "text-green-600" : "text-gray-700"
                  } hover:text-green-600`
                }
              >
                Trang chủ
              </NavLink>
              <NavLink
                to="/products"
                className={({ isActive }) =>
                  `text-sm font-medium ${
                    isActive ? "text-green-600" : "text-gray-700"
                  } hover:text-green-600`
                }
              >
                Sản phẩm
              </NavLink>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `text-sm font-medium ${
                    isActive ? "text-green-600" : "text-gray-700"
                  } hover:text-green-600`
                }
              >
                Giới thiệu
              </NavLink>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `text-sm font-medium ${
                    isActive ? "text-green-600" : "text-gray-700"
                  } hover:text-green-600`
                }
              >
                Liên hệ
              </NavLink>
            </nav>

            {/* Right Actions */}
            <div className="flex items-center space-x-4">
              {/* User Account */}
              <div className="relative" ref={menuRef}>
                <div
                  onClick={() => {
                    if (!token) {
                      navigate("/login");
                    } else setIsMenuOpen((prev) => !prev);
                  }}
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>

                  <span className="hidden lg:block text-sm font-medium text-gray-700">
                    {token ? `Tài khoản` : "Đăng nhập"}
                  </span>
                </div>

                {/* Dropdown */}
                {isMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 transition-all duration-200">
                    <div className="py-2">
                      {token && (
                        <>
                          <Link
                            to="/profile"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            👤 Thông tin cá nhân
                          </Link>
                          <Link
                            to="/orders"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            📦 Đơn hàng của tôi
                          </Link>
                          <hr className="my-2" />
                          <button
                            onClick={() => {
                              setToken("");
                              navigate("/login");
                            }}
                            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                          >
                            🚪 Đăng xuất
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Shopping Cart */}

              <Link to={token ? "/cart" : "/login"} className="relative group">
                <div className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="relative">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"
                        />
                      </svg>
                    </div>
                    {cartCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                        {cartCount}
                      </span>
                    )}
                  </div>
                  <span className="hidden lg:block text-sm font-medium text-gray-700">
                    Giỏ hàng
                  </span>
                </div>
              </Link>

              {/* Mobile Button */}
              <button
                onClick={() => setVisible(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <svg
                  className="w-6 h-6 text-gray-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileSidebar visible={visible} setVisible={setVisible} />
    </>
  );
};

export default Header;
