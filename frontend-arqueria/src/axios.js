import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://backed-mongo.onrender.com', // Nueva URL base de la API
  headers: {
    'Content-Type': 'application/json',
  }
});

// Agrega un interceptor para agregar el token de autenticación a cada solicitud
instance.interceptors.request.use(config => {
  const token = localStorage.getItem('token'); // Asume que el token está almacenado en localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export default instance;
