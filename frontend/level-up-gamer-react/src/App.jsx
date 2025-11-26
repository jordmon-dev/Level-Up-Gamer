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

// Imports de Seguridad y Admin
import ProtectedRoute from './components/ProtectedRoute'; // <<-- IMPORTANTE
import AdminLayout from './admin/components/AdminLayout';
import AdminDashboardPage from './admin/pages/AdminDashboardPage';
import AdminProductosPage from './admin/pages/AdminProductosPage';
import AdminProductoFormPage from './admin/pages/AdminProductoFormPage';
import AdminOrdenesPage from './admin/pages/AdminOrdenesPage';

// Servicio para cargar productos
import { getProducts } from './services/ProductService';

function App() {
  // --- ESTADOS GLOBALES ---
  const [carrito, setCarrito] = useState([]);
  const [productos, setProductos] = useState([]);
  const [usuario, setUsuario] = useState(null);
  const [ordenes, setOrdenes] = useState([]);

  // 1. Función para cargar productos desde el Backend
  const cargarProductos = async () => {
    try {
      const response = await getProducts();
      setProductos(response.data);
    } catch (error) {
      console.error("Error cargando productos:", error);
    }
  };

  // 2. Carga Inicial
  useEffect(() => {
    cargarProductos(); // Carga productos de la BD real

    const carritoGuardado = JSON.parse(localStorage.getItem('carrito') || '[]');
    const usuarioGuardado = JSON.parse(localStorage.getItem('usuarioLogueado'));
    const ordenesGuardadas = JSON.parse(localStorage.getItem('ordenes') || '[]');
    
    setCarrito(carritoGuardado);
    if (usuarioGuardado) setUsuario(usuarioGuardado);
    setOrdenes(ordenesGuardadas);
  }, []);

  // 3. Persistencia local (Carrito y Órdenes)
  useEffect(() => { localStorage.setItem('carrito', JSON.stringify(carrito)); }, [carrito]);
  useEffect(() => { localStorage.setItem('ordenes', JSON.stringify(ordenes)); }, [ordenes]);

  // --- FUNCIONES ---
  const login = (datosUsuario) => {
    setUsuario(datosUsuario);
    localStorage.setItem('usuarioLogueado', JSON.stringify(datosUsuario));
  };

  const logout = () => {
    setUsuario(null);
    localStorage.removeItem('usuarioLogueado');
    window.location.href = "/";
  };

  const agregarAlCarrito = (id) => {
    const producto = productos.find(p => p.id === id);
    if (producto) {
      if (producto.stock > 0) {
        setCarrito(prev => [...prev, producto]); 
      } else {
        alert("Producto sin stock");
      }
    }
  };

  const vaciarCarrito = () => {
    setCarrito([]);
    localStorage.removeItem('carrito');
  };

  const agregarOrden = (nuevaOrden) => {
    setOrdenes(prev => [nuevaOrden, ...prev]);
  };

  return (
    <Routes>
      {/* --- RUTAS PÚBLICAS --- */}
      <Route path="/" element={<><Navbar cantidadCarrito={carrito.length} usuario={usuario} logout={logout} /><HomePage productos={productos} agregarAlCarrito={agregarAlCarrito} /><Footer /></>} />
      <Route path="/productos" element={<><Navbar cantidadCarrito={carrito.length} usuario={usuario} logout={logout} /><ProductosPage productos={productos} agregarAlCarrito={agregarAlCarrito} /><Footer /></>} />
      <Route path="/producto/:id" element={<><Navbar cantidadCarrito={carrito.length} usuario={usuario} logout={logout} /><ProductoDetallePage productos={productos} agregarAlCarrito={agregarAlCarrito} /><Footer /></>} />
      
      <Route path="/login" element={<><Navbar cantidadCarrito={carrito.length} usuario={usuario} logout={logout} /><LoginPage login={login} /><Footer /></>} />
      <Route path="/registro" element={<><Navbar cantidadCarrito={carrito.length} usuario={usuario} logout={logout} /><RegistroPage /><Footer /></>} />
      <Route path="/carrito" element={<><Navbar cantidadCarrito={carrito.length} usuario={usuario} logout={logout} /><CarritoPage /><Footer /></>} />
      
      <Route path="/checkout" element={<><Navbar cantidadCarrito={carrito.length} usuario={usuario} logout={logout} /><CheckoutPage carrito={carrito} vaciarCarrito={vaciarCarrito} usuario={usuario} agregarOrden={agregarOrden} /><Footer /></>} />
      <Route path="/compra-exitosa" element={<><Navbar cantidadCarrito={carrito.length} usuario={usuario} logout={logout} /><CompraExitosaPage /><Footer /></>} />
      
      <Route path="/contacto" element={<><Navbar cantidadCarrito={carrito.length} usuario={usuario} logout={logout} /><ContactoPage /><Footer /></>} />
      <Route path="/nosotros" element={<><Navbar cantidadCarrito={carrito.length} usuario={usuario} logout={logout} /><NosotrosPage /><Footer /></>} />
      <Route path="/blogs" element={<><Navbar cantidadCarrito={carrito.length} usuario={usuario} logout={logout} /><BlogsPage /><Footer /></>} />

      {/* --- RUTAS ADMIN PROTEGIDAS --- */}
      {/* Aquí aplicamos el componente guardia ProtectedRoute */}
      <Route element={<ProtectedRoute usuario={usuario} soloAdmin={true} />}>
        
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboardPage />} /> 
          <Route path="dashboard" element={<AdminDashboardPage />} />
          
          <Route 
            path="productos" 
            element={<AdminProductosPage productos={productos} recargarProductos={cargarProductos} />} 
          />
          <Route 
            path="productos/nuevo" 
            element={<AdminProductoFormPage recargarProductos={cargarProductos} />} 
          />
          <Route 
            path="productos/editar/:id" 
            element={<AdminProductoFormPage recargarProductos={cargarProductos} />} 
          />
          
          {/* Conectamos el estado real de órdenes */}
          <Route path="ordenes" element={<AdminOrdenesPage ordenes={ordenes} />} />
        </Route>

      </Route>
    </Routes>
  );
}

export default App;