import { Size } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/sizes`;

const formattedSizes = async (): Promise<
  { label: string; value: string }[]
> => {
  const res = await fetch(URL);
  const sizes: Size[] = await res.json();
  return sizes.map((size) => ({
    label: size.name,
    value: size.id,
  }));
};

const useSize = () => {
  const getAll = async () => {
    return await formattedSizes();
  };

  const getByValueSize = async (value: string) => {
    const sizes = await formattedSizes();
    return sizes.find((size) => size.value === value);
  };

  return {
    getAll,
    getByValueSize,
  };
};

export default useSize;
