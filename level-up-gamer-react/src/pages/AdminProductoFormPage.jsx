// src/admin/pages/AdminProductosPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function AdminProductosPage({ productos, eliminarProducto }) {
  
  const handleEliminar = (id) => {
    if (window.confirm('¿Seguro que deseas eliminar este producto?')) {
      eliminarProducto(id);
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Gestión de Productos</h2>
        <Link to="/admin/productos/nuevo" className="btn btn-primary">
          <i className="fas fa-plus me-2"></i>Añadir Producto
        </Link>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>Imagen</th>
                  <th>Nombre</th>
                  <th>Categoría</th>
                  <th>Precio</th>
                  <th>Stock</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {productos.map(p => (
                  <tr key={p.id}>
                    <td>{p.id}</td>
                    <td>
                      <img src={p.imagen.startsWith('http') ? p.imagen : `/${p.imagen}`} alt="mini" width="40" onError={(e) => e.target.src='https://via.placeholder.com/40'} />
                    </td>
                    <td>{p.nombre}</td>
                    <td>{p.categoria}</td>
                    <td>${p.precio.toLocaleString('es-CL')}</td>
                    <td className={p.stock < 5 ? 'text-danger fw-bold' : ''}>{p.stock}</td>
                    <td>
                      <Link to={`/admin/productos/editar/${p.id}`} className="btn btn-sm btn-warning me-2"><i className="fas fa-edit"></i></Link>
                      <button onClick={() => handleEliminar(p.id)} className="btn btn-sm btn-danger"><i className="fas fa-trash"></i></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminProductosPage;