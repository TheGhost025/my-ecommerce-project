import axios from "axios";
import { Order } from "@/types/Order";
import { Orders } from "@/types/Orders";

const API_URL = "http://localhost:8000/api/order";

export const createOrder = async (data: { customer: string }): Promise<Order> => {
    const response = await axios.post<Order>(`${API_URL}/create`, data);
    return response.data;
  };

export const getOrdersBySupplier = async (supplierId: string): Promise<Orders[]> => {
    const response = await axios.get<Orders[]>(`${API_URL}/supplier/${supplierId}`);
    return response.data;
}

export const getOrdersByCustomer = async (customerId: string): Promise<Orders[]> => {
    const response = await axios.get<Orders[]>(`${API_URL}/customer/${customerId}`);
    return response.data;
}