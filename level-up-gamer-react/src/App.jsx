// src/App.jsx
import React, { useState, useEffect } from 'react'; 
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductosPage from './pages/ProductosPage';
import LoginPage from './pages/LoginPage';
import RegistroPage from './pages/RegistroPage';
import CarritoPage from './pages/CarritoPage';
import ContactoPage from './pages/ContactoPage';
import NosotrosPage from './pages/NosotrosPage';
import BlogsPage from './pages/BlogsPage';
import ProductoDetallePage from './pages/ProductoDetallePage';
import CheckoutPage from './pages/CheckoutPage';
import CompraExitosaPage from './pages/CompraExitosaPage';

import AdminLayout from './admin/components/AdminLayout';
import AdminDashboardPage from './admin/pages/AdminDashboardPage';
import AdminProductosPage from './admin/pages/AdminProductosPage';
import AdminProductoFormPage from './admin/pages/AdminProductoFormPage';

import { productos as initialProducts } from './data'; 

function App() {
  const [carrito, setCarrito] = useState([]);
  // Estado global de productos (inicia con los datos de data.js)
  const [productos, setProductos] = useState(initialProducts);

  useEffect(() => {
    const carritoGuardado = JSON.parse(localStorage.getItem('carrito') || '[]');
    setCarrito(carritoGuardado);
  }, []);

  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarContadorNavbar(carrito.length);
  }, [carrito]);

  // --- CRUD PRODUCTOS ---
  const agregarProducto = (nuevo) => {
    const productoConId = { ...nuevo, id: Date.now() }; // ID temporal único
    setProductos([...productos, productoConId]);
  };

  const editarProducto = (editado) => {
    setProductos(productos.map(p => (p.id === editado.id ? editado : p)));
  };

  const eliminarProducto = (id) => {
    setProductos(productos.filter(p => p.id !== id));
  };
  // ----------------------

  const agregarAlCarrito = (id) => {
    const producto = productos.find(p => p.id === id);
    if (producto && producto.stock > 0) {
      const { stock, ...prod } = producto; 
      setCarrito(prev => [...prev, prod]); 
    } else {
      alert("Producto sin stock o no encontrado");
    }
  };

  const vaciarCarrito = () => {
    setCarrito([]);
    localStorage.removeItem('carrito');
  };

  const actualizarContadorNavbar = (num) => {
    const el = document.getElementById('cart-count');
    if (el) el.textContent = num;
  };

  return (
    <Routes>
      {/* Tienda Pública - Pasamos 'productos' como prop */}
      <Route path="/" element={<><Navbar cantidadCarrito={carrito.length} /><HomePage productos={productos} agregarAlCarrito={agregarAlCarrito} /><Footer /></>} />
      <Route path="/productos" element={<><Navbar cantidadCarrito={carrito.length} /><ProductosPage productos={productos} agregarAlCarrito={agregarAlCarrito} /><Footer /></>} />
      <Route path="/producto/:id" element={<><Navbar cantidadCarrito={carrito.length} /><ProductoDetallePage productos={productos} agregarAlCarrito={agregarAlCarrito} /><Footer /></>} />
      
      {/* Rutas Estándar */}
      <Route path="/login" element={<><Navbar cantidadCarrito={carrito.length} /><LoginPage /><Footer /></>} />
      <Route path="/registro" element={<><Navbar cantidadCarrito={carrito.length} /><RegistroPage /><Footer /></>} />
      <Route path="/carrito" element={<><Navbar cantidadCarrito={carrito.length} /><CarritoPage /><Footer /></>} />
      <Route path="/checkout" element={<><Navbar cantidadCarrito={carrito.length} /><CheckoutPage carrito={carrito} vaciarCarrito={vaciarCarrito} /><Footer /></>} />
      <Route path="/compra-exitosa" element={<><Navbar cantidadCarrito={carrito.length} /><CompraExitosaPage /><Footer /></>} />
      <Route path="/contacto" element={<><Navbar cantidadCarrito={carrito.length} /><ContactoPage /><Footer /></>} />
      <Route path="/nosotros" element={<><Navbar cantidadCarrito={carrito.length} /><NosotrosPage /><Footer /></>} />
      <Route path="/blogs" element={<><Navbar cantidadCarrito={carrito.length} /><BlogsPage /><Footer /></>} />

      {/* Rutas Admin */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboardPage />} /> 
        <Route path="dashboard" element={<AdminDashboardPage />} />
        <Route path="productos" element={<AdminProductosPage productos={productos} eliminarProducto={eliminarProducto} />} />
        <Route path="productos/nuevo" element={<AdminProductoFormPage productos={productos} agregarProducto={agregarProducto} />} />
        <Route path="productos/editar/:id" element={<AdminProductoFormPage productos={productos} editarProducto={editarProducto} />} />
      </Route>
    </Routes>
  );
}
export default App;