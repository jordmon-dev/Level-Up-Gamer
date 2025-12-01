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

import ProtectedRoute from "./components/ProtectedRoute";

// Estas dos viven en src/admin/pages
import AdminDashboardPage from "./admin/pages/AdminDashboardPage";
import AdminProductosPage from "./admin/pages/AdminProductosPage";
import AdminLayout from "./admin/components/AdminLayout";


// Estas dos viven en src/pages
import AdminProductoFormPage from "./pages/AdminProductoFormPage";
import AdminOrdenesPage from "./pages/AdminOrdenesPage";


import { getProducts } from './services/ProductService';
import { getOrders } from './services/OrderService';

function App() {
  const [carrito, setCarrito] = useState(() => {
    try {
      const guardado = localStorage.getItem('carrito');
      return guardado ? JSON.parse(guardado) : [];
    } catch (e) { return []; }
  });

  const [usuario, setUsuario] = useState(() => {
    try {
      const guardado = localStorage.getItem('usuarioLogueado');
      return guardado ? JSON.parse(guardado) : null;
    } catch (e) { return null; }
  });

  const [productos, setProductos] = useState([]);
  const [ordenes, setOrdenes] = useState([]);

  const cargarProductos = async () => {
    try {
      const response = await getProducts();
      setProductos(response.data);
    } catch (error) { console.error(error); }
  };

  const cargarOrdenes = async () => {
    if (usuario && usuario.rol === 'ADMIN') {
        try {
          const response = await getOrders();
          setOrdenes(response.data);
        } catch (error) { console.error(error); }
    }
  };

  useEffect(() => {
    cargarProductos();
    cargarOrdenes();
  }, [usuario]);

  useEffect(() => { localStorage.setItem('carrito', JSON.stringify(carrito)); }, [carrito]);

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
    if (producto && producto.stock > 0) {
        const itemExistente = carrito.find(item => item.id === id);
        if (itemExistente) {
           setCarrito(prev => prev.map(item => item.id === id ? {...item, cantidad: (item.cantidad || 1) + 1} : item));
        } else {
           setCarrito(prev => [...prev, { ...producto, cantidad: 1 }]); 
        }
        alert("Producto agregado al carrito");
    } else {
        alert("Producto sin stock");
    }
  };

  const eliminarDelCarrito = (id) => setCarrito(prev => prev.filter(item => item.id !== id));
  
  const actualizarCantidad = (id, cantidad) => {
    setCarrito(prev => prev.map(item => item.id === id ? { ...item, cantidad: Math.max(1, cantidad) } : item));
  };

  const vaciarCarrito = () => {
    setCarrito([]);
    localStorage.removeItem('carrito');
  };

  const totalItems = carrito.reduce((a, c) => a + (c.cantidad || 1), 0);

  return (
    <Routes>
      <Route path="/" element={<><Navbar cantidadCarrito={totalItems} usuario={usuario} logout={logout} /><HomePage productos={productos} agregarAlCarrito={agregarAlCarrito} /><Footer /></>} />
      <Route path="/productos" element={<><Navbar cantidadCarrito={totalItems} usuario={usuario} logout={logout} /><ProductosPage productos={productos} agregarAlCarrito={agregarAlCarrito} /><Footer /></>} />
      <Route path="/producto/:id" element={<><Navbar cantidadCarrito={totalItems} usuario={usuario} logout={logout} /><ProductoDetallePage productos={productos} agregarAlCarrito={agregarAlCarrito} /><Footer /></>} />
      <Route path="/login" element={<><Navbar cantidadCarrito={totalItems} usuario={usuario} logout={logout} /><LoginPage login={login} /><Footer /></>} />
      <Route path="/registro" element={<><Navbar cantidadCarrito={totalItems} usuario={usuario} logout={logout} /><RegistroPage /><Footer /></>} />
      <Route path="/carrito" element={<><Navbar cantidadCarrito={totalItems} usuario={usuario} logout={logout} /><CarritoPage carrito={carrito} eliminarDelCarrito={eliminarDelCarrito} actualizarCantidad={actualizarCantidad} /><Footer /></>} />
      <Route path="/checkout" element={<><Navbar cantidadCarrito={totalItems} usuario={usuario} logout={logout} /><CheckoutPage carrito={carrito} vaciarCarrito={vaciarCarrito} usuario={usuario} /><Footer /></>} />
      <Route path="/compra-exitosa" element={<><Navbar cantidadCarrito={totalItems} usuario={usuario} logout={logout} /><CompraExitosaPage /><Footer /></>} />
      <Route path="/contacto" element={<><Navbar cantidadCarrito={totalItems} usuario={usuario} logout={logout} /><ContactoPage /><Footer /></>} />
      <Route path="/nosotros" element={<><Navbar cantidadCarrito={totalItems} usuario={usuario} logout={logout} /><NosotrosPage /><Footer /></>} />
      <Route path="/blogs" element={<><Navbar cantidadCarrito={totalItems} usuario={usuario} logout={logout} /><BlogsPage /><Footer /></>} />

      <Route element={<ProtectedRoute usuario={usuario} soloAdmin={true} />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboardPage productos={productos} ordenes={ordenes} />} /> 
          <Route path="dashboard" element={<AdminDashboardPage productos={productos} ordenes={ordenes} />} />
          <Route path="productos" element={<AdminProductosPage productos={productos} recargarProductos={cargarProductos} />} />
          <Route path="productos/nuevo" element={<AdminProductoFormPage recargarProductos={cargarProductos} />} />
          <Route path="productos/editar/:id" element={<AdminProductoFormPage recargarProductos={cargarProductos} />} />
          <Route path="ordenes" element={<AdminOrdenesPage ordenes={ordenes} />} />
        </Route>
      </Route>
    </Routes>
  );
}
export default App;