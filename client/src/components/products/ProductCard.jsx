import { useContext, useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import ProductCarousel from "./ProductCarousel";
import ProductDetail from "./ProductDetail";
import { AppContext } from "../../context/AppContext";
import { cartService } from "../../services/cartService";

const ProductCard = ({ item }) => {
  const [showDetail, setShowDetail] = useState(false);
  const { currency, token, navigate, setCartCount, cartCount } =
    useContext(AppContext);
  const { addToCart } = cartService();
  const [added, setAdded] = useState(false);

  const handleAddToCart = async (item, quantity) => {
    if (token === "") {
      navigate("/login");
    } else {
      // reset sau 1.5s
      setAdded(true);
      setTimeout(() => setAdded(false), 1500);
      setCartCount(cartCount + 1);
      await addToCart(item._id, quantity);
    }
  };

  return (
    <div>
      {showDetail && (
        <ProductDetail
          setShowDetail={setShowDetail}
          product={item}
          addToCart={addToCart}
        />
      )}

      <div className=" max-w-60 w-full bg-white border border-gray-200 rounded-lg hover:scale-105 hover:shadow-lg transition duration-300 ">
        <ProductCarousel key={item._id} item={item} />

        <p className="justify-center  flex text-sm  text-gray-700 ">
          {item.category.name}
        </p>

        <div className="px-5 pb-2 bg-white flex flex-col gap-2">
          <p
            onClick={() => setShowDetail(true)}
            className="cursor-pointer h-12 line-clamp-2 text-base font-semibold text-green-600 hover:text-green-700"
          >
            {item.name}
          </p>

          <div className="flex flex-row justify-between">
            <span className="justify-start flex font-bold text-orange-600">
              {item.price}
              {currency}
            </span>
            {added === true ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#75FB4C"
              >
                <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
              </svg>
            ) : (
              <img
                onClick={() => {
                  handleAddToCart(item, 1);
                }}
                className="cursor-pointer hover:bg-green-500 rounded-full"
                src={assets.add_icon}
                alt=""
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
