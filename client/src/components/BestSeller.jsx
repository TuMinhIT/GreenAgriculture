import Title from "./Title";
import { products } from "../assets/assets";
import ProductCard from "./products/ProductCard";
const BestSeller = () => {
  const currentProducts = products.slice(0, 10);
  return (
    <section className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Title text1={"SẢN PHẨM"} text2={"BÁN CHẠY"} />
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 gap-4 lg:gap-4">
              {currentProducts.map((item) => (
                <div key={item.id} className="w-full">
                  <ProductCard item={item} />
                </div>
              ))}
            </div>
          </>
        </div>
      </div>
    </section>
  );
};

export default BestSeller;
