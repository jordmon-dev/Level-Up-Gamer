// src/pages/CheckoutPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { regionesComunas } from '../regiones.js'; 

function CheckoutPage({ carrito, vaciarCarrito }) {
  const navigate = useNavigate();
  const [total, setTotal] = useState(0);

  // Estado del formulario
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    direccion: '',
    region: '',
    comuna: '',
    tarjeta: '', 
    fechaVencimiento: '',
    cvv: ''
  });

  const [comunasDisponibles, setComunasDisponibles] = useState([]);
  const [errors, setErrors] = useState({});

  // Calcular total al montar el componente
  useEffect(() => {
    const subtotal = carrito.reduce((sum, item) => sum + (item.precio * (item.cantidad || 1)), 0);
    // Envío gratis si es mayor a 50.000, sino 3.000
    const envio = subtotal > 50000 ? 0 : 3000; 
    setTotal(subtotal + envio);
  }, [carrito]);

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Si cambia la región, actualizamos las comunas
    if (name === 'region') {
      const comunas = regionesComunas[value] || [];
      setComunasDisponibles(comunas.sort());
      // Reseteamos la comuna al cambiar de región
      setFormData(prev => ({ ...prev, comuna: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validaciones básicas
    if (!formData.nombre) newErrors.nombre = 'El nombre es requerido';
    if (!formData.apellido) newErrors.apellido = 'El apellido es requerido';
    if (!formData.email || !formData.email.includes('@')) newErrors.email = 'Email inválido';
    if (!formData.direccion) newErrors.direccion = 'La dirección es requerida';
    if (!formData.region) newErrors.region = 'Seleccione una región';
    if (!formData.comuna) newErrors.comuna = 'Seleccione una comuna';
    if (!formData.tarjeta || formData.tarjeta.length < 16) newErrors.tarjeta = 'Tarjeta inválida (mín. 16 dígitos)';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // --- SIMULACIÓN DE COMPRA ---
      const numeroOrden = Math.floor(Math.random() * 1000000); // Generar ID aleatorio
      
      const datosCompra = {
        orden: numeroOrden,
        comprador: formData,
        items: carrito,
        total: total,
        fecha: new Date().toLocaleString()
      };

      // Vaciamos el carrito usando la función que viene de App.jsx
      vaciarCarrito();

      // Redirigimos a la página de éxito (que haremos después) pasando los datos
      navigate('/compra-exitosa', { state: datosCompra });
    }
  };

  // Si el carrito está vacío, mostrar aviso
  if (carrito.length === 0) {
    return (
      <div className="container mt-5 text-center">
        <h2>No hay productos para pagar</h2>
        <p>Tu carrito está vacío.</p>
        <button className="btn btn-primary mt-3" onClick={() => navigate('/productos')}>
          Volver a la tienda
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Finalizar Compra</h2>
      <div className="row">
        {/* Columna Formulario */}
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <h4 className="mb-3">Datos de Envío</h4>
                
                <div className="row mb-3">
                  <div className="col">
                    <label className="form-label">Nombre</label>
                    <input 
                      type="text" 
                      className={`form-control ${errors.nombre ? 'is-invalid' : ''}`}
                      name="nombre" 
                      onChange={handleChange} 
                    />
                    {errors.nombre && <div className="invalid-feedback">{errors.nombre}</div>}
                  </div>
                  <div className="col">
                    <label className="form-label">Apellido</label>
                    <input 
                      type="text" 
                      className={`form-control ${errors.apellido ? 'is-invalid' : ''}`}
                      name="apellido" 
                      onChange={handleChange} 
                    />
                     {errors.apellido && <div className="invalid-feedback">{errors.apellido}</div>}
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Correo Electrónico</label>
                  <input 
                    type="email" 
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    name="email" 
                    placeholder="ejemplo@correo.com" 
                    onChange={handleChange} 
                  />
                  {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>

                <div className="mb-3">
                  <label className="form-label">Dirección</label>
                  <input 
                    type="text" 
                    className={`form-control ${errors.direccion ? 'is-invalid' : ''}`}
                    name="direccion" 
                    placeholder="Calle, número, depto..." 
                    onChange={handleChange} 
                  />
                  {errors.direccion && <div className="invalid-feedback">{errors.direccion}</div>}
                </div>

                <div className="row mb-3">
                  <div className="col">
                    <label className="form-label">Región</label>
                    <select 
                      className={`form-select ${errors.region ? 'is-invalid' : ''}`}
                      name="region" 
                      onChange={handleChange}
                      value={formData.region}
                    >
                      <option value="">Selecciona...</option>
                      {Object.keys(regionesComunas).sort().map(r => (
                        <option key={r} value={r}>{r}</option>
                      ))}
                    </select>
                    {errors.region && <div className="invalid-feedback">{errors.region}</div>}
                  </div>
                  <div className="col">
                    <label className="form-label">Comuna</label>
                    <select 
                      className={`form-select ${errors.comuna ? 'is-invalid' : ''}`}
                      name="comuna" 
                      onChange={handleChange} 
                      disabled={!formData.region}
                      value={formData.comuna}
                    >
                      <option value="">Selecciona...</option>
                      {comunasDisponibles.map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                    {errors.comuna && <div className="invalid-feedback">{errors.comuna}</div>}
                  </div>
                </div>

                <hr className="my-4" />

                <h4 className="mb-3">Pago (Simulado)</h4>
                <div className="mb-3">
                  <label className="form-label">Nombre en la tarjeta</label>
                  <input type="text" className="form-control" required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Número de tarjeta</label>
                  <input 
                    type="text" 
                    className={`form-control ${errors.tarjeta ? 'is-invalid' : ''}`}
                    name="tarjeta" 
                    placeholder="0000 0000 0000 0000" 
                    maxLength="19" 
                    onChange={handleChange} 
                  />
                  {errors.tarjeta && <div className="invalid-feedback">{errors.tarjeta}</div>}
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Vencimiento</label>
                    <input type="text" className="form-control" placeholder="MM/YY" required />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">CVV</label>
                    <input type="text" className="form-control" placeholder="123" maxLength="3" required />
                  </div>
                </div>

                <button className="btn btn-success w-100 btn-lg mt-3" type="submit">
                  Pagar ${total.toLocaleString('es-CL')}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Columna Resumen Lateral */}
        <div className="col-md-4">
          <div className="card bg-light">
            <div className="card-body">
              <h4 className="d-flex justify-content-between align-items-center mb-3">
                <span className="text-primary">Tu Carrito</span>
                <span className="badge bg-primary rounded-pill">{carrito.reduce((acc, item) => acc + (item.cantidad || 1), 0)}</span>
              </h4>
              <ul className="list-group mb-3">
                {carrito.map((item, index) => (
                  <li key={index} className="list-group-item d-flex justify-content-between lh-sm">
                    <div>
                      <h6 className="my-0">{item.nombre}</h6>
                      <small className="text-muted">x {item.cantidad || 1}</small>
                    </div>
                    <span className="text-muted">${(item.precio * (item.cantidad || 1)).toLocaleString('es-CL')}</span>
                  </li>
                ))}
                <li className="list-group-item d-flex justify-content-between">
                  <span>Total (CLP)</span>
                  <strong>${total.toLocaleString('es-CL')}</strong>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;