// src/admin/pages/AdminOrdenesPage.jsx
import React from 'react';

function AdminOrdenesPage({ ordenes }) {
  return (
    <div className="container">
      <h2 className="mb-4">Historial de Órdenes</h2>
      
      <div className="card shadow-sm">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover table-bordered align-middle">
              <thead className="table-dark">
                <tr>
                  <th>N° Orden</th>
                  <th>Fecha</th>
                  <th>Cliente</th>
                  <th>Total</th>
                  <th>Estado</th>
                  <th>Detalles</th>
                </tr>
              </thead>
              <tbody>
                {ordenes.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center text-muted py-4">
                      No hay órdenes registradas aún.
                    </td>
                  </tr>
                ) : (
                  ordenes.map((orden) => (
                    <tr key={orden.orden}>
                      <td><strong>#{orden.orden}</strong></td>
                      <td>{orden.fecha}</td>
                      <td>
                        {orden.comprador.nombre} {orden.comprador.apellido}
                        <br />
                        <small className="text-muted">{orden.comprador.email}</small>
                      </td>
                      <td className="fw-bold text-success">
                        ${orden.total.toLocaleString('es-CL')}
                      </td>
                      <td>
                        <span className="badge bg-success">Pagado</span>
                      </td>
                      <td>
                        <button 
                          className="btn btn-sm btn-info text-white"
                          onClick={() => alert(`Productos:\n${orden.items.map(i => `- ${i.nombre} (x${i.cantidad || 1})`).join('\n')}`)}
                        >
                          <i className="fas fa-eye me-1"></i> Ver Items
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminOrdenesPage;