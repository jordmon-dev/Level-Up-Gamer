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
                  <th>Resumen</th>
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
                    <tr key={orden.id}> {/* Usamos id o numeroOrden como key */}
                      <td><strong>#{orden.numeroOrden}</strong></td>
                      <td>{orden.fecha}</td>
                      <td>
                        {orden.nombreCliente}
                        <br />
                        <small className="text-muted">{orden.emailCliente}</small>
                      </td>
                      <td className="fw-bold text-success">
                        ${orden.total.toLocaleString('es-CL')}
                      </td>
                      <td>
                        <span className="badge bg-success">Pagado</span>
                      </td>
                      <td>
                        {/* Botón informativo simple para evitar errores */}
                        <button 
                          className="btn btn-sm btn-secondary text-white"
                          onClick={() => alert(`Orden #${orden.numeroOrden}\nCliente: ${orden.nombreCliente}\nTotal: $${orden.total}`)}
                        >
                          <i className="fas fa-info-circle me-1"></i> Ver Info
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