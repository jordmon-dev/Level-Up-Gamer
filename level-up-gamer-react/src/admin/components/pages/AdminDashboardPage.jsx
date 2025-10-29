import React from 'react';
import { Link } from 'react-router-dom';
import { productos } from '../../data'; // Para contar productos

function AdminDashboardPage() {
  // --- Datos de Ejemplo (reemplazar con datos reales más adelante) ---
  const numeroCompras = 1234; // Ejemplo
  const numeroProductos = productos.length; // Usamos la longitud del array importado
  const numeroUsuarios = 890; // Ejemplo

  // --- Componente Reutilizable para Tarjetas de Resumen ---
  const SummaryCard = ({ title, value, icon, bgColor, probability }) => (
    <div className={`col-md-4 mb-4`}>
      <div className={`card text-white shadow h-100 bg-${bgColor}`}>
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h5 className="card-title mb-0">{title}</h5>
              <p className="display-6 fw-bold">{value}</p>
              {probability && <small>Probabilidad de acceso: {probability}%</small>}
            </div>
            <i className={`fas ${icon} fa-3x opacity-75`}></i>
          </div>
        </div>
      </div>
    </div>
  );

  // --- Componente Reutilizable para Tarjetas de Navegación ---
   const NavCard = ({ title, description, icon, linkTo }) => (
     <div className="col-lg-4 col-md-6 mb-4">
       <div className="card h-100 shadow-sm admin-nav-card">
        <Link to={linkTo} className="text-decoration-none text-dark"> {/* Enlace en toda la tarjeta */}
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
      <p className="text-muted mb-4">Resumen de las actividades diarias</p>

      {/* Fila de Tarjetas de Resumen */}
      <div className="row">
        <SummaryCard 
          title="Compras" 
          value={numeroCompras} 
          icon="fa-shopping-cart" 
          bgColor="primary" // Corresponde al azul en Fig. 9
          probability={20} // Como en Fig. 9
        />
        <SummaryCard 
          title="Productos" 
          value={numeroProductos} 
          icon="fa-box" 
          bgColor="success" // Corresponde al verde en Fig. 9
        />
        <SummaryCard 
          title="Usuarios" 
          value={numeroUsuarios} 
          icon="fa-users" 
          bgColor="warning" // Corresponde al amarillo en Fig. 9
        />
      </div>

      {/* Fila de Tarjetas de Navegación */}
      <h3 className="mt-5 mb-4">Accesos Directos</h3>
       <div className="row">
         <NavCard 
           title="Órdenes" 
           description="Gestión y seguimiento de todas las órdenes de compra realizadas."
           icon="fa-file-invoice" 
           linkTo="/admin/ordenes" // Enlace a la sección correspondiente
         />
          <NavCard 
           title="Productos" 
           description="Administrar inventario y detalles de los productos disponibles."
           icon="fa-box" 
           linkTo="/admin/productos"
         />
          <NavCard 
           title="Categorías" 
           description="Organizar productos en categorías para facilitar la navegación."
           icon="fa-tags" 
           linkTo="/admin/categorias"
         />
          <NavCard 
           title="Usuarios" 
           description="Gestión de cuentas de usuario y sus roles dentro del sistema."
           icon="fa-users" 
           linkTo="/admin/usuarios"
         />
          {/* <NavCard 
           title="Reportes" 
           description="Generación de informes detallados sobre las operaciones del sistema."
           icon="fa-chart-line" 
           linkTo="/admin/reportes"
         /> */}
         {/* <NavCard 
           title="Perfil" 
           description="Administración de la información personal y configuraciones de cuenta."
           icon="fa-user-cog" 
           linkTo="/admin/perfil"
         /> */}
          <NavCard 
           title="Tienda" 
           description="Visualizar tu tienda en tiempo real, visualizar los reportes en tiempo."
           icon="fa-store" 
           linkTo="/" // Enlace a la tienda pública
         />
       </div>
    </div>
  );
}

export default AdminDashboardPage;