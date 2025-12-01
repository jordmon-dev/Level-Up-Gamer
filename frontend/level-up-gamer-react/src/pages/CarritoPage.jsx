// src/pages/CarritoPage.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { cuponesValidos } from '../data.js';

function CarritoPage() {
  const [carrito, setCarrito] = useState([]);
  const [codigoCupon, setCodigoCupon] = useState('');
  const [descuentoAplicado, setDescuentoAplicado] = useState(0);
  const [mensajeCupon, setMensajeCupon] = useState('');

  const navigate = useNavigate();

  // Carga inicial segura
  useEffect(() => {
    const carritoGuardado = JSON.parse(localStorage.getItem('carrito') || '[]');
    // Si tu lógica en App.jsx ya guarda cantidades, no necesitas reagrupar aquí.
    // Asumiremos que App.jsx guarda objetos con propiedad 'cantidad'.
    setCarrito(carritoGuardado);
  }, []);

  // Función para actualizar estado y localStorage
  const actualizarCarritoLocal = (nuevoCarrito) => {
    setCarrito(nuevoCarrito);
    localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
    // Disparar evento para que el Navbar se entere si es necesario (opcional si usas Context, pero útil aquí)
    window.location.reload(); // Forma bruta pero efectiva de actualizar el contador del navbar en App.jsx
  };

  const cambiarCantidad = (id, delta) => {
    const nuevoCarrito = carrito.map(item => {
      if (item.id === id) {
        return { ...item, cantidad: Math.max(1, (item.cantidad || 1) + delta) };
      }
      return item;
    });
    actualizarCarritoLocal(nuevoCarrito);
  };

  const eliminarProducto = (id) => {
    const nuevoCarrito = carrito.filter(item => item.id !== id);
    actualizarCarritoLocal(nuevoCarrito);
  };

  const aplicarCuponHandler = () => {
    const codigoUpper = codigoCupon.trim().toUpperCase();
    if (cuponesValidos[codigoUpper]) {
      setDescuentoAplicado(cuponesValidos[codigoUpper]);
      setMensajeCupon(`¡Cupón aplicado! ${cuponesValidos[codigoUpper]}% de descuento`);
    } else {
      setDescuentoAplicado(0);
      setMensajeCupon('Cupón inválido');
    }
  };

  const subtotal = carrito.reduce((total, item) => total + (item.precio * (item.cantidad || 1)), 0);
  const descuento = subtotal * (descuentoAplicado / 100);
  const envio = subtotal > 50000 ? 0 : 3000;
  const total = subtotal - descuento + envio;

  const procesarCompraHandler = () => {
    if (carrito.length === 0) return;
    const usuarioLogueado = localStorage.getItem('usuarioLogueado');
    if (!usuarioLogueado) {
      if(window.confirm('Debes iniciar sesión. ¿Ir al login?')) {
          navigate('/login');
      }
      return;
    }
    navigate('/checkout');
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Tu Carrito de Compras</h1>

      <div className="row">
        <div className="col-lg-8">
          <div className="card">
            <div className="card-body">
              {carrito.length === 0 ? (
                <div className="text-center py-5">
                  <i className="fas fa-shopping-cart fa-4x text-muted mb-3"></i>
                  <h4>Tu carrito está vacío</h4>
                  <Link to="/productos" className="btn btn-primary mt-3">Ver Productos</Link>
                </div>
              ) : (
                <div>
                  {carrito.map(producto => {
                    // BLINDAJE DE IMAGEN: Si no hay imagen, usa placeholder
                    let imgUrl = 'https://via.placeholder.com/100?text=No+Img';
                    if (producto.imagen && producto.imagen.length > 5) {
                        imgUrl = producto.imagen.startsWith('http') ? producto.imagen : `/${producto.imagen}`;
                    }

                    return (
                      <div key={producto.id}>
                        <div className="row align-items-center mb-4">
                          <div className="col-md-2">
                            <img 
                              src={imgUrl}
                              alt={producto.nombre} 
                              className="img-fluid rounded" 
                              style={{ maxHeight: '80px', objectFit: 'cover' }}
                              onError={(e) => e.target.src = 'https://via.placeholder.com/100?text=Error'}
                            />
                          </div>
                          <div className="col-md-4">
                            <h6 className="mb-1">{producto.nombre}</h6>
                            <small className="text-muted">{producto.categoria}</small>
                          </div>
                          <div className="col-md-2">
                            <span className="fw-bold">${producto.precio.toLocaleString('es-CL')}</span>
                          </div>
                          <div className="col-md-2">
                            <div className="input-group input-group-sm">
                              <button className="btn btn-outline-secondary" onClick={() => cambiarCantidad(producto.id, -1)}>-</button>
                              <span className="form-control text-center">{producto.cantidad || 1}</span>
                              <button className="btn btn-outline-secondary" onClick={() => cambiarCantidad(producto.id, 1)}>+</button>
                            </div>
                          </div>
                          <div className="col-md-2 text-end">
                            <button className="btn btn-link text-danger p-0" onClick={() => eliminarProducto(producto.id)}>
                              <i className="fas fa-trash"></i>
                            </button>
                          </div>
                        </div>
                        <hr />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title mb-4">Resumen</h5>
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal:</span>
                <span>${subtotal.toLocaleString('es-CL')}</span>
              </div>
              <div className="d-flex justify-content-between mb-2 text-success">
                <span>Descuento:</span>
                <span>-${descuento.toLocaleString('es-CL')}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Envío:</span>
                <span>${envio.toLocaleString('es-CL')}</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-4 fw-bold fs-5">
                <span>Total:</span>
                <span>${total.toLocaleString('es-CL')}</span>
              </div>

              <div className="mb-3">
                <div className="input-group">
                  <input type="text" className="form-control" placeholder="Código cupón" value={codigoCupon} onChange={(e) => setCodigoCupon(e.target.value)} />
                  <button className="btn btn-outline-secondary" onClick={aplicarCuponHandler}>Aplicar</button>
                </div>
                <small className="text-muted">{mensajeCupon}</small>
              </div>

              <button className="btn btn-primary w-100" onClick={procesarCompraHandler} disabled={carrito.length === 0}>
                Proceder al Pago
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CarritoPage;