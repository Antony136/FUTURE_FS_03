import axios from 'axios';

// Get the base backend URL (strip /api from VITE_API_URL if present for uploads)
const rawBaseUrl = import.meta.env.VITE_API_URL || '';
export const BACKEND_URL = rawBaseUrl.endsWith('/api') 
  ? rawBaseUrl.slice(0, -4) 
  : (rawBaseUrl || 'http://localhost:5000');

// Ensure baseURL ends with /api if provided
let baseURL = import.meta.env.VITE_API_URL || '/api';
if (baseURL.startsWith('http') && !baseURL.endsWith('/api')) {
  baseURL = baseURL.endsWith('/') ? `${baseURL}api` : `${baseURL}/api`;
}

const api = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
});

// Request interceptor — attach JWT token if present
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('ss_token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor — handle 401 globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('ss_token');
      localStorage.removeItem('ss_user');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

export default api;
