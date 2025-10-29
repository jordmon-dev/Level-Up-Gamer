// src/pages/ProductoDetallePage.jsx
import React from 'react';
import { useParams, Link } from 'react-router-dom'; // useParams para leer el ID de la URL
import { productos } from '../data'; // Importamos la lista de productos

// Recibimos la función agregarAlCarrito desde App.jsx
function ProductoDetallePage({ agregarAlCarrito }) { 
  // Obtenemos el parámetro 'id' de la URL (ej: /producto/3)
  const { id } = useParams(); 
  
  // Buscamos el producto en nuestro array de datos
  // IMPORTANTE: el 'id' de la URL es un string, lo convertimos a número
  const producto = productos.find(p => p.id === parseInt(id)); 

  // Si no encontramos el producto (ej: URL inválida)
  if (!producto) {
    return (
      <div className="container mt-5 text-center">
        <h2>Producto no encontrado</h2>
        <p>El producto que buscas no existe o la URL es incorrecta.</p>
        <Link to="/productos" className="btn btn-primary">Volver a Productos</Link>
      </div>
    );
  }

  // Si encontramos el producto, lo mostramos
  const imageUrl = producto.imagen.startsWith('http') 
    ? producto.imagen 
    : `/${producto.imagen}`;

  return (
    <div className="container mt-5">
      <div className="row">
        {/* Columna de la Imagen */}
        <div className="col-md-6 mb-4">
          <img 
            src={imageUrl} 
            className="img-fluid rounded shadow" 
            alt={producto.nombre} 
            onError={(e) => e.target.src = 'https://via.placeholder.com/600x400?text=Imagen+no+disponible'}
            style={{ maxHeight: '500px', objectFit: 'contain' }} // Estilos para ajustar imagen
          />
        </div>

        {/* Columna de Detalles */}
        <div className="col-md-6 mb-4">
          <h1 className="mb-3">{producto.nombre}</h1>
          <h3 className="text-primary mb-3">${producto.precio.toLocaleString('es-CL')} CLP</h3>
          
          <p className="text-muted"><strong>Categoría:</strong> {producto.categoria}</p>
          {producto.codigo && <p className="text-muted"><strong>Código:</strong> {producto.codigo}</p>}
          {/* Mostramos stock si existe en los datos */}
          {producto.stock !== undefined && (
            <p className={`fw-bold ${producto.stock > 0 ? 'text-success' : 'text-danger'}`}>
              Stock: {producto.stock > 0 ? `${producto.stock} unidades disponibles` : 'Agotado'}
            </p>
          )}

          <p className="mt-4">{producto.descripcion || "Descripción no disponible."}</p>

          <div className="d-grid gap-2 mt-4">
             {/* Botón Añadir al carrito (llama a la función global) */}
            <button 
              className="btn btn-primary btn-lg" 
              onClick={() => agregarAlCarrito(producto.id)}
              disabled={producto.stock === 0} // Deshabilitar si no hay stock
            >
              <i className="fas fa-cart-plus me-2"></i>Añadir al carrito
            </button>
            <Link to="/productos" className="btn btn-outline-secondary">
               <i className="fas fa-arrow-left me-2"></i>Volver a Productos
            </Link>
          </div>
        </div>
      </div>
       {/* (Opcional: Podrías añadir una sección de productos relacionados aquí) */}
    </div>
  );
}

export default ProductoDetallePage;