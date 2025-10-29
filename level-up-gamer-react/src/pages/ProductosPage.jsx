import React, { useState } from 'react'; // Importamos useState para manejar el estado de los filtros
import { productos } from '../data.js';
import ProductoCard from '../components/ProductoCard';

function ProductosPage() {
  // Estados para manejar los valores de los filtros
  const [textoBusqueda, setTextoBusqueda] = useState('');
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');

  // Función que se ejecuta cuando cambia el input de búsqueda
  const handleBusquedaChange = (event) => {
    setTextoBusqueda(event.target.value.toLowerCase());
  };

  // Función que se ejecuta cuando cambia el select de categoría
  const handleCategoriaChange = (event) => {
    setCategoriaSeleccionada(event.target.value);
  };

  // Filtramos los productos basándonos en los estados actuales
  const productosFiltrados = productos.filter(producto => {
    const coincideTexto = producto.nombre.toLowerCase().includes(textoBusqueda) ||
                         (producto.descripcion && producto.descripcion.toLowerCase().includes(textoBusqueda)); // Añadimos chequeo por si no hay descripción
    const coincideCategoria = categoriaSeleccionada === '' || producto.categoria === categoriaSeleccionada;
    return coincideTexto && coincideCategoria;
  });

  // Obtenemos las categorías únicas para el dropdown (select)
  const categorias = [...new Set(productos.map(p => p.categoria))];

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Nuestros Productos</h1>

      {/* Filtros (tomado de productos.html) */}
      <div className="row mb-4">
        <div className="col-md-6">
          <input 
            type="text" 
            id="buscador" 
            className="form-control" 
            placeholder="Buscar productos..." 
            value={textoBusqueda} // Conectamos el valor al estado
            onChange={handleBusquedaChange} // Conectamos el cambio al manejador
          />
        </div>
        <div className="col-md-6">
          <select 
            id="filtro-categoria" 
            className="form-select" 
            value={categoriaSeleccionada} // Conectamos el valor al estado
            onChange={handleCategoriaChange} // Conectamos el cambio al manejador
          >
            <option value="">Todas las categorías</option>
            {/* Generamos las opciones de categoría dinámicamente */}
            {categorias.map(categoria => (
              <option key={categoria} value={categoria}>{categoria}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Lista de Productos */}
      <div className="row" id="lista-productos">
        {/* Usamos el array filtrado para mostrar los productos */}
        {productosFiltrados.length > 0 ? (
          productosFiltrados.map(producto => (
            // Reutilizamos nuestro componente ProductoCard
            <ProductoCard key={producto.id} producto={producto} /> 
          ))
        ) : (
          // Mensaje si no hay productos que coincidan
          <div className="col-12 text-center py-5">
            <h4>No se encontraron productos</h4>
            <p>Intenta ajustar tus filtros de búsqueda.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductosPage;