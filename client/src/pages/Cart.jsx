import Title from "../components/Title";
import CartTotal from "../components/cartComponent/CartTotal";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { useContext } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { cartService } from "../services/cartService";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";

const Cart = () => {
  const { cartItems, currency, setCartItems } = useContext(AppContext);

  const { getCartData, deteteCartItem, updateQuantity } = cartService();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["carts"],
    queryFn: getCartData,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: deteteCartItem,
    onSuccess: (res) => {
      if (res) {
        queryClient.invalidateQueries({ queryKey: ["carts"] });
      }
    },
    onError: (error) => {
      console.error(error);
      toast.error("Xoá sản phẩm thất bại!");
    },
  });

  const { mutate: mutateQuantity } = useMutation({
    mutationFn: updateQuantity,
    onSuccess: (res) => {
      if (res) {
        queryClient.invalidateQueries({ queryKey: ["carts"] });
      }
    },
    onError: (error) => {
      console.error(error);
      toast.error("update quantity faile!");
    },
  });

  const handleQuantityChange = (productId, quantity) => {
    setCartItems((prevCartItems) =>
      prevCartItems.map((item) =>
        item._id === productId
          ? {
              ...item,
              quantity: quantity,
            }
          : item
      )
    );
  };

  return (
    <>
      {isLoading && <Spinner />}

      <div className="">
        <div className=" pt-1 pb-10 min-h-200">
          <div className="text-2xl mb-10 text-center ">
            <Title text1={"GIỎ "} text2={"HÀNG"} />
          </div>
          {cartItems.length > 0 ? (
            <div className=" mx-auto  max-w-5xl justify-center px-15 lg:px-6 lg:flex  md:space-x-6 xl:px-0">
              <div className="rounded-lg lg:w-2/3">
                {cartItems.map((item, index) => (
                  <div
                    key={index}
                    className="justify-between mb-6 rounded-lg bg-gray-50 border border-gray-200 p-6 shadow sm:flex sm:justify-start"
                  >
                    <img
                      src={
                        item.product.images && item.product.images[0].url
                          ? item.product.images[0].url
                          : "/placeholder.jpg"
                      }
                      alt="product-image"
                      className="w-50 h-20 overflow-hidden rounded-lg sm:w-30"
                    />
                    <p className="absolute text-sm text-gray-600">
                      {item.product.barcode}
                    </p>
                    <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between relative">
                      <div className="mt-5 sm:mt-0">
                        <h2 className="text-lg font-bold text-gray-900">
                          {item.product.name}
                        </h2>
                        <p className="mt-1 text-black">
                          {item.product.price} {currency}
                        </p>

                        <div className="absolute right-[50%] bottom-0">
                          <div className="flex items-center border-gray-100">
                            <span
                              onClick={() => {
                                if (item.quantity > 1) {
                                  mutateQuantity({
                                    productId: item._id,
                                    quantity: item.quantity - 1,
                                  });

                                  handleQuantityChange(
                                    item._id,
                                    item.quantity - 1
                                  );
                                }
                              }}
                              className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
                            >
                              {" "}
                              -{" "}
                            </span>
                            <input
                              className="h-8 w-8 border bg-white text-center text-xs outline-none"
                              type="number"
                              value={item.quantity}
                              min="1"
                              readOnly
                            />
                            <span
                              onClick={() => {
                                if (item.quantity < item.product.stock) {
                                  mutateQuantity({
                                    productId: item._id,
                                    quantity: item.quantity + 1,
                                  });
                                  handleQuantityChange(
                                    item._id,
                                    item.quantity + 1
                                  );
                                }
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
                        <div
                          onClick={() => mutate(item.product._id)}
                          className="flex items-center space-x-4 hover:bg-gray-500 rounded-full"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="24px"
                            viewBox="0 -960 960 960"
                            width="24px"
                            fill="#000000"
                          >
                            <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                          </svg>
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
            <div className="flex h-screen flex-col items-center justify-center py-10 text-gray-500">
              <div className="text-6xl mb-4">🛒</div>
              <h3 className="text-2xl font-semibold mb-2">
                Your cart is empty
              </h3>
              <p className="text-gray-400 mb-6">
                Add some products to get started
              </p>
              <Link
                to={"/products"}
                className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
