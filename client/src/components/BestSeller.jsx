import Title from "./Title";
import { products } from "../assets/assets";
import ProductCard from "./products/ProductCard";
import { useQuery } from "@tanstack/react-query";
import { ProductsService } from "../services/productsService";
import Spinner from "../components/Spinner";
const BestSeller = () => {
  const { getAllProducts } = ProductsService();
  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });

  return (
    <>
      {isLoading && <Spinner />}
      {products && (
        <section className="py-10 bg-white">
          <div className="max-w-7xl mx-auto px-2 sm:px-2 lg:px-4">
            {/* Header */}
            <div className="text-center mb-12">
              <Title text1={"SẢN PHẨM"} text2={"BÁN CHẠY"} />
              <>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 gap-4 lg:gap-4">
                  {products.map((item) => (
                    <div key={item._id} className="w-full">
                      <ProductCard item={item} />
                    </div>
                  ))}
                </div>
              </>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default BestSeller;
