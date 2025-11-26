// src/pages/LoginPage.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../services/AuthService'; // Importamos el servicio real

function LoginPage({ login }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('usuarioLogueado')) {
      navigate('/');
    }
  }, [navigate]);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Llamada al Backend Java
      const response = await loginUser({ email, password });
      
      // Si el backend responde OK, obtenemos token y datos
      const { token, usuario } = response.data;
      
      // Guardamos en el estado global de la App
      // Combinamos los datos del usuario con el token necesario para futuras peticiones
      login({ ...usuario, token });
      
      alert(`¡Bienvenido ${usuario.nombre}!`);
      navigate('/');

    } catch (err) {
      console.error(err);
      setError('Credenciales inválidas o error de conexión.');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body p-4">
              <h2 className="text-center mb-4">Iniciar Sesión</h2>
              
              {error && <div className="alert alert-danger">{error}</div>}

              <form onSubmit={handleLoginSubmit}>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input 
                    type="email" 
                    className="form-control" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Contraseña</label>
                  <input 
                    type="password" 
                    className="form-control" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">Ingresar</button>
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