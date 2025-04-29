import axios from 'axios';
import { User } from '@/types/User';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = "http://localhost:8000/api/auth";

export const login = async (email: string, password: string): Promise<User> => {
  const response = await axios.post(`${API_URL}/login`, { email, password });

  await AsyncStorage.setItem('userId', JSON.stringify(response.data.userId));
  await AsyncStorage.setItem('token', response.data.token);

  return {
    ...response.data,
    email,
    token: response.data.token,
    role: response.data.role,
    _id: response.data.userId,
    name: response.data.name,
  };
};

export const signup = async (name: string, email: string, password: string, role: 'customer' | 'supplier'): Promise<User> => {
  const response = await axios.post(`${API_URL}/signup`, { name, email, password, role });
  return response.data;
};