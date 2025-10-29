// src/App.jsx
import React, { useState, useEffect } from 'react'; // Asegúrate de importar useState y useEffect
import { Routes, Route } from 'react-router-dom';

// Importaciones de componentes y páginas públicas
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

// Importaciones de componentes y páginas del Admin
import AdminLayout from './admin/components/AdminLayout';
import AdminDashboardPage from './admin/pages/AdminDashboardPage';
import AdminProductosPage from './admin/pages/AdminProductosPage';
// (Aquí puedes importar las otras páginas del admin si las creaste)

// Importación de datos (si es necesario aquí, aunque agregarAlCarrito debería usarla)
import { productos as allProducts } from './data'; 

function App() {
  // --- Estado Global del Carrito --- << ¡ESTA PARTE FALTABA! ---
  const [carrito, setCarrito] = useState([]);

  // Cargar carrito desde localStorage al iniciar la app
  useEffect(() => {
    const carritoGuardado = JSON.parse(localStorage.getItem('carrito') || '[]');
    setCarrito(carritoGuardado);
  }, []);

  // Guardar carrito en localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }, [carrito]);

  // --- Función para Añadir al Carrito ---
  const agregarAlCarrito = (productoId) => {
    const productoToAdd = allProducts.find(p => p.id === productoId);
    if (productoToAdd) {
      // Creamos una copia sin la propiedad 'cantidad' si existe (viene de agrupar)
      const { cantidad, ...productoBase } = productoToAdd; 
      setCarrito(prevCarrito => [...prevCarrito, productoBase]); // Añadimos el producto base
      console.log(`${productoToAdd.nombre} añadido al carrito!`);
      actualizarContadorNavbar(carrito.length + 1);
    } else {
      console.error("Producto no encontrado:", productoId);
    }
  };

  // --- Función para actualizar contador ---
  const actualizarContadorNavbar = (cantidad) => {
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
      cartCountElement.textContent = cantidad;
    }
  };

  // Actualiza el contador al cargar y cuando cambia el carrito
  useEffect(() => {
    actualizarContadorNavbar(carrito.length);
  }, [carrito]);
  // --- FIN DE LA LÓGICA DEL CARRITO ---

  return (
    <Routes>
      {/* Rutas Públicas (usan Navbar y Footer) */}
      <Route path="/" element={
        <>
          {/* Ahora 'carrito' sí está definido */}
          <Navbar cantidadCarrito={carrito.length} /> 
          {/* Ahora 'agregarAlCarrito' sí está definido */}
          <HomePage agregarAlCarrito={agregarAlCarrito} /> 
          <Footer />
        </>
      } />
      <Route path="/productos" element={
        <>
          <Navbar cantidadCarrito={carrito.length} />
          <ProductosPage agregarAlCarrito={agregarAlCarrito} />
          <Footer />
        </>
      } />
       <Route path="/producto/:id" element={
        <>
          <Navbar cantidadCarrito={carrito.length} />
          <ProductoDetallePage agregarAlCarrito={agregarAlCarrito} />
          <Footer />
        </>
      } />
      <Route path="/login" element={
        <>
          <Navbar cantidadCarrito={carrito.length} />
          <LoginPage />
          <Footer />
        </>
      } />
      <Route path="/registro" element={
         <>
          <Navbar cantidadCarrito={carrito.length} />
          <RegistroPage />
          <Footer />
        </>
      } />
      <Route path="/carrito" element={
         <>
          <Navbar cantidadCarrito={carrito.length} />
           {/* Ahora 'carrito' y 'setCarrito' sí están definidos */}
          <CarritoPage carritoGlobal={carrito} setCarritoGlobal={setCarrito} />
          <Footer />
        </>
      } />
       <Route path="/contacto" element={
         <>
          <Navbar cantidadCarrito={carrito.length} />
          <ContactoPage />
          <Footer />
        </>
      } />
       <Route path="/nosotros" element={
         <>
          <Navbar cantidadCarrito={carrito.length} />
          <NosotrosPage />
          <Footer />
        </>
      } />
       <Route path="/blogs" element={
         <>
          <Navbar cantidadCarrito={carrito.length} />
          <BlogsPage />
          <Footer />
        </>
      } />

      {/* Rutas de Administración (usan AdminLayout) */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboardPage />} /> 
        <Route path="dashboard" element={<AdminDashboardPage />} />
        <Route path="productos" element={<AdminProductosPage />} />
        {/* (Otras rutas admin...) */}
      </Route>

       {/* (Ruta NotFound opcional...) */}

    </Routes>
  );
}
export default App;