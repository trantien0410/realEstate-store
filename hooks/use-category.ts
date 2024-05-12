import { Category } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/categories`;

const formattedCategories = async (): Promise<
  { label: string; value: string }[]
> => {
  const res = await fetch(URL);
  const categories: Category[] = await res.json();
  return categories.map((category) => ({
    label: category.name,
    value: category.id,
  }));
};

const useCategory = () => {
  const getAll = async () => {
    return await formattedCategories();
  };

  const getByValue = async (value: string) => {
    const categories = await formattedCategories();
    return categories.find((category) => category.value === value);
  };

  return {
    getAll,
    getByValue,
  };
};

export default useCategory;
