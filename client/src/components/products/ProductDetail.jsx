import { useState } from "react";

const ProductDetail = ({ showDetail, setShowDetail, product }) => {
  if (!showDetail) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl relative p-6">
        {/* Nút đóng */}
        <button
          onClick={() => setShowDetail(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Cột trái - ảnh sản phẩm */}
          <div className="flex flex-col items-center">
            <img
              src={product.image}
              alt={product.name}
              className="w-40 h-40 object-contain mb-4"
            />
            {/* Thumbnail list */}
            <div className="flex space-x-2">
              {product.thumbnails.map((thumb, idx) => (
                <img
                  key={idx}
                  src={thumb}
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
            <p className="text-sm text-gray-500 mb-2">
              Mã sản phẩm:{" "}
              <span className="text-blue-600">
                {product.code || "Đang cập nhật"}
              </span>
            </p>

            <p className="text-red-600 text-xl font-bold mb-4">
              {product.price.toLocaleString()}₫
            </p>

            {/* Bộ chọn số lượng */}
            <div className="flex items-center space-x-2 mb-4">
              <button className="px-3 py-1 border rounded">-</button>
              <span className="px-4">{1}</span>
              <button className="px-3 py-1 border rounded">+</button>
            </div>

            {/* Nút thêm vào giỏ */}
            <button className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold">
              Thêm vào giỏ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
