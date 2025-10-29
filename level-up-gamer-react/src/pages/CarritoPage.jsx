// src/pages/CarritoPage.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { cuponesValidos } from '../data.js'; // Importamos los cupones

function CarritoPage() {
  // Estado para los items del carrito (leído desde localStorage)
  const [carrito, setCarrito] = useState([]);
  // Estado para el código del cupón ingresado
  const [codigoCupon, setCodigoCupon] = useState('');
  // Estado para el porcentaje de descuento aplicado
  const [descuentoAplicado, setDescuentoAplicado] = useState(0);
  // Estado para mensaje del cupón
  const [mensajeCupon, setMensajeCupon] = useState('');

  const navigate = useNavigate();

  // --- Cargar carrito desde localStorage al montar ---
  useEffect(() => {
    const carritoGuardado = JSON.parse(localStorage.getItem('carrito') || '[]');
    // Agrupamos para manejar cantidades
    const productosAgrupados = agruparProductos(carritoGuardado);
    setCarrito(productosAgrupados);
  }, []); // Array vacío para que se ejecute solo una vez

  // --- Función para agrupar productos y contar cantidades ---
  const agruparProductos = (carritoArray) => {
    const agrupados = {};
    carritoArray.forEach(producto => {
      if (agrupados[producto.id]) {
        agrupados[producto.id].cantidad += 1;
      } else {
        // Guardamos copia del producto con cantidad 1
        agrupados[producto.id] = { ...producto, cantidad: 1 };
      }
    });
    // Convertimos el objeto de vuelta a un array
    return Object.values(agrupados);
  };

  // --- Guardar carrito en localStorage cada vez que cambie ---
  const guardarCarritoEnStorage = (carritoActualizado) => {
    // Desagrupamos antes de guardar: repetimos cada producto según su cantidad
    const carritoDesagrupado = [];
    carritoActualizado.forEach(item => {
      for (let i = 0; i < item.cantidad; i++) {
        // Creamos una copia sin la propiedad 'cantidad' para guardar
        const { cantidad, ...productoBase } = item; 
        carritoDesagrupado.push(productoBase);
      }
    });
    localStorage.setItem('carrito', JSON.stringify(carritoDesagrupado));
    // Actualizamos el contador del navbar (¡Necesitaremos mejorar esto con Context!)
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = carritoDesagrupado.length;
    }
  };
  
  // --- Funciones para modificar el carrito ---
  const cambiarCantidad = (id, delta) => {
    setCarrito(prevCarrito => {
      const nuevoCarrito = prevCarrito.map(item => {
        if (item.id === id) {
          const nuevaCantidad = Math.max(1, item.cantidad + delta); // Asegura que la cantidad no sea menor a 1
          return { ...item, cantidad: nuevaCantidad };
        }
        return item;
      });
      guardarCarritoEnStorage(nuevoCarrito);
      return nuevoCarrito;
    });
  };

  const eliminarProducto = (id) => {
    setCarrito(prevCarrito => {
      const nuevoCarrito = prevCarrito.filter(item => item.id !== id);
      guardarCarritoEnStorage(nuevoCarrito);
      return nuevoCarrito;
    });
  };

  // --- Lógica de Cupones ---
  const aplicarCuponHandler = () => {
    const codigoUpper = codigoCupon.trim().toUpperCase();
    if (cuponesValidos[codigoUpper]) {
      setDescuentoAplicado(cuponesValidos[codigoUpper]);
      setMensajeCupon(`¡Cupón aplicado! ${cuponesValidos[codigoUpper]}% de descuento`);
      setCodigoCupon(''); // Limpiar input
    } else {
      setDescuentoAplicado(0);
      setMensajeCupon('Cupón inválido o expirado');
    }
  };

  // --- Cálculos de Totales ---
  const subtotal = carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0);
  const descuento = subtotal * (descuentoAplicado / 100);
  const envio = subtotal > 50000 ? 0 : 3000; // Envío gratis sobre $50.000
  const total = subtotal - descuento + envio;

  // --- Procesar Compra ---
  const procesarCompraHandler = () => {
    if (carrito.length === 0) return;

    const usuarioLogueado = localStorage.getItem('usuarioLogueado');
    if (!usuarioLogueado) {
      alert('Debes iniciar sesión para completar la compra');
      navigate('/login'); // Redirige al login si no está logueado
      return;
    }

    // (Aquí iría la lógica real de crear orden, guardar en historial, etc.)
    // Por ahora, solo simulamos la compra y limpiamos el carrito
    
    alert(`¡Compra realizada con éxito! (Simulación)\nTotal: $${total.toLocaleString('es-CL')} CLP`);

    // Limpiar carrito
    setCarrito([]);
    guardarCarritoEnStorage([]);
    setDescuentoAplicado(0);
    setMensajeCupon('');

    navigate('/'); // Redirigir a inicio después de la compra
  };

  // --- Renderizado del Componente ---
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-12">
          <h1 className="mb-4">Tu Carrito de Compras</h1>
        </div>
      </div>

      <div className="row">
        {/* Lista de Productos */}
        <div className="col-lg-8">
          <div className="card">
            <div className="card-body">
              {carrito.length === 0 ? (
                // Mensaje Carrito Vacío
                <div id="carrito-vacio" className="text-center py-5">
                  <i className="fas fa-shopping-cart fa-4x text-muted mb-3"></i>
                  <h4>Tu carrito está vacío</h4>
                  <p>¡Agrega algunos productos para comenzar!</p>
                  <Link to="/productos" className="btn btn-primary">Ver Productos</Link>
                </div>
              ) : (
                // Items del Carrito
                <div id="carrito-items">
                  {carrito.map(producto => (
                    <React.Fragment key={producto.id}>
                      <div className="row align-items-center mb-4 carrito-item">
                        <div className="col-md-2">
                           {/* Usamos la misma lógica de URL de imagen que en ProductoCard */}
                          <img 
                            src={producto.imagen.startsWith('http') ? producto.imagen : `/${producto.imagen}`} 
                            alt={producto.nombre} 
                            className="img-fluid rounded" 
                            style={{ maxHeight: '80px' }}
                            onError={(e) => e.target.src = 'https://via.placeholder.com/100x80?text=N/A'}
                          />
                        </div>
                        <div className="col-md-4">
                          <h6 className="mb-1">{producto.nombre}</h6>
                          <small className="text-muted">{producto.categoria || 'Producto'}</small>
                        </div>
                        <div className="col-md-2">
                          <span className="price">${producto.precio.toLocaleString('es-CL')} CLP</span>
                        </div>
                        <div className="col-md-2">
                           {/* Botones para cambiar cantidad */}
                          <div className="input-group input-group-sm">
                            <button className="btn btn-outline-secondary" onClick={() => cambiarCantidad(producto.id, -1)} disabled={producto.cantidad <= 1}>-</button>
                            <input type="text" className="form-control text-center" value={producto.cantidad} readOnly />
                            <button className="btn btn-outline-secondary" onClick={() => cambiarCantidad(producto.id, 1)}>+</button>
                          </div>
                        </div>
                        <div className="col-md-2 text-end">
                          <span className="fw-bold">${(producto.precio * producto.cantidad).toLocaleString('es-CL')} CLP</span>
                          <br />
                          {/* Botón para eliminar */}
                          <button className="btn btn-link text-danger p-0" onClick={() => eliminarProducto(producto.id)}>
                            <i className="fas fa-trash"></i> Eliminar
                          </button>
                        </div>
                      </div>
                      <hr />
                    </React.Fragment>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Resumen del Pedido */}
        <div className="col-lg-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title mb-4">Resumen del Pedido</h5>
              
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal:</span>
                <span id="subtotal">${subtotal.toLocaleString('es-CL')} CLP</span>
              </div>
              
              <div className="d-flex justify-content-between mb-2">
                <span>Descuento ({descuentoAplicado}%):</span>
                <span id="descuento" className={descuento > 0 ? 'text-success' : ''}>
                  -${descuento.toLocaleString('es-CL')} CLP
                </span>
              </div>
              
              <div className="d-flex justify-content-between mb-2">
                <span>Envío:</span>
                <span id="envio">{envio === 0 ? 'Gratis' : `$${envio.toLocaleString('es-CL')} CLP`}</span>
              </div>
              
              <hr />
              
              <div className="d-flex justify-content-between mb-4">
                <strong>Total:</strong>
                <strong id="total">${total.toLocaleString('es-CL')} CLP</strong>
              </div>

              {/* Cupón de Descuento */}
              <div className="mb-4">
                <label htmlFor="cupon" className="form-label">Código de descuento</label>
                <div className="input-group">
                  <input 
                    type="text" 
                    className="form-control" 
                    id="cupon" 
                    placeholder="Ingresa tu código"
                    value={codigoCupon}
                    onChange={(e) => setCodigoCupon(e.target.value)}
                  />
                  <button className="btn btn-outline-secondary" type="button" onClick={aplicarCuponHandler}>Aplicar</button>
                </div>
                {/* Mensaje del cupón */}
                <div id="cupon-mensaje" className={`form-text ${descuentoAplicado > 0 ? 'text-success' : 'text-danger'}`}>
                  {mensajeCupon}
                </div>
              </div>

              {/* Botón de Checkout */}
              <button 
                id="btn-checkout" 
                className="btn btn-primary w-100" 
                disabled={carrito.length === 0} 
                onClick={procesarCompraHandler}
              >
                <i className="fas fa-lock me-2"></i>Proceder al Pago
              </button>

              <div className="text-center mt-3">
                <Link to="/productos" className="text-decoration-none">
                  <i className="fas fa-arrow-left me-2"></i>Seguir comprando
                </Link>
              </div>
            </div>
          </div>
          {/* ... (Info de envío - igual que en carrito.html) ... */}
        </div>
      </div>
    </div>
  );
}

export default CarritoPage;