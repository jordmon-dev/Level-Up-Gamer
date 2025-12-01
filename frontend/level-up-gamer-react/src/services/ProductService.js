// src/services/ProductService.js
import api from './api';

const PRODUCTOS_URL = '/api/v1/productos';


// Listar todos los productos
export const getProducts = () => {
  return api.get(PRODUCTOS_URL);
};

// Obtener un producto por ID (para edición)
export const getProductById = (id) => {
  return api.get(`${PRODUCTOS_URL}/${id}`);
};

// Crear un nuevo producto
export const createProduct = (producto) => {
  return api.post(PRODUCTOS_URL, producto);
};

// Actualizar un producto existente
export const updateProduct = (id, producto) => {
  return api.put(`${PRODUCTOS_URL}/${id}`, producto);
};

// Eliminar un producto
export const deleteProduct = (id) => {
  return api.delete(`${PRODUCTOS_URL}/${id}`);
};
