// src/admin/components/AdminLayout.jsx
import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./AdminLayout.css";

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
              <i className="fas fa-boxes me-2"></i>Productos
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/admin/ordenes">
              <i className="fas fa-shopping-bag me-2"></i>Órdenes
            </Link>
          </li>

          <li className="nav-item mt-3">
            <Link className="nav-link" to="/">
              <i className="fas fa-arrow-left me-2"></i>Volver a tienda
            </Link>
          </li>
        </ul>
      </nav>

      <main className="admin-main-content">
        {/* Aquí se pintan las páginas hijas: dashboard, productos, etc. */}
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
