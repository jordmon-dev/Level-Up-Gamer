// src/admin/pages/AdminProductosPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { productos } from '../../data'; // Importamos los productos desde src/data.js

function AdminProductosPage() {
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Gestión de Productos</h2>
        {/* Enlace para añadir nuevo producto (lo haremos después) */}
        <Link to="/admin/productos/nuevo" className="btn btn-primary">
          <i className="fas fa-plus me-2"></i>Añadir Producto
        </Link>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
          <table className="table table-hover table-striped"> {/* Clases de Bootstrap para tabla */}
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Código</th>
                <th>Nombre</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {/* Mapeamos los productos para crear las filas */}
              {productos.map(producto => (
                <tr key={producto.id}>
                  <td>{producto.id}</td>
                  <td>{producto.codigo || 'N/A'}</td>
                  <td>{producto.nombre}</td>
                  <td>{producto.categoria}</td>
                  <td>${producto.precio.toLocaleString('es-CL')}</td>
                  <td className={producto.stock <= 5 ? 'text-danger fw-bold' : ''}> {/* Resaltar stock bajo */}
                    {producto.stock !== undefined ? producto.stock : 'N/A'}
                  </td>
                  <td>
                    {/* Enlaces para editar/eliminar (los haremos después) */}
                    <Link 
                      to={`/admin/productos/editar/${producto.id}`} 
                      className="btn btn-sm btn-outline-warning me-2"
                      title="Editar"
                    >
                      <i className="fas fa-edit"></i>
                    </Link>
                    <button 
                      className="btn btn-sm btn-outline-danger" 
                      title="Eliminar"
                      // onClick={() => handleEliminar(producto.id)} // Añadiremos esta función luego
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {productos.length === 0 && (
            <div className="card-footer text-center text-muted">
                No hay productos para mostrar.
            </div>
        )}
      </div>
    </div>
  );
}

export default AdminProductosPage;