import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:3000', // ajuste para sua API
});

// adiciona o token automaticamente em todas as requisições
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
