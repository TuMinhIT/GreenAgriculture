import { useState } from "react";

const ProductDetail = ({ setShowDetail, product }) => {
  const [idx, setIdx] = useState(0);
  const [quatity, setQuatity] = useState(1);
  return (
    <>
      {product && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl relative p-6">
            <button
              onClick={() => setShowDetail(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            <p className="absolute top-0 left-1 text-sm text-gray-500 my-2">
              Mã sản phẩm:{" "}
              <span className="text-blue-600">
                {product.barcode || "Đang cập nhật"}
              </span>
            </p>

            <div className=" grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className=" flex flex-col items-center">
                <img
                  src={product.images[idx].url}
                  alt={product.name}
                  className="w-40 h-40 object-contain mb-4"
                />
                {/* Thumbnail list */}
                <div className="flex space-x-2">
                  {product.images.map((thumb, idx) => (
                    <img
                      key={idx}
                      onClick={() => setIdx(idx)}
                      src={thumb.url}
                      alt="thumb"
                      className="w-16 h-16 border rounded-lg object-contain cursor-pointer hover:border-green-500"
                    />
                  ))}
                </div>
              </div>

              {/* Cột phải - thông tin sản phẩm */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  {product.name}
                </h2>
                <p className="py-3 text-gray-600 text-sm">
                  {product.description}
                </p>

                <p className="text-red-600 text-xl font-bold">
                  {product.price.toLocaleString()}₫
                </p>

                {/* Bộ chọn số lượng */}
                <div className="my-2 flex items-center mb-4 ">
                  <button
                    onClick={() => {
                      if (quatity > 1) setQuatity(quatity - 1);
                    }}
                    className="px-2 border border-gray-400 rounded hover:bg-gray-400"
                  >
                    -
                  </button>
                  <span className="px-4 bg-gray-200">{quatity}</span>
                  <button
                    onClick={() => setQuatity(quatity + 1)}
                    className="px-2 border border-gray-400 rounded hover:bg-gray-400"
                  >
                    +
                  </button>
                </div>

                {/* Nút thêm vào giỏ */}
                <button className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold">
                  Thêm vào giỏ
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetail;
