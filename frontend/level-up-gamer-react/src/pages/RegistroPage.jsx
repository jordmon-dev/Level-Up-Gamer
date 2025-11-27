import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { regionesComunas } from '../regiones.js'; 
import { registerUser } from '../services/AuthService'; // IMPORTACIÓN CRÍTICA

function RegistroPage() {
  const [formData, setFormData] = useState({
    run: '',
    fechaNacimiento: '',
    nombres: '',
    apellidos: '',
    email: '',
    password: '',
    confirmPassword: '',
    region: '',
    comuna: '',
    direccion: '',
    terminos: false,
  });

  const [comunasDisponibles, setComunasDisponibles] = useState([]);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validarEmail = (emailInput) => {
    const dominiosPermitidos = ['@duoc.cl', '@profesor.duoc.cl', '@gmail.com'];
    return dominiosPermitidos.some(dominio => emailInput.endsWith(dominio));
  };
  // (Resto de funciones de validación como validarRUN y calcularEdad, etc., quedan iguales)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (name === 'region') {
      const comunas = regionesComunas[value] || [];
      setComunasDisponibles(comunas.sort());
      setFormData(prevData => ({ ...prevData, comuna: '' })); 
    }
  };

  // --- Manejador del Envío del Formulario (Modificado) ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {};
    // ... (Tu lógica de validación aquí) ...
    // (Omitida para concisión, asume que se pasan las validaciones)

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      // Guardamos solo los datos que espera el Backend (RegistroDto)
      const { run, fechaNacimiento, confirmPassword, terminos, ...usuarioData } = formData;

      try {
        // LLAMADA AXIOS REAL AL BACKEND
        const response = await registerUser(usuarioData); 
        alert(`¡Registro exitoso! ${response.data}`);
        navigate('/login'); 
      } catch (error) {
        if (error.response && error.response.status === 400) {
          alert(`Error: ${error.response.data}`);
        } else {
          alert("Error de conexión o servidor no disponible.");
        }
      }
    }
  };

  const listaRegiones = Object.keys(regionesComunas).sort();

  return (
    <div className="container mt-5">{/* ... Código JSX de Registro (Queda igual) ... */}</div>
  );
}

export default RegistroPage;