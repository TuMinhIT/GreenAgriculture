import { NavLink } from "react-router-dom";

const MobileSidebar = ({ visible, setVisible }) => {
  return (
    <>
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-all duration-300 ${
          visible ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0  bg-opacity-50"
          onClick={() => setVisible(false)}
        />

        {/* Sidebar */}
        <div
          className={`absolute right-0 top-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 ${
            visible ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
            <button
              onClick={() => setVisible(false)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-2">
            <NavLink
              to="/home"
              onClick={() => setVisible(false)}
              className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-green-50 hover:text-green-600 transition-colors"
            >
              <span>🏠</span>
              <span>Trang chủ</span>
            </NavLink>

            <NavLink
              to="/products"
              onClick={() => setVisible(false)}
              className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-green-50 hover:text-green-600 transition-colors"
            >
              <span>🛍️</span>
              <span>Sản phẩm</span>
            </NavLink>

            <NavLink
              to="/about"
              onClick={() => setVisible(false)}
              className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-green-50 hover:text-green-600 transition-colors"
            >
              <span>ℹ️</span>
              <span>Về chúng tôi</span>
            </NavLink>

            <NavLink
              to="/contact"
              onClick={() => setVisible(false)}
              className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-green-50 hover:text-green-600 transition-colors"
            >
              <span>📞</span>
              <span>Liên hệ</span>
            </NavLink>

            <hr className="my-4" />
          </nav>

          {/* Footer */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
            <div className="text-center text-sm text-gray-500">
              <p>Green Agriculture</p>
              <p>Hotline: 1900-1234</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileSidebar;
