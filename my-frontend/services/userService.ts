import axios from 'axios';
import { User } from '@/types/User';

const API_URL = "http://localhost:8000/api/user";

export const getCustomerById = async (userId: string): Promise<User> => {
    const response = await axios.get(`${API_URL}/customer/${userId}`);
    return response.data;
};

export const getSupplierById = async (userId: string): Promise<User> => {
    const response = await axios.get(`${API_URL}/supplier/${userId}`);
    return response.data;
}