import { useState } from "react";

const CategorySidebar = ({ onCategorySelect, selectedCategory }) => {
  const [isOpen, setIsOpen] = useState(false);

  const categories = [
    {
      id: "all",
      name: "Tất cả sản phẩm",
      icon: "🌱",
      count: 150,
    },
    {
      id: "vegetables",
      name: "Rau củ quả",
      icon: "🥬",
      count: 45,
      subcategories: [
        { id: "leafy-greens", name: "Rau lá xanh", count: 15 },
        { id: "root-vegetables", name: "Củ quả", count: 20 },
        { id: "herbs", name: "Rau thơm", count: 10 },
      ],
    },
    {
      id: "fruits",
      name: "Trái cây",
      icon: "🍎",
      count: 35,
      subcategories: [
        { id: "tropical-fruits", name: "Trái cây nhiệt đới", count: 20 },
        { id: "berries", name: "Quả mọng", count: 15 },
      ],
    },
    {
      id: "grains",
      name: "Ngũ cốc",
      icon: "🌾",
      count: 25,
      subcategories: [
        { id: "rice", name: "Gạo", count: 10 },
        { id: "quinoa", name: "Quinoa", count: 8 },
        { id: "oats", name: "Yến mạch", count: 7 },
      ],
    },
    {
      id: "dairy",
      name: "Sản phẩm từ sữa",
      icon: "🥛",
      count: 20,
    },
    {
      id: "meat",
      name: "Thịt organic",
      icon: "🥩",
      count: 15,
    },
    {
      id: "beverages",
      name: "Đồ uống",
      icon: "🧃",
      count: 10,
    },
  ];

  const [expandedCategories, setExpandedCategories] = useState(new Set());

  const toggleCategory = (categoryId) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  const handleCategoryClick = (categoryId) => {
    onCategorySelect(categoryId);
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
          fixed lg:sticky top-0 left-0 h-screen 
          w-80 lg:w-64 bg-white shadow-lg border-r border-gray-200
          transform transition-transform duration-300 ease-in-out z-50
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
        <div className="p-4">
          <ul className="space-y-2">
            {categories.map((category) => (
              <li key={category.id}>
                <div
                  className={`
                    flex items-center justify-between p-3 rounded-lg cursor-pointer
                    transition-colors duration-200 group
                    ${
                      selectedCategory === category.id
                        ? "bg-green-100 text-green-800 border border-green-200"
                        : "hover:bg-gray-50 text-gray-700"
                    }
                  `}
                  onClick={() => handleCategoryClick(category.id)}
                >
                  <div className="flex items-center space-x-3 flex-1">
                    <span className="text-xl">{category.icon}</span>
                    <div className="flex-1">
                      <span className="font-medium">{category.name}</span>
                      <span className="ml-2 text-sm text-gray-500">
                        ({category.count})
                      </span>
                    </div>
                  </div>

                  {category.subcategories && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleCategory(category.id);
                      }}
                      className="p-1 hover:bg-gray-200 rounded"
                    >
                      <svg
                        className={`w-4 h-4 transition-transform duration-200 ${
                          expandedCategories.has(category.id)
                            ? "rotate-180"
                            : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                  )}
                </div>

                {/* Subcategories */}
                {category.subcategories &&
                  expandedCategories.has(category.id) && (
                    <ul className="ml-6 mt-2 space-y-1">
                      {category.subcategories.map((subcategory) => (
                        <li key={subcategory.id}>
                          <div
                            className={`
                            flex items-center justify-between p-2 rounded-md cursor-pointer
                            transition-colors duration-200
                            ${
                              selectedCategory === subcategory.id
                                ? "bg-green-50 text-green-700 border-l-2 border-green-500"
                                : "hover:bg-gray-50 text-gray-600"
                            }
                          `}
                            onClick={() => handleCategoryClick(subcategory.id)}
                          >
                            <span className="text-sm">{subcategory.name}</span>
                            <span className="text-xs text-gray-500">
                              ({subcategory.count})
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
};

export default CategorySidebar;
