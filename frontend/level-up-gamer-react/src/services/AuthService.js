import api from "./api";

const AUTH_API = "/api/v1/auth";

export const loginUser = (credenciales) => {
  return api.post(`${AUTH_API}/login`, credenciales);
};

export const registerUser = (datosRegistro) => {
  return api.post(`${AUTH_API}/register`, datosRegistro);
};
