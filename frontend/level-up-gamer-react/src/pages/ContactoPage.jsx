// src/pages/ContactoPage.jsx
import React, { useState } from 'react';

function ContactoPage() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    asunto: '',
    mensaje: '',
  });
  const [errors, setErrors] = useState({});
  const [mensajeEnviado, setMensajeEnviado] = useState(false); // Para mostrar confirmación

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Limpiar error al empezar a escribir
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validarEmailContacto = (email) => {
    const dominiosPermitidos = ['@duoc.cl', '@profesor.duoc.cl', '@gmail.com'];
    return email && dominiosPermitidos.some(dominio => email.includes(dominio));
  };
  
  // (Opcional: Podrías añadir validación de teléfono si quieres)
  // const validarTelefono = (telefono) => { ... }; 

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = {};
    setMensajeEnviado(false); // Resetear mensaje

    if (!formData.nombre.trim()) {
      validationErrors.nombre = 'El nombre es requerido';
    } else if (formData.nombre.length > 100) {
       validationErrors.nombre = 'Máximo 100 caracteres';
    }

    // Email opcional, pero si existe, validar
    if (formData.email.trim() && !validarEmailContacto(formData.email)) {
       validationErrors.email = 'Email inválido (solo @duoc.cl, @profesor.duoc.cl, @gmail.com)';
    }

    if (!formData.mensaje.trim()) {
      validationErrors.mensaje = 'El mensaje es requerido';
    } else if (formData.mensaje.length > 500) {
      validationErrors.mensaje = 'Máximo 500 caracteres';
    }
    
    // (Opcional: Añadir validación de teléfono si se ingresa)

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      // Simular envío (en una app real, aquí harías una llamada a API)
      console.log('Datos del formulario:', formData);
      setMensajeEnviado(true); 
      // Limpiar formulario
      setFormData({ nombre: '', email: '', telefono: '', asunto: '', mensaje: '' });
      // Opcional: Podrías redirigir después de un tiempo
      // setTimeout(() => navigate('/'), 3000);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-lg-8 mx-auto">
          <h1 className="text-center mb-4">Contáctanos</h1>
          <p className="text-center mb-5">¿Tienes preguntas, sugerencias o necesitas ayuda? Estamos aquí para asistirte.</p>

          {mensajeEnviado && (
            <div className="alert alert-success" role="alert">
              ¡Mensaje enviado con éxito! Te contactaremos pronto.
            </div>
          )}

          <div className="card">
            <div className="card-body">
              <form id="contacto-form" onSubmit={handleSubmit}>
                {/* Nombre */}
                <div className="mb-3">
                  <label htmlFor="nombre" className="form-label">Nombre Completo *</label>
                  <input type="text" className={`form-control ${errors.nombre ? 'is-invalid' : ''}`} id="nombre" name="nombre" required maxLength="100" value={formData.nombre} onChange={handleChange} />
                  {errors.nombre && <div className="invalid-feedback">{errors.nombre}</div>}
                </div>

                {/* Email */}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Correo Electrónico</label>
                  <input type="email" className={`form-control ${errors.email ? 'is-invalid' : ''}`} id="email" name="email" maxLength="100" value={formData.email} onChange={handleChange} />
                  <div className="form-text">Solo correos @duoc.cl, @profesor.duoc.cl y @gmail.com</div>
                   {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>

                {/* Teléfono */}
                <div className="mb-3">
                  <label htmlFor="telefono" className="form-label">Teléfono (opcional)</label>
                  <input type="tel" className="form-control" id="telefono" name="telefono" value={formData.telefono} onChange={handleChange} />
                  {/* {errors.telefono && <div className="invalid-feedback">{errors.telefono}</div>} */}
                </div>

                {/* Asunto */}
                <div className="mb-3">
                   <label htmlFor="asunto" className="form-label">Asunto</label>
                   <select className="form-select" id="asunto" name="asunto" value={formData.asunto} onChange={handleChange}>
                     <option value="">Selecciona un asunto</option>
                     <option value="consulta">Consulta general</option>
                     <option value="soporte">Soporte técnico</option>
                     <option value="ventas">Información de ventas</option>
                     <option value="devolucion">Devolución o garantía</option>
                     <option value="sugerencia">Sugerencia</option>
                     <option value="otro">Otro</option>
                   </select>
                </div>

                {/* Mensaje */}
                 <div className="mb-3">
                   <label htmlFor="mensaje" className="form-label">Mensaje *</label>
                   <textarea 
                     className={`form-control ${errors.mensaje ? 'is-invalid' : ''}`} 
                     id="mensaje" 
                     name="mensaje" 
                     rows="5" 
                     required 
                     maxLength="500" 
                     placeholder="Escribe tu mensaje aquí..."
                     value={formData.mensaje} 
                     onChange={handleChange}
                   ></textarea>
                   <div className="form-text">{formData.mensaje.length}/500 caracteres</div>
                   {errors.mensaje && <div className="invalid-feedback">{errors.mensaje}</div>}
                 </div>

                {/* Botón Submit */}
                <button type="submit" className="btn btn-primary w-100">
                  <i className="fas fa-paper-plane me-2"></i>Enviar Mensaje
                </button>
              </form>
            </div>
          </div>
          {/* ... (Aquí puedes añadir la sección de Información de contacto HTML si quieres) ... */}
        </div>
      </div>
    </div>
  );
}

export default ContactoPage;