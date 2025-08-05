import axios from 'axios';

const api = axios.create({
  // local
  // baseURL: 'http://127.0.0.1:3000'

  // prod
  baseURL: 'https://avdg-backend-production.up.railway.app/users/sign_in'
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
