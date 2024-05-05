export interface Billboard {
  id: string;
  label: string;
  imageUrl?: string;
  videoUrl?: string;
  category: Category;
}

export interface Category {
  id: string;
  name: string;
  billboard: Billboard;
}

export interface Product {
  id: string;
  category: Category;
  billboard: Billboard;
  name: string;
  description: string;
  address: string;
  phoneContact: string;
  price: string;
  isFeatured: boolean;
  size: Size;
  amenities: Amenities;
  images: Image[];
  videos: Video[];
}

export interface Image {
  id: string;
  url: string;
}

export interface Video {
  id: string;
  url: string;
}

export interface Size {
  id: string;
  name: string;
  value: string;
}
export interface Amenities {
  id: string;
  roomName: string;
  roomValue: number;
  bathroomName: string;
  bathroomValue: number;
}
