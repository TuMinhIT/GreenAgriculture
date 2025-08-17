import { useState } from "react";
import Categories from "../components/categories/Categories";
import Brands from "../components/brands/Brands";

export default function CategoryBrandManager() {
  return (
    <div className="flex flex-col gap-6">
      {/* Category Management */}
      <Categories />
      {/* Brand Management */}
      <Brands />
    </div>
  );
}
