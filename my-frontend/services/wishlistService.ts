import axios from "axios";
import { WishlistItem } from "@/types/WishlistItem"; // define this type in your types folder

const API_URL = "http://localhost:8000/api/wishlist";

// Add product to wishlist
export const addToWishlist = async (data: { userId: string; productId: string }): Promise<{message: string}> => {
  const response = await axios.post(`${API_URL}/add`, data);
  return response.data;
};

// Remove product from wishlist
export const removeFromWishlist = async (data: { userId: string; productId: string }): Promise<{ message: string }> => {
  const response = await axios.post(`${API_URL}/remove`, data);
  return response.data;
};

// Get all wishlist items for a user
export const getWishlistByUser = async (userId: string): Promise<WishlistItem[]> => {
  const response = await axios.get<WishlistItem[]>(`${API_URL}/${userId}`);
  return response.data;
};

export const isWhishlisted = async (userId: string, productId: string): Promise<boolean> => {
  const response = await axios.get(`${API_URL}/isWhishlist?userId=${userId}&productId=${productId}`);
  return response.data;
}
