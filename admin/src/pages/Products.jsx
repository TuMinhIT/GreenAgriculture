import { useEffect, useState } from "react";
import AddProduct from "../components/products/AddProduct";
import { ProductsService } from "../service/productsService";

import ProductLine from "../components/products/ProductLine";
import EmptyState from "../components/EmptyState";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/Spinner";
import Search from "../components/Search";

const Products = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [search, setSearch] = useState("");
  const { getAllProducts } = ProductsService();
  const [searchResult, setSearchResult] = useState([]);
  const { data: products, isLoading } = useQuery({
    queryKey: ["Products"],
    queryFn: getAllProducts,
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    handleSearch();
  }, [search, products]);

  const handleSearch = () => {
    if (products) {
      const filteredProducts = products.filter(
        (product) =>
          product.barcode
            .toLocaleLowerCase()
            .includes(search.toLocaleLowerCase()) ||
          product.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      );
      setSearchResult(filteredProducts);
    } else setSearchResult(products);
  };

  return (
    <>
      {showAddModal && <AddProduct setShowAddModal={setShowAddModal} />}
      <div className="bg-white rounded-xl shadow-sm border ">
        <div className="p-6 border-b flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">Products</h3>
          {isLoading && <Spinner />}

          <Search
            search={search}
            setSearch={setSearch}
            handleSearch={handleSearch}
          />

          <button
            onClick={() => {
              setShowAddModal(true);
            }}
            className="bg-gray-100 text-black px-4 py-2 border border-gray-500 rounded-lg hover:bg-gray-200 transition-colors"
          >
            + New
          </button>
        </div>
        {searchResult && searchResult.length > 0 && (
          <div className="overflow-scroll min-h-200">
            {searchResult.map((product) => (
              <ProductLine key={product._id} product={product} />
            ))}
          </div>
        )}
        {(!searchResult || searchResult.length === 0) && (
          <EmptyState message="No products" />
        )}
      </div>
    </>
  );
};

export default Products;
