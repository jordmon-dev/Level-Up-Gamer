// src/pages/CheckoutPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { regionesComunas } from '../regiones.js';
import { createOrder } from '../services/OrderService';

function CheckoutPage({ carrito, vaciarCarrito, usuario }) {
  const navigate = useNavigate();

  const [total, setTotal] = useState(0);

  const [formData, setFormData] = useState({
    nombre: usuario?.nombre || '',
    apellido: usuario?.apellidos || '',
    email: usuario?.email || '',
    telefono: '',
    region: '',
    comuna: '',
    direccion: '',
  });

  const [errors, setErrors] = useState({});

  // 🔹 Lista de regiones (claves del objeto regionesComunas)
  const listaRegiones = Object.keys(regionesComunas).sort();

  // 🔹 Comunas disponibles según la región seleccionada
  const comunasDisponibles = formData.region
    ? (regionesComunas[formData.region] || [])
    : [];

  // Calcula el total cada vez que cambia el carrito
  useEffect(() => {
    const nuevoTotal = carrito.reduce((acc, item) => {
      const precio = item.precio || 0;
      const cantidad = item.cantidad || 1;
      return acc + precio * cantidad;
    }, 0);

    setTotal(nuevoTotal);
  }, [carrito]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Limpia error de ese campo si el usuario lo corrige
    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validaciones simples
    if (!formData.nombre.trim()) newErrors.nombre = 'El nombre es obligatorio';
    if (!formData.apellido.trim()) newErrors.apellido = 'El apellido es obligatorio';
    if (!formData.email.trim()) {
      newErrors.email = 'El email es obligatorio';
    } else if (!formData.email.includes('@')) {
      newErrors.email = 'Ingresa un email válido';
    }
    if (!formData.region) newErrors.region = 'Selecciona una región';
    if (!formData.comuna) newErrors.comuna = 'Selecciona una comuna';
    if (!formData.direccion.trim()) newErrors.direccion = 'La dirección es obligatoria';
    if (carrito.length === 0) newErrors.carrito = 'No hay productos en el carrito';

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return; // No sigue si hay errores
    }

    // Datos que espera la entidad Orden.java
    const datosOrden = {
      numeroOrden: Math.floor(Math.random() * 1_000_000), // Long en backend
      total: Math.round(total), // Integer en backend
      nombreCliente: `${formData.nombre} ${formData.apellido}`,
      emailCliente: formData.email,
      // fecha la setea el backend o queda null
    };

    try {
      const response = await createOrder(datosOrden);
      console.log('Orden creada con éxito:', response.data);

      // Vaciar carrito en front
      vaciarCarrito();

      // Redirigir a página de éxito con el resumen
      navigate('/compra-exitosa', {
        state: {
          orden: datosOrden.numeroOrden,
          comprador: formData,
          items: carrito,
          total: datosOrden.total,
          fecha: new Date().toLocaleString(),
        },
      });
    } catch (error) {
      console.error('Error al guardar la orden:', error);
      alert('Error al procesar el pago. Intente nuevamente.');
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">Finalizar compra</h1>

      {errors.carrito && (
        <div className="alert alert-danger">{errors.carrito}</div>
      )}

      <div className="row">
        {/* Formulario de datos del comprador */}
        <div className="col-md-7">
          <form onSubmit={handleSubmit}>
            <h4>Datos del comprador</h4>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Nombre</label>
                <input
                  type="text"
                  name="nombre"
                  className={`form-control ${errors.nombre ? 'is-invalid' : ''}`}
                  value={formData.nombre}
                  onChange={handleChange}
                />
                {errors.nombre && (
                  <div className="invalid-feedback">{errors.nombre}</div>
                )}
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Apellido</label>
                <input
                  type="text"
                  name="apellido"
                  className={`form-control ${errors.apellido ? 'is-invalid' : ''}`}
                  value={formData.apellido}
                  onChange={handleChange}
                />
                {errors.apellido && (
                  <div className="invalid-feedback">{errors.apellido}</div>
                )}
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email}</div>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label">Teléfono (opcional)</label>
              <input
                type="text"
                name="telefono"
                className="form-control"
                value={formData.telefono}
                onChange={handleChange}
              />
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Región</label>
                <select
                  name="region"
                  className={`form-select ${errors.region ? 'is-invalid' : ''}`}
                  value={formData.region}
                  onChange={handleChange}
                >
                  <option value="">Selecciona una región</option>
                  {listaRegiones.map((region) => (
                    <option key={region} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
                {errors.region && (
                  <div className="invalid-feedback">{errors.region}</div>
                )}
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Comuna</label>
                <select
                  name="comuna"
                  className={`form-select ${errors.comuna ? 'is-invalid' : ''}`}
                  value={formData.comuna}
                  onChange={handleChange}
                  disabled={!formData.region}
                >
                  <option value="">Selecciona una comuna</option>
                  {comunasDisponibles.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                {errors.comuna && (
                  <div className="invalid-feedback">{errors.comuna}</div>
                )}
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Dirección</label>
              <input
                type="text"
                name="direccion"
                className={`form-control ${errors.direccion ? 'is-invalid' : ''}`}
                value={formData.direccion}
                onChange={handleChange}
              />
              {errors.direccion && (
                <div className="invalid-feedback">{errors.direccion}</div>
              )}
            </div>

            <button type="submit" className="btn btn-primary mt-3">
              Confirmar compra
            </button>
          </form>
        </div>

        {/* Resumen del carrito */}
        <div className="col-md-5">
          <h4>Resumen de compra</h4>
          {carrito.length === 0 ? (
            <p>No hay productos en el carrito.</p>
          ) : (
            <>
              <ul className="list-group mb-3">
                {carrito.map((item) => (
                  <li
                    key={item.id}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <div>
                      <strong>{item.nombre}</strong>
                      {item.cantidad && (
                        <span className="d-block">
                          Cantidad: {item.cantidad}
                        </span>
                      )}
                    </div>
                    <span>
                      ${item.precio}{' '}
                      {item.cantidad ? `x ${item.cantidad}` : ''}
                    </span>
                  </li>
                ))}
              </ul>

              <h5 className="text-end">Total: ${Math.round(total)}</h5>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
