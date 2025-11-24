// src/App.jsx
import React, { useState, useEffect } from 'react'; 
import { Routes, Route } from 'react-router-dom';

// Imports Públicos
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

// Imports Admin
import AdminLayout from './admin/components/AdminLayout';
import AdminDashboardPage from './admin/pages/AdminDashboardPage';
import AdminProductosPage from './admin/pages/AdminProductosPage';
import AdminProductoFormPage from './admin/pages/AdminProductoFormPage';
import AdminOrdenesPage from './admin/pages/AdminOrdenesPage'; // <<-- NUEVO IMPORT

import { productos as initialProducts } from './data'; 

function App() {
  // --- ESTADOS GLOBALES ---
  const [carrito, setCarrito] = useState([]);
  const [productos, setProductos] = useState(initialProducts);
  const [usuario, setUsuario] = useState(null);
  const [ordenes, setOrdenes] = useState([]); // <<-- ESTADO DE ÓRDENES

  // --- CARGA INICIAL (LocalStorage) ---
  useEffect(() => {
    const carritoGuardado = JSON.parse(localStorage.getItem('carrito') || '[]');
    const usuarioGuardado = JSON.parse(localStorage.getItem('usuarioLogueado'));
    const ordenesGuardadas = JSON.parse(localStorage.getItem('ordenes') || '[]'); // Cargar órdenes
    
    setCarrito(carritoGuardado);
    if (usuarioGuardado) setUsuario(usuarioGuardado);
    setOrdenes(ordenesGuardadas);
  }, []);

  // --- PERSISTENCIA (Guardar cambios) ---
  useEffect(() => { localStorage.setItem('carrito', JSON.stringify(carrito)); }, [carrito]);
  
  useEffect(() => { 
    localStorage.setItem('ordenes', JSON.stringify(ordenes)); // Guardar órdenes
  }, [ordenes]);

  // --- LÓGICA DE USUARIO ---
  const login = (datosUsuario) => {
    setUsuario(datosUsuario);
    localStorage.setItem('usuarioLogueado', JSON.stringify(datosUsuario));
  };

  const logout = () => {
    setUsuario(null);
    localStorage.removeItem('usuarioLogueado');
    window.location.href = "/";
  };

  // --- LÓGICA DE PRODUCTOS (CRUD) ---
  const agregarProducto = (nuevo) => {
    const productoConId = { ...nuevo, id: Date.now() };
    setProductos([...productos, productoConId]);
  };

  const editarProducto = (editado) => {
    setProductos(productos.map(p => (p.id === editado.id ? editado : p)));
  };

  const eliminarProducto = (id) => {
    setProductos(productos.filter(p => p.id !== id));
  };

  // --- LÓGICA DE CARRITO ---
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

  // --- LÓGICA DE ÓRDENES (NUEVO) ---
  const agregarOrden = (nuevaOrden) => {
    setOrdenes(prev => [nuevaOrden, ...prev]); // Agrega la nueva orden al principio de la lista
  };

  return (
    <Routes>
      {/* RUTAS PÚBLICAS */}
      <Route path="/" element={<><Navbar cantidadCarrito={carrito.length} usuario={usuario} logout={logout} /><HomePage productos={productos} agregarAlCarrito={agregarAlCarrito} /><Footer /></>} />
      <Route path="/productos" element={<><Navbar cantidadCarrito={carrito.length} usuario={usuario} logout={logout} /><ProductosPage productos={productos} agregarAlCarrito={agregarAlCarrito} /><Footer /></>} />
      <Route path="/producto/:id" element={<><Navbar cantidadCarrito={carrito.length} usuario={usuario} logout={logout} /><ProductoDetallePage productos={productos} agregarAlCarrito={agregarAlCarrito} /><Footer /></>} />
      
      <Route path="/login" element={<><Navbar cantidadCarrito={carrito.length} usuario={usuario} logout={logout} /><LoginPage login={login} /><Footer /></>} />
      <Route path="/registro" element={<><Navbar cantidadCarrito={carrito.length} usuario={usuario} logout={logout} /><RegistroPage /><Footer /></>} />
      <Route path="/carrito" element={<><Navbar cantidadCarrito={carrito.length} usuario={usuario} logout={logout} /><CarritoPage /><Footer /></>} />
      
      {/* CHECKOUT: Ahora recibe 'agregarOrden' */}
      <Route path="/checkout" element={<><Navbar cantidadCarrito={carrito.length} usuario={usuario} logout={logout} /><CheckoutPage carrito={carrito} vaciarCarrito={vaciarCarrito} usuario={usuario} agregarOrden={agregarOrden} /><Footer /></>} />
      
      <Route path="/compra-exitosa" element={<><Navbar cantidadCarrito={carrito.length} usuario={usuario} logout={logout} /><CompraExitosaPage /><Footer /></>} />
      <Route path="/contacto" element={<><Navbar cantidadCarrito={carrito.length} usuario={usuario} logout={logout} /><ContactoPage /><Footer /></>} />
      <Route path="/nosotros" element={<><Navbar cantidadCarrito={carrito.length} usuario={usuario} logout={logout} /><NosotrosPage /><Footer /></>} />
      <Route path="/blogs" element={<><Navbar cantidadCarrito={carrito.length} usuario={usuario} logout={logout} /><BlogsPage /><Footer /></>} />

      {/* RUTAS ADMIN */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboardPage />} /> 
        <Route path="dashboard" element={<AdminDashboardPage />} />
        
        {/* Productos */}
        <Route path="productos" element={<AdminProductosPage productos={productos} eliminarProducto={eliminarProducto} />} />
        <Route path="productos/nuevo" element={<AdminProductoFormPage productos={productos} agregarProducto={agregarProducto} />} />
        <Route path="productos/editar/:id" element={<AdminProductoFormPage productos={productos} editarProducto={editarProducto} />} />
        
        {/* Órdenes (NUEVO) */}
        <Route path="ordenes" element={<AdminOrdenesPage ordenes={ordenes} />} />
      </Route>
    </Routes>
  );
}
export default App;