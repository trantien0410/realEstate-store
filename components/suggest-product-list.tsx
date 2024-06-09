"use client";
import { Product } from "@/types";
import NoResults from "./ui/no-results";
import ProductCard from "./ui/product-card";
import { useState } from "react";

interface SuggestProductListProps {
  title: string;
  items: Product[];
}

const SuggestProductList: React.FC<SuggestProductListProps> = ({
  title,
  items,
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 4;

  const onPageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const paginatedProducts = items.slice(
    currentPage * productsPerPage,
    (currentPage + 1) * productsPerPage
  );
  return (
    <div className="space-y-4">
      <h3 className="font-bold text-3xl">{title}</h3>
      {items.length === 0 && <NoResults />}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {paginatedProducts.map((item) => (
          <ProductCard key={item.id} data={item} />
        ))}
      </div>
      <div>
        {items.length > productsPerPage && (
          <div className="flex justify-end space-x-2 py-4">
            <button
              className=" relative
              disabled:opacity-70
                        disabled:cursor-not-allowed
                        rounded-lg
                        hover:opacity-80
                        transition
                        bg-white
                        text-black
                        py-3
                        text-md
                        font-semibold"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 0}
            >
              Trước
            </button>
            <button
              className=" relative
                        disabled:opacity-70
                        disabled:cursor-not-allowed
                        rounded-lg
                        hover:opacity-80
                        transition
                        bg-white
                        text-black
                        py-3
                        text-md
                        font-semibold"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={(currentPage + 1) * productsPerPage >= items.length}
            >
              Sau
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SuggestProductList;
