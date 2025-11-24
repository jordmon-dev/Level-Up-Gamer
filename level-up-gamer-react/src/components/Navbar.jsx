// src/components/Navbar.jsx
import { Link } from 'react-router-dom';

// Recibimos usuario y logout como props
function Navbar({ cantidadCarrito, usuario, logout }) { 
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          <i className="fas fa-gamepad me-2"></i>LEVEL - UP GAMER
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item"><Link className="nav-link" to="/">Inicio</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/productos">Productos</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/nosotros">Nosotros</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/blogs">Blogs</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/contacto">Contacto</Link></li>
            
            {/* Lógica condicional de Login/Logout */}
            {usuario ? (
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle text-warning" href="#" role="button" data-bs-toggle="dropdown">
                  <i className="fas fa-user-circle me-1"></i> {usuario.nombres || usuario.email.split('@')[0]}
                </a>
                <ul className="dropdown-menu dropdown-menu-dark">
                  <li><Link className="dropdown-item" to="/admin/dashboard">Admin Panel</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><button className="dropdown-item text-danger" onClick={logout}>Cerrar Sesión</button></li>
                </ul>
              </li>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  <i className="fas fa-user me-1"></i>Login
                </Link>
              </li>
            )}

            <li className="nav-item">
              <Link className="nav-link position-relative" to="/carrito">
                <i className="fas fa-shopping-cart me-1"></i>
                <span id="cart-count" className="badge bg-danger rounded-pill">{cantidadCarrito}</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;