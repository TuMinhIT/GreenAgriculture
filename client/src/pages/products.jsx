import { useState } from "react";
import CategorySidebar from "../components/CategorySidebar";

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    console.log("Selected category:", categoryId);
    // Thêm logic filter sản phẩm theo category
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <CategorySidebar
          onCategorySelect={handleCategorySelect}
          selectedCategory={selectedCategory}
        />

        {/* Main Content */}
        <div className="flex-1 lg:ml-64 p-4 lg:p-8">
          <div className="mb-6">
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
              Sản phẩm organic
            </h1>
            <p className="text-gray-600 mt-2">Danh mục: {selectedCategory}</p>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {/* Product cards sẽ được render ở đây */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
