import { useState } from "react";
import Categories from "../components/categories/Categories";

export default function CategoryBrandManager() {
  const [brands, setBrands] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [newBrand, setNewBrand] = useState("");
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showBrandModal, setShowBrandModal] = useState(false);

  const handleDeleteBrand = (id) => {
    setBrands(brands.filter((b) => b.id !== id));
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Category Management */}
      <Categories />
      {/* Brand Management */}
      {/* <Brands
        setBrands={setBrands}
        brands={brands}
        handleDeleteBrand={handleDeleteBrand}
        setShowBrandModal={setShowBrandModal}
      /> */}
      {/* Category Modal */}
      {/* {showCategoryModal && <CategoryModel />} */}

      {/* Brand Modal */}
      {/* {showBrandModal && <BranModel />} */}
    </div>
  );
}
