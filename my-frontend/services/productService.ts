import axios from "axios";

import { Product } from "../types/Products";
import { Productt } from "../types/Product";

const API_URL = "http://localhost:8000/api/products";

export const getProducts = async (): Promise<Product[]> => {
    try {
        const response = await axios.get<Product[]>(API_URL);
        return response.data;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
};

export const getProductsBySupplier = async (supplierId: string): Promise<Product[]> => {
    try {
      const response = await axios.get<Product[]>(`${API_URL}/supplier/${supplierId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching supplier products:", error);
      throw error;
    }
  };
  

export const getProductById = async (id: string): Promise<Product> => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching product:", error);
        throw error;
    }
};

export const createProduct = async (product: Productt): Promise<Product> => {
    try {
        const response = await axios.post<Product>(API_URL, product);
        return response.data;
    } catch (error) {
        console.error("Error creating product:", error);
        throw error;
    }
}

export const searchProducts = async (query: string): Promise<Product[]> => {
    const response = await axios.get(`${API_URL}/search`, {
      params: { query },
    });
    return response.data;
  };

  export const updateProduct = async (id: string, product: Productt): Promise<Product> => {
    try {
        const response = await axios.put<Product>(`${API_URL}/${id}`, product);
        return response.data;
    } catch (error) {
        console.error("Error updating product:", error);
        throw error;
    }
};

export const deleteProduct = async (id: string): Promise<void> => {
    try {
        await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
        console.error("Error deleting product:", error);
        throw error;
    }
}