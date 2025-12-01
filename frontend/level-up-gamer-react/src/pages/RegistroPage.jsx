import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { regionesComunas } from '../regiones.js';
// 1. IMPORTAMOS EL SERVICIO DE AUTENTICACIÓN
import { registerUser } from '../services/AuthService';

function RegistroPage() {
  const [formData, setFormData] = useState({
    run: '', // El backend no usa RUN, pero lo dejamos por validación visual
    fechaNacimiento: '', // El backend no lo pide en el DTO actual
    nombres: '', // Ojo: En backend es 'nombre' o 'nombres'? Revisamos tu DTO: es 'nombre'
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

  // --- Validaciones (Quedan igual) ---
  const validarEmail = (emailInput) => {
    const dominiosPermitidos = ['@duoc.cl', '@profesor.duoc.cl', '@gmail.com'];
    return dominiosPermitidos.some(dominio => emailInput.endsWith(dominio));
  };

  const validarRUN = (run) => {
    run = run.trim().toUpperCase();
    if (!/^[0-9]+[0-9kK]{1}$/.test(run)) return false;
    const cuerpo = run.slice(0, -1);
    return cuerpo.length >= 7 && cuerpo.length <= 8;
  };

  const calcularEdad = (fechaNacimiento) => {
    if (!fechaNacimiento) return 0;
    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }
    return edad;
  };

  const handleChange = (e) => {
  const { name, value, type, checked } = e.target;

  // Actualizamos siempre el formData
  setFormData(prevData => ({
    ...prevData,
    [name]: type === 'checkbox' ? checked : value
  }));

  // Cuando cambia la región, recalculamos comunas y limpiamos la comuna elegida
  if (name === "region") {
    const comunas = regionesComunas[value] || [];
    setComunasDisponibles(comunas.sort());
  }

  if (name === "region") {
    // limpiamos comuna seleccionada al cambiar de región
    setFormData(prevData => ({
      ...prevData,
      comuna: ""
    }));
  }
};


  // --- ENVÍO AL BACKEND (AQUÍ ESTÁ EL CAMBIO) ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {};

    // Validaciones
    if (!validarRUN(formData.run)) validationErrors.run = 'RUN inválido (Ej: 12345678K)';
    const edad = calcularEdad(formData.fechaNacimiento);
    if (formData.fechaNacimiento && edad < 18) validationErrors.fechaNacimiento = 'Debes ser mayor de 18 años';
    if (!formData.nombres) validationErrors.nombres = 'Nombres requeridos';
    if (!formData.apellidos) validationErrors.apellidos = 'Apellidos requeridos';
    if (!validarEmail(formData.email)) validationErrors.email = 'Email inválido';
    if (formData.password.length < 4 || formData.password.length > 10) validationErrors.password = 'Contraseña entre 4 y 10 caracteres';
    if (formData.password !== formData.confirmPassword) validationErrors.confirmPassword = 'Las contraseñas no coinciden';
    if (!formData.region) validationErrors.region = 'Región requerida';
    if (!formData.comuna) validationErrors.comuna = 'Comuna requerida';
    if (!formData.direccion) validationErrors.direccion = 'Dirección requerida';
    if (!formData.terminos) validationErrors.terminos = 'Debes aceptar los términos';

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      // Preparar datos para el Backend (RegistroDto.java)
      // Tu backend espera: nombre, apellidos, email, password, direccion, region, comuna
      const datosParaBackend = {
        nombre: formData.nombres, // Mapeamos 'nombres' a 'nombre'
        apellidos: formData.apellidos,
        email: formData.email,
        password: formData.password,
        direccion: formData.direccion,
        region: formData.region,
        comuna: formData.comuna
      };

      try {
        // 2. LLAMADA REAL AL SERVIDOR
        await registerUser(datosParaBackend);
        
        alert('¡Registro exitoso en la Base de Datos! Ahora puedes iniciar sesión.');
        navigate('/login');

      } catch (error) {
        console.error("Error de registro:", error);
        // Manejo de errores del backend (ej: Email ya existe)
        if (error.response && error.response.data) {
           alert(`Error: ${error.response.data}`);
        } else {
           alert('Error al conectar con el servidor.');
        }
      }
    }
  };

  const listaRegiones = Object.keys(regionesComunas).sort();

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Crear Cuenta</h2>

              <form id="registro-form" onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="run" className="form-label">RUN</label>
                    <input type="text" className={`form-control ${errors.run ? 'is-invalid' : ''}`} id="run" name="run" value={formData.run} onChange={handleChange} />
                    <div className="form-text">Ej: 12345678K</div>
                    {errors.run && <div className="invalid-feedback">{errors.run}</div>}
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="fechaNacimiento" className="form-label">Fecha de Nacimiento</label>
                    <input type="date" className={`form-control ${errors.fechaNacimiento ? 'is-invalid' : ''}`} id="fechaNacimiento" name="fechaNacimiento" value={formData.fechaNacimiento} onChange={handleChange} />
                    {errors.fechaNacimiento && <div className="invalid-feedback">{errors.fechaNacimiento}</div>}
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="nombres" className="form-label">Nombres</label>
                    <input type="text" className={`form-control ${errors.nombres ? 'is-invalid' : ''}`} id="nombres" name="nombres" value={formData.nombres} onChange={handleChange} />
                    {errors.nombres && <div className="invalid-feedback">{errors.nombres}</div>}
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="apellidos" className="form-label">Apellidos</label>
                    <input type="text" className={`form-control ${errors.apellidos ? 'is-invalid' : ''}`} id="apellidos" name="apellidos" value={formData.apellidos} onChange={handleChange} />
                    {errors.apellidos && <div className="invalid-feedback">{errors.apellidos}</div>}
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Correo Electrónico</label>
                  <input type="email" className={`form-control ${errors.email ? 'is-invalid' : ''}`} id="email" name="email" value={formData.email} onChange={handleChange} />
                  {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="password" className="form-label">Contraseña</label>
                    <input type="password" className={`form-control ${errors.password ? 'is-invalid' : ''}`} id="password" name="password" value={formData.password} onChange={handleChange} />
                    {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="confirmPassword" className="form-label">Confirmar Contraseña</label>
                    <input type="password" className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`} id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
                    {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="region" className="form-label">Región</label>
                    <select className={`form-select ${errors.region ? 'is-invalid' : ''}`} id="region" name="region" value={formData.region} onChange={handleChange}>
                      <option value="">Selecciona una región</option>
                      {listaRegiones.map(region => <option key={region} value={region}>{region}</option>)}
                    </select>
                    {errors.region && <div className="invalid-feedback">{errors.region}</div>}
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="comuna" className="form-label">Comuna</label>
                    <select className={`form-select ${errors.comuna ? 'is-invalid' : ''}`} id="comuna" name="comuna" value={formData.comuna} onChange={handleChange} disabled={!formData.region}>
                      <option value="">Selecciona una comuna</option>
                      {comunasDisponibles.map(comuna => <option key={comuna} value={comuna}>{comuna}</option>)}
                    </select>
                    {errors.comuna && <div className="invalid-feedback">{errors.comuna}</div>}
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="direccion" className="form-label">Dirección</label>
                  <textarea className={`form-control ${errors.direccion ? 'is-invalid' : ''}`} id="direccion" name="direccion" rows="2" value={formData.direccion} onChange={handleChange}></textarea>
                  {errors.direccion && <div className="invalid-feedback">{errors.direccion}</div>}
                </div>

                <div className="mb-3 form-check">
                  <input type="checkbox" className={`form-check-input ${errors.terminos ? 'is-invalid' : ''}`} id="terminos" name="terminos" checked={formData.terminos} onChange={handleChange} />
                  <label className="form-check-label" htmlFor="terminos">Acepto los términos y condiciones</label>
                  {errors.terminos && <div className="invalid-feedback">{errors.terminos}</div>}
                </div>

                <button type="submit" className="btn btn-primary w-100">Crear Cuenta</button>
              </form>
              <div className="text-center mt-3"><p>¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link></p></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegistroPage;