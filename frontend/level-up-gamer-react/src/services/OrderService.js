// src/services/OrderService.js
import api from './api';

const ORDENES_URL = '/api/v1/ordenes';

// Listar todas las órdenes (uso en Admin / App.jsx)
export const getOrders = () => {
  return api.get(ORDENES_URL);
};

// Crear una nueva orden (uso en CheckoutPage)
export const createOrder = (orden) => {
  return api.post(ORDENES_URL, orden);
};
