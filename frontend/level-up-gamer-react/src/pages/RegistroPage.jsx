import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// Asegúrate de haber copiado regiones.js a src/regiones.js
import { regionesComunas } from '../regiones.js'; // Importamos los datos

function RegistroPage() {
  // Estados para cada campo del formulario
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

  // Estado para las comunas disponibles según la región seleccionada
  const [comunasDisponibles, setComunasDisponibles] = useState([]);

  // Estado para los errores de validación
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  // --- Funciones de Validación (adaptadas de registro.js) ---
  const validarEmail = (emailInput) => {
    const dominiosPermitidos = ['@duoc.cl', '@profesor.duoc.cl', '@gmail.com'];
    return dominiosPermitidos.some(dominio => emailInput.endsWith(dominio));
  };

  const validarRUN = (run) => {
    run = run.trim().toUpperCase();
    if (!/^[0-9]+[0-9kK]{1}$/.test(run)) return false;
    const cuerpo = run.slice(0, -1);
    return cuerpo.length >= 7 && cuerpo.length <= 8; // Ajustado a 7-8 dígitos + verificador
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

  // --- Manejador de Cambios en Inputs ---
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Si cambia la región, actualizar las comunas
    if (name === 'region') {
      const comunas = regionesComunas[value] || [];
      setComunasDisponibles(comunas.sort());
      // Resetear comuna si cambia región
      setFormData(prevData => ({ ...prevData, comuna: '' })); 
    }
  };

  // --- Manejador del Envío del Formulario ---
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = {};

    // Realizar validaciones
    if (!validarRUN(formData.run)) {
      validationErrors.run = 'RUN inválido (Ej: 12345678K)';
    }
    const edad = calcularEdad(formData.fechaNacimiento);
    if (formData.fechaNacimiento && edad < 18) {
      validationErrors.fechaNacimiento = 'Debes ser mayor de 18 años';
    }
    if (!formData.nombres) validationErrors.nombres = 'Nombres requeridos';
    if (!formData.apellidos) validationErrors.apellidos = 'Apellidos requeridos';
    if (!validarEmail(formData.email)) {
      validationErrors.email = 'Email inválido (@duoc.cl, @profesor.duoc.cl, @gmail.com)';
    }
    if (formData.password.length < 4 || formData.password.length > 10) {
      validationErrors.password = 'Contraseña debe tener entre 4 y 10 caracteres';
    }
    if (formData.password !== formData.confirmPassword) {
      validationErrors.confirmPassword = 'Las contraseñas no coinciden';
    }
    if (!formData.region) validationErrors.region = 'Región requerida';
    if (!formData.comuna) validationErrors.comuna = 'Comuna requerida';
    if (!formData.direccion) validationErrors.direccion = 'Dirección requerida';
    if (!formData.terminos) validationErrors.terminos = 'Debes aceptar los términos';

    setErrors(validationErrors);

    // Si no hay errores, procesar registro
    if (Object.keys(validationErrors).length === 0) {
      procesarRegistro();
    }
  };

  // --- Procesar Registro (adaptado de registro.js) ---
  const procesarRegistro = () => {
    const usuarios = JSON.parse(localStorage.getItem('usuariosRegistrados') || '[]');
    if (usuarios.some(u => u.email === formData.email)) {
      alert('Este correo electrónico ya está registrado');
      return;
    }
    if (usuarios.some(u => u.run === formData.run)) {
      alert('Este RUN ya está registrado');
      return;
    }

    // Guardamos solo los datos relevantes (sin confirmPassword ni terminos)
    const { confirmPassword, terminos, ...usuarioData } = formData;
    usuarios.push(usuarioData);
    localStorage.setItem('usuariosRegistrados', JSON.stringify(usuarios));

    alert('¡Registro exitoso! Ahora puedes iniciar sesión');
    navigate('/login'); // Redirigir al login
  };

  // Obtener lista de regiones para el select
  const listaRegiones = Object.keys(regionesComunas).sort();

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Crear Cuenta</h2>

              <form id="registro-form" onSubmit={handleSubmit}>
                {/* --- Fila RUN y Fecha Nacimiento --- */}
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="run" className="form-label">RUN (sin puntos ni guión)</label>
                    <input type="text" className={`form-control ${errors.run ? 'is-invalid' : ''}`} id="run" name="run" required minLength="7" maxLength="9" pattern="[0-9kK]+" value={formData.run} onChange={handleChange} />
                    <div className="form-text">Ej: 12345678K</div>
                    {errors.run && <div className="invalid-feedback">{errors.run}</div>}
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="fechaNacimiento" className="form-label">Fecha de Nacimiento</label>
                    <input type="date" className={`form-control ${errors.fechaNacimiento ? 'is-invalid' : ''}`} id="fechaNacimiento" name="fechaNacimiento" value={formData.fechaNacimiento} onChange={handleChange} />
                    {errors.fechaNacimiento && <div className="invalid-feedback">{errors.fechaNacimiento}</div>}
                  </div>
                </div>

                {/* --- Fila Nombres y Apellidos --- */}
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="nombres" className="form-label">Nombres</label>
                    <input type="text" className={`form-control ${errors.nombres ? 'is-invalid' : ''}`} id="nombres" name="nombres" required maxLength="50" value={formData.nombres} onChange={handleChange} />
                    {errors.nombres && <div className="invalid-feedback">{errors.nombres}</div>}
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="apellidos" className="form-label">Apellidos</label>
                    <input type="text" className={`form-control ${errors.apellidos ? 'is-invalid' : ''}`} id="apellidos" name="apellidos" required maxLength="100" value={formData.apellidos} onChange={handleChange} />
                    {errors.apellidos && <div className="invalid-feedback">{errors.apellidos}</div>}
                  </div>
                </div>

                {/* --- Email --- */}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Correo Electrónico</label>
                  <input type="email" className={`form-control ${errors.email ? 'is-invalid' : ''}`} id="email" name="email" required value={formData.email} onChange={handleChange} />
                  <div className="form-text">Solo @duoc.cl, @profesor.duoc.cl, @gmail.com</div>
                  {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>

                {/* --- Fila Contraseñas --- */}
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="password" className="form-label">Contraseña</label>
                    <input type="password" className={`form-control ${errors.password ? 'is-invalid' : ''}`} id="password" name="password" required minLength="4" maxLength="10" value={formData.password} onChange={handleChange} />
                    <div className="form-text">4-10 caracteres</div>
                    {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="confirmPassword" className="form-label">Confirmar Contraseña</label>
                    <input type="password" className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`} id="confirmPassword" name="confirmPassword" required value={formData.confirmPassword} onChange={handleChange} />
                    {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
                  </div>
                </div>

                {/* --- Fila Región y Comuna --- */}
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="region" className="form-label">Región</label>
                    <select className={`form-select ${errors.region ? 'is-invalid' : ''}`} id="region" name="region" required value={formData.region} onChange={handleChange}>
                      <option value="">Selecciona una región</option>
                      {listaRegiones.map(region => (
                        <option key={region} value={region}>{region}</option>
                      ))}
                    </select>
                    {errors.region && <div className="invalid-feedback">{errors.region}</div>}
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="comuna" className="form-label">Comuna</label>
                    <select className={`form-select ${errors.comuna ? 'is-invalid' : ''}`} id="comuna" name="comuna" required value={formData.comuna} onChange={handleChange} disabled={!formData.region}>
                      <option value="">Selecciona una comuna</option>
                      {comunasDisponibles.map(comuna => (
                        <option key={comuna} value={comuna}>{comuna}</option>
                      ))}
                    </select>
                    {errors.comuna && <div className="invalid-feedback">{errors.comuna}</div>}
                  </div>
                </div>

                {/* --- Dirección --- */}
                <div className="mb-3">
                  <label htmlFor="direccion" className="form-label">Dirección</label>
                  <textarea className={`form-control ${errors.direccion ? 'is-invalid' : ''}`} id="direccion" name="direccion" rows="2" required maxLength="300" value={formData.direccion} onChange={handleChange}></textarea>
                  {errors.direccion && <div className="invalid-feedback">{errors.direccion}</div>}
                </div>

                {/* --- Términos y Condiciones --- */}
                <div className="mb-3 form-check">
                  <input type="checkbox" className={`form-check-input ${errors.terminos ? 'is-invalid' : ''}`} id="terminos" name="terminos" required checked={formData.terminos} onChange={handleChange} />
                  <label className="form-check-label" htmlFor="terminos">
                    Acepto los términos y condiciones y soy mayor de 18 años
                  </label>
                  {errors.terminos && <div className="invalid-feedback">{errors.terminos}</div>}
                </div>

                {/* --- Botón Submit --- */}
                <button type="submit" className="btn btn-primary w-100">
                  <i className="fas fa-user-plus me-2"></i>Crear Cuenta
                </button>
              </form>

              {/* --- Enlace a Login --- */}
              <div className="text-center mt-3">
                <p>¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegistroPage;