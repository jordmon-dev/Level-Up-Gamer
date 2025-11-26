import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ usuario, soloAdmin = false }) => {
  // 1. Si no hay usuario logueado, mandar al login
  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  // 2. Si la ruta es solo para admin y el usuario NO es admin
  // (Asumimos que el backend devuelve un rol, o validamos por email por ahora si no tienes roles configurados)
  if (soloAdmin && usuario.rol !== 'ADMIN') {
    // Ojo: Asegúrate de que tu backend esté devolviendo el campo "rol" en el login.
    // Si no, puedes usar una validación temporal: usuario.email !== 'admin@duoc.cl'
    alert("Acceso denegado: Se requieren permisos de administrador.");
    return <Navigate to="/" replace />;
  }

  // 3. Si pasa las validaciones, mostrar el contenido
  return <Outlet />;
};

export default ProtectedRoute;