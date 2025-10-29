src/components/Navbar.jsx
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container">
        {/* Usamos Link en lugar de <a> para la navegación interna */}
        <Link className="navbar-brand fw-bold" to="/">
          <i className="fas fa-gamepad me-2"></i>LEVEL - UP GAMER
        </Link>
        
        {/* El botón de Bootstrap para móviles */}
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Inicio</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/productos">Productos</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/nosotros">Nosotros</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/blogs">Blogs</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contacto">Contacto</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login" id="login-link">
                <i className="fas fa-user me-1"></i>Login
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/carrito">
                <i className="fas fa-shopping-cart me-1"></i>
                {/* Dejamos el contador en 0 por ahora */}
                <span id="cart-count" className="badge bg-danger">0</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;