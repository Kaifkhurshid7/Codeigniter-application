import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('internship_token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const authService = {
  register: (payload) => api.post('/register', payload),
  login: (payload) => api.post('/login', payload),
};

export const teacherService = {
  create: (payload) => api.post('/create-teacher', payload),
};

export const dataService = {
  getUsers: () => api.get('/users'),
  getTeachers: () => api.get('/teachers'),
};

export default api;
