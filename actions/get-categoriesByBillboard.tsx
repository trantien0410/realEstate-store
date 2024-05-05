import { Category } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/categories`;

const getCategoriesByBillboard = async (
  billboardId: string
): Promise<Category[]> => {
  const res = await fetch(`${URL}?billboardId=${billboardId}`);

  return res.json();
};

export default getCategoriesByBillboard;
