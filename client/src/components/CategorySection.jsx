import { Link } from "react-router-dom";
import Title from "./Title";
const CategorySection = () => {
  const categories = [
    {
      id: "vegetables",
      name: "Phân bón",
      icon: "🥬",
      image: "/images/vegetables.jpg",
      description: "Rau xanh tươi ngon, không hóa chất",
      count: 45,
      color: "bg-green-100 hover:bg-green-200",
    },
    {
      id: "fruits",
      name: "Trái cây",
      icon: "🍎",
      image: "/images/fruits.jpg",
      description: "Trái cây tươi ngọt, giàu vitamin",
      count: 35,
      color: "bg-red-100 hover:bg-red-200",
    },
    {
      id: "grains",
      name: "Ngũ cốc",
      icon: "🌾",
      image: "/images/grains.jpg",
      description: "Ngũ cốc nguyên hạt, bổ dưỡng",
      count: 25,
      color: "bg-yellow-100 hover:bg-yellow-200",
    },
    {
      id: "dairy",
      name: "Sản phẩm sữa",
      icon: "🥛",
      image: "/images/dairy.jpg",
      description: "Sữa tươi từ trang trại organic",
      count: 20,
      color: "bg-blue-100 hover:bg-blue-200",
    },
    {
      id: "meat",
      name: "Thịt organic",
      icon: "🥩",
      image: "/images/meat.jpg",
      description: "Thịt sạch, nuôi theo tiêu chuẩn organic",
      count: 15,
      color: "bg-pink-100 hover:bg-pink-200",
    },
    {
      id: "beverages",
      name: "Đồ uống",
      icon: "🧃",
      image: "/images/beverages.jpg",
      description: "Nước ép tự nhiên, trà thảo mộc",
      count: 10,
      color: "bg-purple-100 hover:bg-purple-200",
    },
  ];

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
        <div className="flex flex-wrap justify-center gap-10 lg:gap-15 mb-10">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/products?category=${category.id}`}
              className="group relative flex flex-col justify-center "
            >
              {/* Main Category Oval */}
              <div className="relative overflow-hidden flex flex-col items-center  hover:scale-110">
                <div
                  className={`flex  w-24 h-24 md:w-36 md:h-36  rounded-full items-center justify-center transition-all  border hover:border-2 hover:border-green-500  `}
                >
                  {/* Content */}
                  <div className=" z-10 text-center px-4">
                    <div className="text-xs text-gray-600 mt-1">
                      {category.count} sản phẩm
                    </div>
                  </div>
                </div>
                <h3 className="flex text-xs mt-4 md:text-sm font-semibold text-gray-900 group-hover:text-green-700 transition-colors duration-300 leading-tight">
                  {category.name}
                </h3>
                {/* Hover Description Card */}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2 transition-all duration-300 z-20">
                  <div className="bg-white rounded-xl shadow-2xl border border-gray-100 p-4 max-w-xs relative">
                    {/* Arrow */}
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-l border-t border-gray-100 rotate-45"></div>

                    {/* Content */}
                    <div className="text-center">
                      <div className="text-2xl mb-2">{category.icon}</div>
                      <h4 className="font-semibold text-gray-900 mb-2">
                        {category.name}
                      </h4>
                      <p className="text-sm text-gray-600 leading-relaxed mb-3">
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

              {/* Glow Effect */}
              {/* <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-400 to-blue-400 opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500"></div> */}
            </Link>
          ))}
        </div>

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
