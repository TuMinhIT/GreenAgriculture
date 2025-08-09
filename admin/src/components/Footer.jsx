import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <img
                src={assets.logo}
                alt="Green Agriculture"
                className="h-12 w-auto"
              />
              <div>
                <h3 className="text-xl font-bold text-green-400">
                  Green Agriculture
                </h3>
                <p className="text-sm text-gray-400">
                  Nông nghiệp xanh & Bền vững
                </p>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <span className="text-green-400">📞</span>
                <span className="text-gray-300">Hotline: 1900-1234</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-green-400">✉️</span>
                <span className="text-gray-300">info@greenagriculture.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-green-400">📍</span>
                <span className="text-gray-300">Nguyễn Hữu thọ, TP.HCM</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">
              Liên kết nhanh
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/home"
                  className="text-gray-300 hover:text-green-400 transition-colors duration-300 flex items-center space-x-2"
                >
                  <span>🏠</span>
                  <span>Trang chủ</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="text-gray-300 hover:text-green-400 transition-colors duration-300 flex items-center space-x-2"
                >
                  <span>🛍️</span>
                  <span>Sản phẩm</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-300 hover:text-green-400 transition-colors duration-300 flex items-center space-x-2"
                >
                  <span>ℹ️</span>
                  <span>Về chúng tôi</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-300 hover:text-green-400 transition-colors duration-300 flex items-center space-x-2"
                >
                  <span>📞</span>
                  <span>Liên hệ</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/profile"
                  className="text-gray-300 hover:text-green-400 transition-colors duration-300 flex items-center space-x-2"
                >
                  <span>👤</span>
                  <span>Tài khoản</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Product Categories */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">
              Danh mục sản phẩm
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/products?category=vegetables"
                  className="text-gray-300 hover:text-green-400 transition-colors duration-300 flex items-center space-x-2"
                >
                  <span></span>
                  <span> doanh mục 1</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/products?category=fruits"
                  className="text-gray-300 hover:text-green-400 transition-colors duration-300 flex items-center space-x-2"
                >
                  <span></span>
                  <span> doanh mục 1</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/products?category=grains"
                  className="text-gray-300 hover:text-green-400 transition-colors duration-300 flex items-center space-x-2"
                >
                  <span></span>
                  <span> doanh mục 1</span>
                </Link>
              </li>

              <li>
                <Link
                  to="/products?category=meat"
                  className="text-gray-300 hover:text-green-400 transition-colors duration-300 flex items-center space-x-2"
                >
                  <span></span>
                  <span> doanh mục 1</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Support & Newsletter */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">
              Hỗ trợ khách hàng
            </h4>

            {/* Support Links */}
            <ul className="space-y-3 mb-6">
              <li>
                <Link
                  to="/faq"
                  className="text-gray-300 hover:text-green-400 transition-colors duration-300"
                >
                  Câu hỏi thường gặp
                </Link>
              </li>
              <li>
                <Link
                  to="/shipping"
                  className="text-gray-300 hover:text-green-400 transition-colors duration-300"
                >
                  Chính sách vận chuyển
                </Link>
              </li>
              <li>
                <Link
                  to="/return"
                  className="text-gray-300 hover:text-green-400 transition-colors duration-300"
                >
                  Đổi trả & Hoàn tiền
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-gray-300 hover:text-green-400 transition-colors duration-300"
                >
                  Chính sách bảo mật
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-gray-400 text-sm text-center md:text-left">
              © 2025 Green Agriculture. Tất cả quyền được bảo lưu.
              <span className="mx-2">|</span>
              Thiết kế bởi{" "}
              <Link
                to="#"
                className="text-green-400 hover:text-green-300 transition-colors"
              >
                secret IT
              </Link>
            </div>

            {/* Social Media Links */}
            <div className="flex items-center space-x-4">
              <span className="text-gray-400 text-sm">Theo dõi chúng tôi:</span>
              <div className="flex space-x-3">
                <Link
                  to="#"
                  className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition-all duration-300"
                  title="Facebook"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </Link>

                <Link
                  to="#"
                  className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-red-600 hover:text-white transition-all duration-300"
                  title="YouTube"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
