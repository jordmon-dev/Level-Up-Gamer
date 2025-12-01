import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use(
  (config) => {
    const usuario = JSON.parse(localStorage.getItem('usuarioLogueado'));
    if (usuario && usuario.token) {
      config.headers['Authorization'] = `Bearer ${usuario.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;