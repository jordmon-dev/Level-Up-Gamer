// src/pages/LoginPage.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // useNavigate para redirigir

function LoginPage() {
  // Estados para los inputs del formulario
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Estados para los mensajes de error
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Hook para la navegación
  const navigate = useNavigate();

  // Función para validar el formato del email (adaptada de login.js)
  const validarEmail = (emailInput) => {
    const dominiosPermitidos = ['@duoc.cl', '@profesor.duoc.cl', '@gmail.com'];
    // Usamos endsWith para una validación un poco más estricta
    return dominiosPermitidos.some(dominio => emailInput.endsWith(dominio));
  };

  // Función que se ejecuta al enviar el formulario
  const handleLoginSubmit = (event) => {
    event.preventDefault(); // Prevenir recarga de página

    // Resetear errores
    setEmailError('');
    setPasswordError('');

    let esValido = true;

    // Validar email
    if (!validarEmail(email)) {
      setEmailError('Ingresa un correo válido (@duoc.cl, @profesor.duoc.cl o @gmail.com)');
      esValido = false;
    }

    // Validar contraseña
    if (password.length < 4 || password.length > 10) {
      setPasswordError('La contraseña debe tener entre 4 y 10 caracteres');
      esValido = false;
    }

    // Si todo es válido, procesar login
    if (esValido) {
      procesarLogin(email, password);
    }
  };

  // Función para procesar el login (adaptada de login.js)
  const procesarLogin = (emailInput, passwordInput) => {
    const usuariosRegistrados = JSON.parse(localStorage.getItem('usuariosRegistrados') || '[]');
    const usuario = usuariosRegistrados.find(u => u.email === emailInput && u.password === passwordInput);

    if (usuario) {
      alert('¡Login exitoso! Bienvenido a Level-Up Gamer');
      localStorage.setItem('usuarioLogueado', JSON.stringify({
        email: emailInput,
        timestamp: new Date().getTime()
      }));
      // Redirigir a la página principal usando useNavigate
      navigate('/'); 
    } else {
      alert('Credenciales incorrectas. Por favor intenta nuevamente.');
      // Opcional: Podrías poner un estado de error general aquí
    }
  };

  // Verificar si ya hay sesión al cargar (adaptado de login.js)
  useEffect(() => {
    const usuarioLogueado = localStorage.getItem('usuarioLogueado');
    if (usuarioLogueado) {
      navigate('/'); // Si ya está logueado, redirigir al inicio
    }
  }, [navigate]); // El array vacío asegura que se ejecute solo una vez al montar

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Iniciar Sesión</h2>

              {/* Usamos onSubmit en el form */}
              <form id="login-form" onSubmit={handleLoginSubmit}>
                {/* Email */}
                <div className="mb-3">
                  {/* Cambiamos 'for' por 'htmlFor' */}
                  <label htmlFor="email" className="form-label">Correo Electrónico</label>
                  <input
                    type="email"
                    className={`form-control ${emailError ? 'is-invalid' : ''}`} // Clase dinámica para error
                    id="email"
                    name="email"
                    required
                    value={email} // Conectamos al estado
                    onChange={(e) => setEmail(e.target.value)} // Actualizamos estado al escribir
                  />
                  <div className="form-text">Solo correos @duoc.cl, @profesor.duoc.cl y @gmail.com</div>
                  {/* Mostramos el mensaje de error si existe */}
                  {emailError && <div className="invalid-feedback">{emailError}</div>}
                </div>

                {/* Contraseña */}
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Contraseña</label>
                  <input
                    type="password"
                    className={`form-control ${passwordError ? 'is-invalid' : ''}`}
                    id="password"
                    name="password"
                    required
                    minLength="4"
                    maxLength="10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div className="form-text">Entre 4 y 10 caracteres</div>
                  {passwordError && <div className="invalid-feedback">{passwordError}</div>}
                </div>

                {/* Recordarme (funcionalidad no implementada aún) */}
                <div className="mb-3 form-check">
                  <input type="checkbox" className="form-check-input" id="remember" />
                  <label className="form-check-label" htmlFor="remember">Recordar mi sesión</label>
                </div>

                {/* Botón de Submit */}
                <button type="submit" className="btn btn-primary w-100">
                  <i className="fas fa-sign-in-alt me-2"></i>Ingresar
                </button>
              </form>

              {/* Enlaces adicionales */}
              <div className="text-center mt-3">
                 {/* Usamos Link para el enlace de registro */}
                <p>¿No tienes cuenta? <Link to="/registro">Regístrate aquí</Link></p>
                {/* <p><a href="#">¿Olvidaste tu contraseña?</a></p> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;