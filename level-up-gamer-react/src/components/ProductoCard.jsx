// src/components/ProductoCard.jsx
import { Link } from 'react-router-dom';

// Recibimos 'producto' como una "prop"
function ProductoCard({ producto }) {
  
  const imageUrl = producto.imagen.startsWith('http') 
  ? producto.imagen 
  : `/${producto.imagen}`; // Ejemplo: Convierte "img/ps5.jpg" a "/img/ps5.jpg"
  
  return (
    <div className="col-md-3 mb-4">
      <div className="card h-100 product-card">
        <img src={imageUrl} className="card-img-top" alt={producto.nombre} onError={(e) => e.target.src = 'https://via.placeholder.com/300x200?text=Imagen+no+disponible'} />
        <div className="card-body">
          <h5 className="card-title">{producto.nombre}</h5>
          <p className="card-text text-secondary">{producto.categoria}</p>
          <p className="price">${producto.precio.toLocaleString('es-CL')} CLP</p>
          <button className="btn btn-primary w-100 mb-2">
            Añadir al carrito
          </button>
          {/* El Link nos llevará al detalle del producto */}
          <Link to={`/producto/${producto.id}`} className="btn btn-outline-light w-100">
            Ver detalles
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductoCard;