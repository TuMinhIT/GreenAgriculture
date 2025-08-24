import { useContext } from "react";
import ActionButton from "./ActionButton";
import { ShopContext } from "../../context/ShopContext";

const ProductLine = ({ product }) => {
  const { currency } = useContext(ShopContext);
  return (
    <>
      {product && (
        <div className="px-2 mx-3 bg-white border border-gray-500 rounded-xl  w-full  hover:shadow-lg hover:border-green-500 transition-all duration-200 mb-3">
          <div className="grid grid-cols-12 gap-4 items-center px-4 py-3">
            {/* Image */}
            <div className="col-span-1 flex justify-center">
              <div className="w-14 h-14 rounded-xl overflow-hidden border bg-gray-50 flex items-center justify-center">
                <img
                  src={product.images[0].url}
                  alt=""
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
            {/* Name & Code */}
            <div className="col-span-2 min-w-0">
              <div className="font-semibold text-gray-900 truncate">
                {product.name}
              </div>
              <div className="text-xs text-gray-500">
                Code: <span className="font-mono">{product.barcode}</span>
              </div>
            </div>
            {/* Category & Brand */}
            <div className="col-span-2 min-w-0">
              <div className="text-sm text-gray-700 font-medium truncate">
                {product.category.name}
              </div>
              <div className="text-xs text-gray-500">
                Thương hiệu: {product.brand.name}
              </div>
            </div>
            {/* Price & Cost */}
            <div className="col-span-2">
              <div className="text-sm text-green-700 font-bold">
                Giá bán:{" "}
                <span className="font-mono">
                  {product.price}
                  {currency}
                </span>
              </div>
              <div className="text-xs text-gray-500">
                Giá gốc:{" "}
                <span className="font-mono">
                  {product.cost}
                  {currency}
                </span>
              </div>
            </div>
            {/* Stock & Warranty */}
            <div className="col-span-1">
              <div className="text-sm font-medium text-gray-900">
                Tồn kho: <span className="font-mono">{product.stock}</span>
              </div>
              <div className="text-xs text-gray-500">
                Bảo hành: {product.warrantyMonths}m
              </div>
            </div>
            {/* Bestseller & CreatedAt */}
            <div className="col-span-2 flex flex-col gap-1">
              {product.bestseller && (
                <label className="flex items-center gap-2 text-xs font-medium">
                  <input
                    type="checkbox"
                    checked={product.bestseller}
                    readOnly
                    className="w-4 h-4 bg-amber-150 "
                  />
                  Bán chạy
                </label>
              )}

              <div className="text-xs text-gray-500">
                Tạo ngày:{" "}
                {new Date(product.createdAt).toLocaleDateString("vi-VN")}
              </div>
            </div>
            {/* Actions */}
            <div className="col-span-2 flex justify-end">
              <ActionButton product={product} />
            </div>
          </div>
          <div className=" text-left overflow-x-auto bg-white p-3 rounded-b-xl border-t border-gray-300  transition-all duration-200">
            <div className="text-sm text-green-700 leading-relaxed">
              {product.description}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductLine;
