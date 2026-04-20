import axios from 'axios';
import { ENDPOINTS } from './api-config';

export const ADMIN_TOKEN_KEY = 'portfolio_admin_token';
export const ADMIN_USER_KEY = 'portfolio_admin_user';

export const adminApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

adminApi.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem(ADMIN_TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export const loginAdmin = async (email, password) => {
  const response = await axios.post(ENDPOINTS.AUTH_LOGIN, { email, password });
  return response.data;
};

export const saveAdminSession = (payload) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(ADMIN_TOKEN_KEY, payload.access_token);
  localStorage.setItem(ADMIN_USER_KEY, JSON.stringify(payload.user));
};

export const clearAdminSession = () => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(ADMIN_TOKEN_KEY);
  localStorage.removeItem(ADMIN_USER_KEY);
};

export const getAdminUser = () => {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem(ADMIN_USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch (_err) {
    return null;
  }
};
