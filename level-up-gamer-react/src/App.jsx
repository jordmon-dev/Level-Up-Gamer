// src/App.jsx

import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';


import HomePage from './pages/HomePage';
import ProductosPage from './pages/ProductosPage';
// ¡Aquí estaba el error "pagesGenia"!
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/productos" element={<ProductosPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;