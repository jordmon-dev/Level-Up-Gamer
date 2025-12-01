// src/admin/pages/AdminDashboardPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

// Ahora recibimos los datos reales como 'props'
function AdminDashboardPage({ productos, ordenes }) {
  
  // Usamos los datos reales para los contadores (si no hay datos, mostramos 0)
  const numeroCompras = ordenes ? ordenes.length : 0;
  const numeroProductos = productos ? productos.length : 0;
  const numeroUsuarios = 1; // Este queda fijo por ahora (o podrías implementar cargarUsuarios si quisieras)

  // Componente interno para las tarjetas de resumen
  const SummaryCard = ({ title, value, icon, bgColor }) => (
    <div className="col-md-4 mb-4">
      <div className={`card text-white shadow h-100 bg-${bgColor}`}>
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h5 className="card-title mb-0">{title}</h5>
              <p className="display-6 fw-bold">{value}</p>
            </div>
            <i className={`fas ${icon} fa-3x opacity-75`}></i>
          </div>
        </div>
      </div>
    </div>
  );

  // Componente interno para los accesos directos
   const NavCard = ({ title, description, icon, linkTo }) => (
     <div className="col-lg-4 col-md-6 mb-4">
       <div className="card h-100 shadow-sm admin-nav-card">
        <Link to={linkTo} className="text-decoration-none text-dark"> 
          <div className="card-body text-center">
            <i className={`fas ${icon} fa-3x mb-3 text-primary`}></i>
            <h5 className="card-title mb-2">{title}</h5>
            <p className="card-text text-muted small">{description}</p>
          </div>
         </Link>
       </div>
     </div>
   );

  return (
    <div>
      <h2 className="mb-4">Dashboard</h2>
      <p className="text-muted mb-4">Resumen de las actividades en tiempo real</p>

      {/* Tarjetas de Resumen con Datos Reales */}
      <div className="row">
        <SummaryCard 
          title="Órdenes" 
          value={numeroCompras} 
          icon="fa-shopping-cart" 
          bgColor="primary" 
        />
        <SummaryCard 
          title="Productos" 
          value={numeroProductos} 
          icon="fa-box" 
          bgColor="success" 
        />
        <SummaryCard 
          title="Usuarios" 
          value={numeroUsuarios} 
          icon="fa-users" 
          bgColor="warning" 
        />
      </div>

      {/* Accesos Directos */}
      <h3 className="mt-5 mb-4">Accesos Directos</h3>
       <div className="row">
         <NavCard 
           title="Gestión de Órdenes" 
           description="Revisa el historial de compras realizadas por los clientes."
           icon="fa-file-invoice" 
           linkTo="/admin/ordenes" 
         />
          <NavCard 
           title="Gestión de Productos" 
           description="Añade, edita o elimina productos del catálogo."
           icon="fa-box" 
           linkTo="/admin/productos"
         />
          <NavCard 
           title="Ver Tienda" 
           description="Ir a la página principal como la vería un cliente."
           icon="fa-store" 
           linkTo="/" 
         />
       </div>
    </div>
  );
}

export default AdminDashboardPage;