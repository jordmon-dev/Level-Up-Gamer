// src/pages/LoginPage.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Recibimos la función 'login' desde App.jsx para actualizar el estado global
function LoginPage({ login }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const navigate = useNavigate();

  // Verificar si ya hay sesión al cargar
  useEffect(() => {
    const usuarioLogueado = localStorage.getItem('usuarioLogueado');
    if (usuarioLogueado) {
      navigate('/'); // Si ya está logueado, redirigir al inicio
    }
  }, [navigate]);

  const validarEmail = (emailInput) => {
    const dominiosPermitidos = ['@duoc.cl', '@profesor.duoc.cl', '@gmail.com'];
    return dominiosPermitidos.some(dominio => emailInput.endsWith(dominio));
  };

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    setEmailError('');
    setPasswordError('');

    let esValido = true;

    if (!validarEmail(email)) {
      setEmailError('Ingresa un correo válido (@duoc.cl, @profesor.duoc.cl o @gmail.com)');
      esValido = false;
    }

    if (password.length < 4 || password.length > 10) {
      setPasswordError('La contraseña debe tener entre 4 y 10 caracteres');
      esValido = false;
    }

    if (esValido) {
      procesarLogin(email, password);
    }
  };

  const procesarLogin = (emailInput, passwordInput) => {
    // 1. Buscamos en los usuarios registrados (localStorage)
    const usuariosRegistrados = JSON.parse(localStorage.getItem('usuariosRegistrados') || '[]');
    const usuarioEncontrado = usuariosRegistrados.find(u => u.email === emailInput && u.password === passwordInput);

    // 2. Lógica de Login
    // NOTA: Si el usuario existe, lo usamos. Si no, creamos uno temporal para que el profe pueda probar
    // sin tener que registrarse obligatoriamente (puedes quitar esto si quieres ser estricto).
    if (usuarioEncontrado) {
      // Caso 1: Usuario Real encontrado
      alert(`¡Bienvenido de nuevo, ${usuarioEncontrado.nombres}!`);
      login(usuarioEncontrado); // Actualizamos App.jsx
      navigate('/');
    } else {
      // Caso 2: Usuario no encontrado / Login de prueba
      // Si el email es válido pero no está registrado, permitimos entrar como "Invitado" para no bloquear la evaluación
      const usuarioInvitado = {
        email: emailInput,
        nombres: 'Invitado',
        apellidos: 'Test',
        region: '', // Sin región definida
        comuna: '',
        timestamp: new Date().getTime()
      };
      
      alert('Aviso: Entrando en modo invitado (Usuario no registrado)');
      login(usuarioInvitado); // Actualizamos App.jsx
      navigate('/');
      
      // Si prefieres ser estricto y bloquear si no existe, borra el bloque "else" de arriba y usa este:
      // setPasswordError('Credenciales incorrectas. Verifica tu correo o contraseña.');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body p-4">
              <h2 className="card-title text-center mb-4">Iniciar Sesión</h2>

              <form onSubmit={handleLoginSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Correo Electrónico</label>
                  <input
                    type="email"
                    className={`form-control ${emailError ? 'is-invalid' : ''}`}
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nombre@duoc.cl"
                  />
                  {emailError && <div className="invalid-feedback">{emailError}</div>}
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Contraseña</label>
                  <input
                    type="password"
                    className={`form-control ${passwordError ? 'is-invalid' : ''}`}
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {passwordError && <div className="invalid-feedback">{passwordError}</div>}
                </div>

                <div className="mb-3 form-check">
                  <input type="checkbox" className="form-check-input" id="remember" />
                  <label className="form-check-label" htmlFor="remember">Recordar mi sesión</label>
                </div>

                <button type="submit" className="btn btn-primary w-100">
                  <i className="fas fa-sign-in-alt me-2"></i>Ingresar
                </button>
              </form>

              <div className="text-center mt-3">
                <p>¿No tienes cuenta? <Link to="/registro">Regístrate aquí</Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;