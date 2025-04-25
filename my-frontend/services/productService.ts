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
