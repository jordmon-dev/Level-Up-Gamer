import React from 'react';
import { useParams, Link } from 'react-router-dom';

function ProductoDetallePage({ productos, agregarAlCarrito }) { 
  const { id } = useParams(); 
  const producto = productos.find(p => p.id === parseInt(id)); 

  if (!producto) return <div className="container mt-5 text-center"><h2>No encontrado</h2><Link to="/productos">Volver</Link></div>;

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <img src={producto.imagen.startsWith('http') ? producto.imagen : `/${producto.imagen}`} className="img-fluid rounded" onError={(e) => e.target.src='https://via.placeholder.com/600'} />
        </div>
        <div className="col-md-6">
          <h1>{producto.nombre}</h1>
          <h3 className="text-primary">${producto.precio.toLocaleString('es-CL')}</h3>
          <p>Cat: {producto.categoria}</p>
          <p>Stock: {producto.stock}</p>
          <p>{producto.descripcion}</p>
          <button className="btn btn-primary btn-lg mt-3" onClick={() => agregarAlCarrito(producto.id)} disabled={producto.stock < 1}>Añadir al Carrito</button>
        </div>
      </div>
    </div>
  );
}
export default ProductoDetallePage;