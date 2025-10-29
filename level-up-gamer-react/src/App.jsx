import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductosPage from './pages/ProductosPage';
import LoginPage from './pages/LoginPage';
import RegistroPage from './pages/RegistroPage';
import CarritoPage from './pages/CarritoPage';
import { productos as allProducts } from './data'; // Renombramos para claridad
import ContactoPage from './pages/ContactoPage';
import NosotrosPage from './pages/NosotrosPage';
import BlogsPage from './pages/BlogsPage';
import ProductoDetallePage from './pages/ProductoDetallePage';
import AdminLayout from './admin/components/AdminLayout';
import AdminDashboardPage from './admin/pages/AdminDashboardPage';
import AdminProductosPage from './admin/pages/AdminProductosPage';

function App() {
  // ... (estado y funciones del carrito) ...

  return (
    // Quitamos Navbar y Footer de aquí
    <Routes>
      {/* Rutas Públicas (usan Navbar y Footer) */}
      <Route path="/" element={
        <>
          <Navbar cantidadCarrito={carrito.length} />
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
        {/* Ruta índice (ej: /admin o /admin/dashboard) */}
        <Route index element={<AdminDashboardPage />} /> 
        <Route path="dashboard" element={<AdminDashboardPage />} />
        <Route path="productos" element={<AdminProductosPage />} />
        {/* <Route path="ordenes" element={<AdminOrdenesPage />} /> */}
        {/* <Route path="usuarios" element={<AdminUsuariosPage />} /> */}
        {/* <Route path="categorias" element={<AdminCategoriasPage />} /> */}
      </Route>

       {/* Opcional: Ruta para página no encontrada */}
       {/* <Route path="*" element={<NotFoundPage />} /> */}

    </Routes>
  );
}
export default App;