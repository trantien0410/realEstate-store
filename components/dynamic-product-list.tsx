"use client";
import { useCallback, useEffect, useState } from "react";
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

  const loadProducts = useCallback(async () => {
    if (allLoaded) return; // Stop loading if all products are loaded

    setLoading(true);
    const newProducts = await getProducts({ ...searchParams, limit, offset });
    if (newProducts.length < limit) {
      setAllLoaded(true); // Set allLoaded to true if fewer products than the limit are returned
    }
    setProducts((prev) => [...prev, ...newProducts]);
    setOffset((prev) => prev + limit);
    setLoading(false);
  }, [allLoaded, searchParams, limit, offset]); // Dependencies

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const fetchedProducts = await getProducts({
        ...searchParams,
        limit,
        offset: 0,
      });
      setProducts(fetchedProducts);
      setOffset(fetchedProducts.length);
      setAllLoaded(fetchedProducts.length < limit);
      setLoading(false);
    };

    fetchData();
  }, [searchParams]); // Ensure this only includes searchParams to react to changes in search conditions

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        loadProducts();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadProducts]); // Ensure this effect is correctly set up to handle infinite scrolling

  return (
    <>
      <ProductList title="Sản phẩm nổi bật" items={products} />
      {loading ? <Loader /> : null}
    </>
  );
};

export default DynamicProductList;
