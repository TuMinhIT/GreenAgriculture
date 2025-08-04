import { assets } from "../assets/assets";
import Title from "../components/Title";
import CartTotal from "../components/cartComponent/CartTotal";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";

import { useContext, useState } from "react";

const Cart = () => {
  const {
    products,
    cartItems,
    currency,
    delivery_fee,
    getCartCount,
    updateQuatity,
    getCartAmount,
  } = useContext(AppContext);
  const [cartData, setCartData] = useState([]);

  //   useEffect(() => {
  //     const tempData = [];
  //     for (let item in cartItems) {
  //       for (let size in cartItems[item]) {
  //         try {
  //           if (cartItems[item][size] > 0) {
  //             const product = products.find((product) => product._id === item);
  //             tempData.push({
  //               ...product,
  //               size,
  //               quantity: cartItems[item][size],
  //             });
  //           }
  //         } catch (error) {
  //           console.log(error);
  //         }
  //       }
  //     }
  //     setCartData(tempData);
  //   }, [cartItems]);
  return (
    <div>
      <div className=" pt-1">
        <div className="text-2xl mb-10 text-center ">
          <Title text1={"GIỎ "} text2={"HÀNG"} />
        </div>
        {getCartCount() > 0 ? (
          <div className=" mx-auto max-w-5xl justify-center px-6 lg:flex md:space-x-6 xl:px-0">
            <div className="rounded-lg lg:w-2/3">
              {products.map((item, index) => (
                <div
                  key={index}
                  className="justify-between mb-6 rounded-lg bg-gray-50 border border-gray-200 p-6 shadow sm:flex sm:justify-start"
                >
                  <img
                    src={
                      item.image && item.image[0]
                        ? item.image[0]
                        : "/placeholder.jpg"
                    }
                    alt="product-image"
                    className="w-50 h-20 overflow-hidden rounded-lg sm:w-30"
                  />
                  <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between relative">
                    <div className="mt-5 sm:mt-0">
                      <h2 className="text-lg font-bold text-gray-900">
                        {item.name}
                      </h2>
                      <p className="mt-1 text-black">
                        {currency}
                        {item.price}
                      </p>

                      <div className="absolute right-[50%] bottom-0">
                        <div className="flex items-center border-gray-100">
                          <span
                            // onClick={() => {
                            //   if (item.quantity > 1) {
                            //     updateQuatity(
                            //       item._id,
                            //       item.size,
                            //       item.quantity - 1
                            //     );
                            //   }
                            // }}
                            className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
                          >
                            {" "}
                            -{" "}
                          </span>
                          <input
                            className="h-8 w-8 border bg-white text-center text-xs outline-none"
                            type="number"
                            // value={item.quantity}
                            value={10}
                            min="1"
                            readOnly
                          />
                          <span
                            onClick={() => {
                              updateQuatity(
                                item._id,
                                item.size,
                                item.quantity + 1
                              );
                            }}
                            className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
                          >
                            {" "}
                            +{" "}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-between im sm:space-y-6 sm:mt-0 sm:block sm:space-x-6 ">
                      <div className="flex items-center space-x-4">
                        <img
                          onClick={() => {
                            updateQuatity(item._id, item.size, 0);
                          }}
                          className="w-5  hover:scale-110 top-10"
                          src={assets.bin_icon}
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* <!-- Sub total --> */}
            <CartTotal />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-10 text-gray-500">
            <div className="text-6xl mb-4">🛒</div>
            <h3 className="text-2xl font-semibold mb-2">Your cart is empty</h3>
            <p className="text-gray-400 mb-6">
              Add some products to get started
            </p>
            <Link
              to={"/collection"}
              className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
