import { useState } from "react";
import { categoriesService } from "../../services/categoriesService";
import { useQuery } from "@tanstack/react-query";

const CategorySidebar = ({ onCategorySelect, selectedCategory }) => {
  const [isOpen, setIsOpen] = useState(false);

  const { getAllCategories } = categoriesService();
  const { data: categories, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });

  const handleCategoryClick = (categoryId) => {
    onCategorySelect(categoryId);
    if (isOpen) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-20 left-4 z-50 bg-green-600 text-white p-2 rounded-lg shadow-lg"
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
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-opacity-50 z-4"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`  
          fixed lg:sticky top-0 left-0 h-screen z-50 
          w-full max-w-100 bg-white shadow-lg border-r border-gray-200
          transform transition-transform duration-300 ease-in-out 
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          overflow-y-auto
        `}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              Danh mục sản phẩm
            </h2>
            <button
              onClick={() => setIsOpen(false)}
              className="lg:hidden text-gray-500 hover:text-gray-700"
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
        </div>

        {/* Categories List */}
        {categories && (
          <div className="p-4">
            <ul className="space-y-2">
              <li key={"all"}>
                <div
                  className={`
                    flex items-center justify-between p-3 rounded-lg cursor-pointer
                    transition-colors duration-200 group
                    ${
                      selectedCategory === "all"
                        ? "bg-green-100 text-green-800 border border-green-200"
                        : "hover:bg-gray-50 text-gray-700"
                    }
                  `}
                  onClick={() => handleCategoryClick("all")}
                >
                  <div className="flex items-center space-x-3 flex-1">
                    <div className="flex-1">
                      <span className="font-medium">Tất cả sản phẩm</span>
                    </div>
                  </div>
                </div>
              </li>
              {categories.map((category) => (
                <li key={category._id}>
                  <div
                    className={`
                    flex items-center justify-between p-3 rounded-lg cursor-pointer
                    transition-colors duration-200 group
                    ${
                      selectedCategory === category.name
                        ? "bg-green-100 text-green-800 border border-green-200"
                        : "hover:bg-gray-50 text-gray-700"
                    }
                  `}
                    onClick={() => handleCategoryClick(category.name)}
                  >
                    <div className="flex items-center space-x-3 flex-1">
                      <div className="flex-1">
                        <span className="font-medium">{category.name}</span>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </aside>
    </>
  );
};

export default CategorySidebar;
