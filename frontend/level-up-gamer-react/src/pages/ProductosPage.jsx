import React, { useState } from 'react';
import ProductoCard from '../components/ProductoCard'; 



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
          <input type="text" className="form-control" placeholder="Buscar productos..." value={textoBusqueda} onChange={handleBusquedaChange} />
        </div>
        <div className="col-md-6">
          <select className="form-select" value={categoriaSeleccionada} onChange={handleCategoriaChange}>
            <option value="">Todas las categorías</option>
            {categorias.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>
      </div>

      <div className="row">
        {productosFiltrados.length > 0 ? (
          productosFiltrados.map(p => (
            // Usamos el componente ya conectado
            <ProductoCard 
              key={p.id} 
              producto={p} 
              agregarAlCarrito={agregarAlCarrito} 
            />
          ))
        ) : (
          <div className="col-12 text-center"><p>No se encontraron productos.</p></div>
        )}
      </div>
    </div>
  );
}

export default ProductosPage;