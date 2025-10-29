// src/admin/components/AdminLayout.jsx
import React from 'react';
import { Link, Outlet } from 'react-router-dom'; // Outlet es donde se renderizarán las sub-rutas
import './AdminLayout.css'; // Importamos el CSS

function AdminLayout() {
  return (
    <div className="admin-layout">
      {/* Menú Lateral Fijo */}
      <nav className="admin-sidebar">
        <h3 className="text-center text-white my-3">Admin Panel</h3>
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link className="nav-link" to="/admin/dashboard">
              <i className="fas fa-tachometer-alt me-2"></i>Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/admin/productos">
              <i className="fas fa-box me-2"></i>Productos
            </Link>
          </li>
          <li className="nav-item">
            {/* Cambiaremos este enlace cuando creemos la página */}
            <Link className="nav-link" to="/admin/ordenes"> 
              <i className="fas fa-file-invoice me-2"></i>Órdenes
            </Link>
          </li>
          <li className="nav-item">
             {/* Cambiaremos este enlace cuando creemos la página */}
            <Link className="nav-link" to="/admin/usuarios">
              <i className="fas fa-users me-2"></i>Usuarios
            </Link>
          </li>
          <li className="nav-item">
             {/* Cambiaremos este enlace cuando creemos la página */}
            <Link className="nav-link" to="/admin/categorias">
              <i className="fas fa-tags me-2"></i>Categorías
            </Link>
          </li>
          <hr className="text-white" />
          <li className="nav-item">
            <Link className="nav-link text-warning" to="/">
              <i className="fas fa-arrow-left me-2"></i>Volver a la Tienda
            </Link>
          </li>
        </ul>
      </nav>

      {/* Área de Contenido Principal */}
      <main className="admin-main-content">
        {/* Aquí se renderizará el contenido de cada sub-ruta */}
        <Outlet /> 
      </main>
    </div>
  );
}

export default AdminLayout;