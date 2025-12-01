import { Link } from 'react-router-dom';

function ProductoCard({ producto, agregarAlCarrito }) {
  let imageUrl = 'https://via.placeholder.com/300x200?text=No+Image';
  if (producto.imagen) {
      imageUrl = producto.imagen.startsWith('http') ? producto.imagen : `/${producto.imagen}`;
  }

  return (
    <div className="col-md-3 mb-4">
      <div className="card h-100 product-card border-0"> 
        <div className="overflow-hidden" style={{ height: '220px' }}>
            <img src={imageUrl} className="card-img-top h-100 w-100" alt={producto.nombre} style={{ objectFit: 'cover' }} onError={(e) => e.target.src = 'https://via.placeholder.com/300x200?text=Error'} />
        </div>
        <div className="card-body d-flex flex-column">
          <div className="mb-3">
            <span className="badge bg-secondary mb-2">{producto.categoria}</span>
            <h5 className="card-title text-truncate">{producto.nombre}</h5>
          </div>
          <div className="mt-auto">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <span className="price">${producto.precio.toLocaleString('es-CL')}</span>
            </div>
            <button className="btn btn-primary w-100 mb-2 fw-bold" onClick={() => agregarAlCarrito(producto.id)} disabled={producto.stock === 0}>
              <i className="fas fa-cart-plus me-2"></i>{producto.stock === 0 ? "SIN STOCK" : "AGREGAR"}
            </button>
            <Link to={`/producto/${producto.id}`} className="btn btn-outline-light w-100 btn-sm">Ver Detalles</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProductoCard;