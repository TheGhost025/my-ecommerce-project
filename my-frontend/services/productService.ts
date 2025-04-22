import axios from "axios";

import { Product } from "../types/Products";

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