// src/pages/CompraExitosaPage.jsx
import React, { useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';

function CompraExitosaPage() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Recibimos los datos enviados desde CheckoutPage
  const { state } = location;

  // Si alguien intenta entrar directo sin comprar, lo mandamos al inicio
  useEffect(() => {
    if (!state) {
      navigate('/');
    }
  }, [state, navigate]);

  if (!state) return null; // Evita renderizar si no hay datos

  const { orden, comprador, items, total, fecha } = state;

  return (
    <div className="container mt-5 mb-5">
      <div className="card shadow-lg border-0">
        <div className="card-header bg-success text-white text-center py-4">
          <i className="fas fa-check-circle fa-4x mb-3"></i>
          <h2 className="mb-0">¡Compra Realizada con Éxito!</h2>
          <p className="lead mt-2">Nro. de Orden: #{orden}</p>
        </div>
        
        <div className="card-body p-5">
          <div className="row mb-4">
            <div className="col-md-6">
              <h5 className="text-primary">Detalles del Comprador</h5>
              <hr />
              <p><strong>Nombre:</strong> {comprador.nombre} {comprador.apellido}</p>
              <p><strong>Email:</strong> {comprador.email}</p>
              <p><strong>Fecha:</strong> {fecha}</p>
            </div>
            <div className="col-md-6">
              <h5 className="text-primary">Dirección de Envío</h5>
              <hr />
              <p><strong>Calle:</strong> {comprador.direccion}</p>
              <p><strong>Comuna:</strong> {comprador.comuna}</p>
              <p><strong>Región:</strong> {comprador.region}</p>
            </div>
          </div>

          <h5 className="text-primary mt-4">Resumen del Pedido</h5>
          <div className="table-responsive mt-3">
            <table className="table table-hover">
              <thead className="table-light">
                <tr>
                  <th>Producto</th>
                  <th className="text-center">Precio</th>
                  <th className="text-center">Cantidad</th>
                  <th className="text-end">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <div className="d-flex align-items-center">
                        <img 
                          src={item.imagen.startsWith('http') ? item.imagen : `/${item.imagen}`} 
                          alt={item.nombre} 
                          style={{ width: '50px', height: '50px', objectFit: 'cover', marginRight: '15px' }}
                          className="rounded"
                          onError={(e) => e.target.src = 'https://via.placeholder.com/50'}
                        />
                        <span>{item.nombre}</span>
                      </div>
                    </td>
                    <td className="text-center">${item.precio.toLocaleString('es-CL')}</td>
                    <td className="text-center">{item.cantidad || 1}</td>
                    <td className="text-end">${(item.precio * (item.cantidad || 1)).toLocaleString('es-CL')}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="table-light">
                <tr>
                  <td colSpan="3" className="text-end fw-bold fs-5">Total Pagado:</td>
                  <td className="text-end fw-bold fs-5 text-success">${total.toLocaleString('es-CL')} CLP</td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div className="text-center mt-5">
            <p className="text-muted mb-4">Hemos enviado un correo de confirmación a {comprador.email}</p>
            <Link to="/" className="btn btn-primary btn-lg">
              <i className="fas fa-home me-2"></i>Volver al Inicio
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompraExitosaPage;