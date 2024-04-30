import { Amenities } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/amenities`;

const getAmenities = async (): Promise<Amenities[]> => {
  const res = await fetch(URL);

  return res.json();
};

export default getAmenities;
