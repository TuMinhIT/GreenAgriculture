import { Link } from "react-router-dom";
import Title from "../Title";
import { categoriesService } from "../../services/categoriesService";
import { useQuery } from "@tanstack/react-query";
const CategorySection = () => {
  const { getAllCategories } = categoriesService();
  const { data: categories, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });
  return (
    <section className="py-10 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Title text1={"DANH MỤC"} text2={"SẢN PHẨM"} />
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Khám phá bộ sưu tập đa dạng các sản phẩm hữu cơ chất lượng cao của
            chúng tôi
          </p>
        </div>

        {/* Categories Grid */}
        {categories && (
          <div className="flex flex-wrap justify-center gap-10 lg:gap-15 mb-10">
            {categories.map((category) => (
              <Link
                key={category._id}
                to={`/products?category=${category._id}`}
                className=" flex flex-col justify-center "
              >
                {/* Main Category Oval */}
                <div className=" flex flex-col items-center">
                  <div className=" hover:scale-110 transition-transform">
                    <div className=" relative group flex min-w-24 md:min-w-36 rounded-2xl items-center justify-center transition-all border group-hover:border-2 group-hover:border-green-500">
                      <h3 className="flex py-3 text-xs md:text-sm font-semibold text-gray-900  transition-colors duration-300 leading-tight">
                        {category.name}
                      </h3>
                      {/* Hover Description Card */}
                      <div
                        className=" absolute bottom-full left-1/2 -translate-x-1/2  mt-3  min-w-45
                  opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0
                  transition-all duration-300 z-50"
                      >
                        <div className="bg-white rounded-xl shadow-2xl border border-gray-100 p-4 max-w-xs">
                          <p className="text-sm text-gray-600 font-bold leading-relaxed mb-3">
                            {category.description}
                          </p>
                          <div className="flex items-center justify-center text-green-600 text-sm font-medium hover:text-green-700 transition-colors">
                            <span>Khám phá ngay</span>
                            <svg
                              className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* View All Button */}
        <div className="text-center">
          <Link
            to="/products"
            className="inline-flex items-center px-8 py-3 bg-green-600 text-white font-medium rounded-full hover:bg-green-700 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <span>Xem tất cả sản phẩm</span>
            <svg
              className="w-5 h-5 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
