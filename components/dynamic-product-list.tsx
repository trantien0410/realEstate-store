"use client";
import React, { useEffect, useState } from "react";
import getProducts, { Query } from "@/actions/get-products";
import ProductList from "@/components/product-list";
import Loader from "./loader";

interface DynamicProductListProps {
  initialProducts: any[];
  searchParams: Query;
}

const DynamicProductList: React.FC<DynamicProductListProps> = ({
  initialProducts,
  searchParams,
}) => {
  const [products, setProducts] = useState(initialProducts);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(initialProducts.length);
  const [allLoaded, setAllLoaded] = useState(initialProducts.length < 10); // Set based on initial load
  const limit = 10; // Number of products per load

  const loadProducts = async () => {
    if (allLoaded) return; // Stop loading if all products are loaded

    setLoading(true);
    const newProducts = await getProducts({ ...searchParams, limit, offset });
    if (newProducts.length < limit) {
      setAllLoaded(true); // Set allLoaded to true if fewer products than the limit are returned
    }
    setProducts((prev) => [...prev, ...newProducts]);
    setOffset((prev) => prev + limit);
    setLoading(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight
      )
        return;
      loadProducts();
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [offset, searchParams, allLoaded]); // Include allLoaded in dependencies

  return (
    <>
      <ProductList title="Sản phẩm nổi bật" items={products} />
      {loading ? <Loader /> : null}
    </>
  );
};

export default DynamicProductList;
