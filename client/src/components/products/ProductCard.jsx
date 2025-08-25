import { use, useContext, useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import ProductCarousel from "./ProductCarousel";
import { Link } from "react-router";
import ProductDetail from "./ProductDetail";
import { AppContext } from "../../context/AppContext";

const ProductCard = ({ item }) => {
  const [showDetail, setShowDetail] = useState(false);
  const { currency } = useContext(AppContext);
  const addToCart = (item) => {
    console.log("Add to cart", item);
  };

  return (
    <div>
      {showDetail && (
        <ProductDetail setShowDetail={setShowDetail} product={item} />
      )}

      <div className=" max-w-60 w-full bg-white border border-gray-200 rounded-lg hover:scale-105 hover:shadow-lg transition duration-300 ">
        <ProductCarousel key={item._id} item={item} />

        <p className="justify-center  flex text-sm  text-gray-700 ">
          {item.category.name}
        </p>

        <div className="px-5 pb-2 bg-white flex flex-col gap-2">
          <Link
            onClick={() => setShowDetail(true)}
            // to={"/product/1"}
          >
            <p className="h-12 line-clamp-2 text-base font-semibold text-green-600 hover:text-green-700">
              {item.name}
            </p>
          </Link>

          <div className="flex flex-row justify-between">
            <span className="justify-start flex font-bold text-orange-600">
              {item.price}
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
