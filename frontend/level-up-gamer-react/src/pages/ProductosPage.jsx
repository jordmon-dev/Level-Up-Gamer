import React, { useState } from 'react';
import ProductoCard from '../components/ProductoCard';

// Recibimos 'productos' por props
function ProductosPage({ productos, agregarAlCarrito }) {
  const [textoBusqueda, setTextoBusqueda] = useState('');
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');

  const handleBusquedaChange = (e) => setTextoBusqueda(e.target.value.toLowerCase());
  const handleCategoriaChange = (e) => setCategoriaSeleccionada(e.target.value);

  const productosFiltrados = productos.filter(p => {
    const coincideTexto = p.nombre.toLowerCase().includes(textoBusqueda);
    const coincideCategoria = categoriaSeleccionada === '' || p.categoria === categoriaSeleccionada;
    return coincideTexto && coincideCategoria;
  });

  const categorias = [...new Set(productos.map(p => p.categoria))];

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Nuestros Productos</h1>
      <div className="row mb-4">
        <div className="col-md-6">
          <input type="text" className="form-control" placeholder="Buscar..." value={textoBusqueda} onChange={handleBusquedaChange} />
        </div>
        <div className="col-md-6">
          <select className="form-select" value={categoriaSeleccionada} onChange={handleCategoriaChange}>
            <option value="">Todas las categorías</option>
            {categorias.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>
      </div>
      <div className="row">
        {productosFiltrados.map(p => (
          // Pasamos la función agregarAlCarrito a la tarjeta
          <div className="col-md-3 mb-4" key={p.id}>
             {/* Usamos el componente ProductoCard existente, pero aseguramos pasar la función onClick */}
             <div className="card h-100">
                <img src={p.imagen.startsWith('http') ? p.imagen : `/${p.imagen}`} className="card-img-top" alt={p.nombre} onError={(e) => e.target.src='https://via.placeholder.com/300'} />
                <div className="card-body">
                  <h5 className="card-title">{p.nombre}</h5>
                  <p className="text-muted">{p.categoria}</p>
                  <p className="fw-bold">${p.precio.toLocaleString('es-CL')}</p>
                  <button className="btn btn-primary w-100" onClick={() => agregarAlCarrito(p.id)}>Añadir</button>
                </div>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default ProductosPage;