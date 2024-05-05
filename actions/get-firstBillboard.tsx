import { Billboard } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/billboards`;

const getFirstBillboard = async (): Promise<Billboard> => {
  const res = await fetch(`${URL}`);

  const billboards = await res.json();
  return billboards[0]; // Assuming the API returns an array sorted by creation date
};

export default getFirstBillboard;
