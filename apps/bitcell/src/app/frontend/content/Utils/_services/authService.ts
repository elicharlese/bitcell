import { apiPost } from './apiService';

export const login = async (username: string, password: string) => {
  const response = await apiPost('auth/login', { username, password });
  return response.token;
};

export const register = async (username: string, password: string) => {
  const response = await apiPost('auth/register', { username, password });
  return response.token;
};