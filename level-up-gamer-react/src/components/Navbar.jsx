// src/components/Navbar.jsx
import { Link } from 'react-router-dom';

// 1. Asegúrate de que la función recibe "cantidadCarrito" entre llaves {}
function Navbar({ cantidadCarrito }) { 
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          <i className="fas fa-gamepad me-2"></i>LEVEL - UP GAMER
        </Link>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
          aria-controls="navbarNav" // Buenas prácticas: añadir aria-controls
          aria-expanded="false"     // Buenas prácticas: añadir aria-expanded
          aria-label="Toggle navigation" // Buenas prácticas: añadir aria-label
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {/* Links de navegación */}
            <li className="nav-item">
              <Link className="nav-link" to="/">Inicio</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/productos">Productos</Link>
            </li>
            <li className="nav-item">
              {/* Añadiremos esta ruta luego */}
              <Link className="nav-link" to="/nosotros">Nosotros</Link> 
            </li>
            <li className="nav-item">
               {/* Añadiremos esta ruta luego */}
              <Link className="nav-link" to="/blogs">Blogs</Link>
            </li>
            <li className="nav-item">
               {/* Añadiremos esta ruta luego */}
              <Link className="nav-link" to="/contacto">Contacto</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login" id="login-link">
                <i className="fas fa-user me-1"></i>Login
              </Link>
            </li>
            {/* Link del Carrito */}
            <li className="nav-item">
              <Link className="nav-link" to="/carrito">
                <i className="fas fa-shopping-cart me-1"></i>
                {/* 2. Usamos la prop aquí para mostrar la cantidad */}
                <span id="cart-count" className="badge bg-danger">{cantidadCarrito}</span> 
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;