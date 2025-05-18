import { CartData } from "@/types/Cart";
import axios from "axios";

const API_URL = "http://localhost:8000/api/cart";

export const addToCart = async (userId: string, productId: string, quantity: number = 1): Promise<void> => {
  await axios.post(`${API_URL}/add`, { userId, productId, quamtity: quantity });
};

export const removeFromCart = async (userId: string, productId: string): Promise<void> => {
    await axios.post(`${API_URL}/remove`, { userId, productId });
}

export const getCart = async (userId: string): Promise<CartData> => {
  const response = await axios.get(`${API_URL}/${userId}`);
  return response.data;
}

export const updateCartQuantity = async (userId: string, productId: string, quantity: number) => {
  const response = await axios.post(`${API_URL}/update-quantity`, {
    userId,
    productId,
    quamtity: quantity,
  });
  return response.data;
};
