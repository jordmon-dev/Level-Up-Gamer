// src/components/ProtectedRoute.jsx
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({ roles }) {
  // Leemos el usuario desde localStorage (como ya hace tu app)
  const usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado"));

  // Si no hay usuario → redirigir a login
  if (!usuarioLogueado) {
    return <Navigate to="/login" replace />;
  }

  // Si se pasan roles y el usuario NO tiene uno de esos → fuera
  if (roles && roles.length > 0 && !roles.includes(usuarioLogueado.rol)) {
    return <Navigate to="/" replace />;
  }

  // Si todo OK → dejamos pasar a las rutas hijas (<Route ... element={<ProtectedRoute ...>} />)
  return <Outlet />;
}
