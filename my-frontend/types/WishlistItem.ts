export interface Product {
  _id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  category: string;
  stock: number;
  supplier: string;
  createdAt: string;
  updatedAt: string;
}

export interface WishlistItem {
  _id: string;
  userId: string;
  products: Product[];
}
