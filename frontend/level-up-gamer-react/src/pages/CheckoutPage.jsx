// src/pages/CheckoutPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { regionesComunas } from '../regiones.js'; 
import { createOrder } from '../services/OrderService'; // IMPORTACIÓN CRÍTICA

// La prop 'agregarOrden' se elimina porque llamamos al servicio directamente
function CheckoutPage({ carrito, vaciarCarrito, usuario }) {
  const navigate = useNavigate();
  const [total, setTotal] = useState(0);
  
  // ... (Resto de estados y useEffects quedan iguales) ...

  const handleSubmit = async (e) => { // Función ahora es ASÍNCRONA
    e.preventDefault();
    const newErrors = {};

    // ... (Tu lógica de validación) ...

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Preparamos los datos que espera la entidad Orden.java
      const datosOrden = {
        numeroOrden: Math.floor(Math.random() * 1000000),
        total: total,
        nombreCliente: formData.nombre + ' ' + formData.apellido,
        emailCliente: formData.email,
        // Nota: Los ítems del carrito (detalle) se simulan por simplicidad
        // y se pasan al resumen, pero no se envían a la Entidad Orden de Java.
      };

      try {
        // LLAMADA AXIOS REAL AL BACKEND para guardar la orden
        const response = await createOrder(datosOrden);

        // Si la orden se guarda correctamente:
        vaciarCarrito();
        
        // Redirigimos al éxito
        navigate('/compra-exitosa', { 
            state: {
                orden: datosOrden.numeroOrden, 
                comprador: formData, 
                items: carrito, // Pasamos el carrito para el resumen
                total: datosOrden.total, 
                fecha: new Date().toLocaleString()
            } 
        });

      } catch (error) {
        console.error("Error al guardar la orden:", error);
        alert("Error al procesar el pago. Intente nuevamente.");
      }
    }
  };

  // ... (Resto del código JSX y funciones auxiliares quedan iguales) ...
}

export default CheckoutPage;