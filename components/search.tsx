"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { BiSearch } from "react-icons/bi";
import useSearchModal from "@/hooks/use-search-modal";
import useCategory from "@/hooks/use-category";
import useSize from "@/hooks/use-size";

const Search = () => {
  const searchModal = useSearchModal();
  const params = useSearchParams();
  const { getByValue } = useCategory();
  const { getByValueSize } = useSize();

  const categoryId = params?.get("categoryId");
  const sizeId = params?.get("sizeId");
  const minPrice = params?.get("minPrice");
  const maxPrice = params?.get("maxPrice");

  const [categoryLabel, setCategoryLabel] = useState("Loại Nhà Đất");
  const [sizeLabel, setSizeLabel] = useState("Kích Thước");

  useEffect(() => {
    if (categoryId) {
      getByValue(categoryId).then((category) => {
        if (category) {
          setCategoryLabel(category.label);
        }
      });
    } else {
      setCategoryLabel("Loại Nhà Đất");
    }
  }, [categoryId, getByValue]);

  useEffect(() => {
    if (sizeId) {
      getByValueSize(sizeId).then((size) => {
        if (size) {
          setSizeLabel(size.label);
        }
      });
    } else {
      setSizeLabel("Kích Thước");
    }
  }, [sizeId, getByValueSize]);

  const priceLabel = useMemo(() => {
    if (minPrice && maxPrice) {
      return `${minPrice} - ${maxPrice}`;
    }
    return "Mức Giá";
  }, [minPrice, maxPrice]);

  return (
    <div
      onClick={() => searchModal.onOpen()}
      className="
        border-[1px]
        w-full
        md:w-auto
        py-1.5
        rounded-full
        bg-white
        drop-shadow
        hover:shadow-md
        hover:drop-shadow-0
        hover:transition
        hover:ease-in-out
        transition
        cursor-pointer
        lg:absolute
        lg:right-1
        lg: mr-4
        lg:-translate-x-1
        lg:transition-none
      "
    >
      <div
        className="
          flex 
          flex-row 
          items-center 
          justify-between
        "
      >
        <div
          className="
            text-sm
            font-bold
            px-6
            truncate
          "
        >
          {categoryLabel}
        </div>
        <div
          className="
            hidden
            sm:block
            text-sm
            font-bold
            px-6
            border-x-[2px]
            flex-1
            text-center
            truncate
          "
        >
          {sizeLabel}
        </div>
        <div
          className="
            text-sm 
            pl-6 
            pr-2 
            text-gray-600 
            flex 
            flex-row 
            items-center 
            gap-3
          "
        >
          <div className="hidden sm:block truncate">{priceLabel}</div>
          <div
            className="
              p-2 
              bg-rose-500 
              rounded-full 
              text-white
            "
          >
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
