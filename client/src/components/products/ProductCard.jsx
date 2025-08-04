import { assets } from "../../assets/assets";
import ProductCarousel from "./ProductCarousel";
import { Link } from "react-router";

const ProductCard = ({ item }) => {
  const addToCart = (item) => {
    console.log("Add to cart", item);
  };
  const currency = "-đ";
  return (
    <div>
      <div className=" max-w-60 w-full bg-white border border-gray-200 rounded-lg hover:scale-105 hover:shadow-lg transition duration-300 ">
        <ProductCarousel key={item.id} item={item} />
        <div className="px-5 pb-2 bg-white flex flex-col gap-4">
          <Link to={"/product/1"}>
            <p className="h-12 line-clamp-3 text-base font-semibold text-gray-900 hover:text-green-700">
              {item.name}
            </p>
          </Link>

          <div className="flex flex-row justify-between">
            <span className="justify-start flex font-bold text-orange-600">
              {item.retailPrice}
              {currency}
            </span>

            <img
              onClick={() => {
                addToCart(item);
              }}
              className="cursor-pointer hover:bg-green-500 rounded-full"
              src={assets.add_icon}
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
