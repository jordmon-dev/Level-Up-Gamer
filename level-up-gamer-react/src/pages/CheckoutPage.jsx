// src/pages/CheckoutPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { regionesComunas } from '../regiones.js'; 

// Recibimos 'agregarOrden' como prop nueva
function CheckoutPage({ carrito, vaciarCarrito, usuario, agregarOrden }) {
  const navigate = useNavigate();
  const [total, setTotal] = useState(0);

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

  // Calcular total
  useEffect(() => {
    const subtotal = carrito.reduce((sum, item) => sum + (item.precio * (item.cantidad || 1)), 0);
    const envio = subtotal > 50000 ? 0 : 3000; 
    setTotal(subtotal + envio);
  }, [carrito]);

  // Autocompletar datos de usuario
  useEffect(() => {
    if (usuario) {
      setFormData(prev => ({
        ...prev,
        nombre: usuario.nombres || '',
        apellido: usuario.apellidos || '',
        email: usuario.email || '',
        direccion: usuario.direccion || '', 
        region: usuario.region || '',
        comuna: usuario.comuna || ''
      }));
      if (usuario.region && regionesComunas[usuario.region]) {
        setComunasDisponibles(regionesComunas[usuario.region].sort());
      }
    }
  }, [usuario]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === 'region') {
      const comunas = regionesComunas[value] || [];
      setComunasDisponibles(comunas.sort());
      setFormData(prev => ({ ...prev, comuna: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.nombre) newErrors.nombre = 'Requerido';
    if (!formData.apellido) newErrors.apellido = 'Requerido';
    if (!formData.email.includes('@')) newErrors.email = 'Email inválido';
    if (!formData.direccion) newErrors.direccion = 'Requerido';
    if (!formData.region) newErrors.region = 'Requerido';
    if (!formData.tarjeta || formData.tarjeta.length < 16) newErrors.tarjeta = 'Tarjeta inválida';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // --- PROCESO DE COMPRA ---
      const numeroOrden = Math.floor(Math.random() * 1000000);
      
      const datosCompra = {
        orden: numeroOrden,
        comprador: formData,
        items: carrito,
        total: total,
        fecha: new Date().toLocaleString() // Guardamos la fecha y hora
      };

      // 1. Guardamos la orden en el historial global
      agregarOrden(datosCompra);

      // 2. Vaciamos carrito
      vaciarCarrito();

      // 3. Redirigimos al éxito
      navigate('/compra-exitosa', { state: datosCompra });
    }
  };

  if (carrito.length === 0) {
    return (
      <div className="container mt-5 text-center">
        <h2>Tu carrito está vacío</h2>
        <button className="btn btn-primary mt-3" onClick={() => navigate('/productos')}>Ir a comprar</button>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Finalizar Compra</h2>
      <div className="row">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              {usuario && <div className="alert alert-info"><i className="fas fa-user-check me-2"></i>Datos cargados de tu perfil</div>}
              
              <form onSubmit={handleSubmit}>
                <h4 className="mb-3">Datos de Envío</h4>
                <div className="row mb-3">
                  <div className="col"><input type="text" className="form-control" name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleChange} required /></div>
                  <div className="col"><input type="text" className="form-control" name="apellido" placeholder="Apellido" value={formData.apellido} onChange={handleChange} required /></div>
                </div>
                <div className="mb-3"><input type="email" className="form-control" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required /></div>
                <div className="mb-3"><input type="text" className="form-control" name="direccion" placeholder="Dirección" value={formData.direccion} onChange={handleChange} required /></div>
                <div className="row mb-3">
                  <div className="col">
                    <select className="form-select" name="region" value={formData.region} onChange={handleChange} required>
                      <option value="">Región...</option>
                      {Object.keys(regionesComunas).sort().map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                  </div>
                  <div className="col">
                    <select className="form-select" name="comuna" value={formData.comuna} onChange={handleChange} disabled={!formData.region} required>
                      <option value="">Comuna...</option>
                      {comunasDisponibles.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>

                <hr className="my-4" />
                <h4 className="mb-3">Pago</h4>
                <div className="mb-3"><input type="text" className="form-control" name="tarjeta" placeholder="N° Tarjeta (16 dígitos)" maxLength="19" onChange={handleChange} required /></div>
                <div className="row">
                  <div className="col"><input type="text" className="form-control" placeholder="MM/YY" required /></div>
                  <div className="col"><input type="text" className="form-control" placeholder="CVV" maxLength="3" required /></div>
                </div>

                <button className="btn btn-success w-100 btn-lg mt-3" type="submit">Confirmar Pago (${total.toLocaleString('es-CL')})</button>
              </form>
            </div>
          </div>
        </div>
        
        <div className="col-md-4">
          <div className="card bg-light">
            <div className="card-body">
              <h4 className="d-flex justify-content-between align-items-center mb-3">
                <span className="text-primary">Resumen</span>
                <span className="badge bg-primary rounded-pill">{carrito.length}</span>
              </h4>
              <ul className="list-group mb-3">
                {carrito.map((item, i) => (
                  <li key={i} className="list-group-item d-flex justify-content-between lh-sm">
                    <div><h6 className="my-0">{item.nombre}</h6><small className="text-muted">x{item.cantidad || 1}</small></div>
                    <span className="text-muted">${(item.precio * (item.cantidad || 1)).toLocaleString('es-CL')}</span>
                  </li>
                ))}
                <li className="list-group-item d-flex justify-content-between"><span>Total (CLP)</span><strong>${total.toLocaleString('es-CL')}</strong></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;