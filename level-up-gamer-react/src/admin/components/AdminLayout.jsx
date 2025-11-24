// src/admin/components/AdminLayout.jsx
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './AdminLayout.css';

function AdminLayout() {
  return (
    <div className="admin-layout">
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
          {/* ENLACE NUEVO AGREGADO AQUÍ ABAJO */}
          <li className="nav-item">
            <Link className="nav-link" to="/admin/ordenes">
              <i className="fas fa-file-invoice me-2"></i>Órdenes
            </Link>
          </li>
          {/* -------------------------------- */}
          <li className="nav-item">
            <Link className="nav-link" to="/admin/categorias">
              <i className="fas fa-tags me-2"></i>Categorías
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/admin/usuarios">
              <i className="fas fa-users me-2"></i>Usuarios
            </Link>
          </li>
          <hr className="text-white" />
          <li className="nav-item">
            <Link className="nav-link text-warning" to="/">
              <i className="fas fa-arrow-left me-2"></i>Volver a Tienda
            </Link>
          </li>
        </ul>
      </nav>

      <main className="admin-main-content">
        <Outlet /> 
      </main>
    </div>
  );
}

export default AdminLayout;q
