// src/admin/pages/AdminProductoFormPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
// Importamos los servicios reales
import { createProduct, updateProduct, getProductById } from '../services/ProductService';


function AdminProductoFormPage({ recargarProductos }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const esEdicion = !!id;

  const [formData, setFormData] = useState({
    nombre: '',
    precio: '',
    categoria: '',
    stock: '',
    imagen: '',
    descripcion: '',
    codigo: ''
  });

  // Cargar datos si es edición
  useEffect(() => {
    if (esEdicion) {
      const cargarProducto = async () => {
        try {
          const response = await getProductById(id);
          setFormData(response.data);
        } catch (error) {
          console.error("Error al cargar producto:", error);
          alert("No se pudo cargar el producto para editar.");
          navigate('/admin/productos');
        }
      };
      cargarProducto();
    }
  }, [esEdicion, id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Asegurar tipos de datos correctos para el backend Java
    const productoProcesado = {
      ...formData,
      precio: parseInt(formData.precio),
      stock: parseInt(formData.stock)
    };

    try {
      if (esEdicion) {
        await updateProduct(id, productoProcesado);
        alert('¡Producto actualizado correctamente en la Base de Datos!');
      } else {
        await createProduct(productoProcesado);
        alert('¡Producto creado correctamente en la Base de Datos!');
      }
      
      // IMPORTANTE: Avisar a App.jsx que recargue la lista desde el servidor
      if (recargarProductos) recargarProductos();
      
      navigate('/admin/productos');

    } catch (error) {
      console.error("Error al guardar:", error);
      alert("Hubo un error al guardar el producto. Revisa la consola.");
    }
  };

  return (
    <div className="container">
      <h2 className="mb-4">{esEdicion ? 'Editar Producto' : 'Nuevo Producto'}</h2>
      <div className="card shadow">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Nombre</label>
                <input type="text" className="form-control" name="nombre" value={formData.nombre} onChange={handleChange} required />
              </div>
              <div className="col-md-6">
                <label className="form-label">Código (SKU)</label>
                <input type="text" className="form-control" name="codigo" value={formData.codigo} onChange={handleChange} />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-4">
                <label className="form-label">Precio</label>
                <input type="number" className="form-control" name="precio" value={formData.precio} onChange={handleChange} required min="1" />
              </div>
              <div className="col-md-4">
                <label className="form-label">Stock</label>
                <input type="number" className="form-control" name="stock" value={formData.stock} onChange={handleChange} required min="0" />
              </div>
              <div className="col-md-4">
                <label className="form-label">Categoría</label>
                <select className="form-select" name="categoria" value={formData.categoria} onChange={handleChange} required>
                  <option value="">Selecciona...</option>
                  <option value="Consolas">Consolas</option>
                  <option value="Juegos de Mesa">Juegos de Mesa</option>
                  <option value="Accesorios">Accesorios</option>
                  <option value="Sillas Gamers">Sillas Gamers</option>
                  <option value="Computadores Gamers">Computadores Gamers</option>
                </select>
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">URL Imagen</label>
              <input type="text" className="form-control" name="imagen" placeholder="https://..." value={formData.imagen} onChange={handleChange} />
            </div>

            <div className="mb-3">
              <label className="form-label">Descripción</label>
              <textarea className="form-control" name="descripcion" rows="3" value={formData.descripcion} onChange={handleChange}></textarea>
            </div>

            <div className="d-flex justify-content-between">
              <Link to="/admin/productos" className="btn btn-secondary">Cancelar</Link>
              <button type="submit" className="btn btn-primary">
                <i className="fas fa-save me-2"></i> Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminProductoFormPage;