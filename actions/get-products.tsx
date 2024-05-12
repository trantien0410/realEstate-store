import { Product } from "@/types";
import qs from "query-string";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

export interface Query {
  billboardId?: string;
  categoryId?: string;
  amenitiesId?: string;
  sizeId?: string;
  isFeatured?: boolean;
  minPrice?: number;
  maxPrice?: number;
  limit?: number; // Number of products to fetch
  offset?: number; // Offset for pagination
}

const getProducts = async (query: Query): Promise<Product[]> => {
  const url = qs.stringifyUrl({
    url: URL,
    query: {
      amenitiesId: query.amenitiesId,
      sizeId: query.sizeId,
      billboardId: query.billboardId,
      categoryId: query.categoryId,
      isFeatured: query.isFeatured,
      minPrice: query.minPrice,
      maxPrice: query.maxPrice,
      limit: query.limit,
      offset: query.offset,
    },
  });

  const res = await fetch(url);
  return res.json();
};

export default getProducts;
