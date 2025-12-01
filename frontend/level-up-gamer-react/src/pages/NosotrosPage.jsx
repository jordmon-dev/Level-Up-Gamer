// src/pages/NosotrosPage.jsx
import React from 'react';

function NosotrosPage() {
  return (
    <div className="container mt-5">
      <div className="row align-items-center mb-5">
        <div className="col-lg-6">
          {/* Imagen de ejemplo con placeholder externo */}
          <img 
            src="https://via.placeholder.com/600x400?text=Equipo+Level-Up" 
            alt="Equipo Level-Up" 
            className="img-fluid rounded shadow"
          />
        </div>
        <div className="col-lg-6">
          {/* AÑADIMOS text-primary para asegurar que el color NEÓN se vea */}
          <h1 className="display-4 fw-bold mb-4 text-primary">Sobre Nosotros</h1> 
          <p className="lead mb-4" style={{ color: 'var(--text-main)' }}>
            En <strong>Level-Up Gamer</strong>, nuestra pasión es el gaming. Nacimos en 2024 con la misión de equipar a cada jugador con las mejores herramientas para alcanzar su máximo potencial.
          </p>
          <p className="text-light">
            Somos un equipo de entusiastas de la tecnología y los videojuegos dedicados a buscar los mejores periféricos, consolas y componentes del mercado. Creemos que el equipo adecuado puede marcar la diferencia entre una buena partida y una legendaria.
          </p>
          <div className="mt-4">
            <div className="d-flex align-items-center mb-3">
              <i className="fas fa-check-circle text-primary fa-2x me-3"></i>
              <div>
                <h5 className="mb-0 text-primary">Calidad Garantizada</h5>
                <small className="text-light">Solo trabajamos con las mejores marcas del mercado.</small>
              </div>
            </div>
            <div className="d-flex align-items-center">
              <i className="fas fa-shipping-fast text-primary fa-2x me-3"></i>
              <div>
                <h5 className="mb-0 text-primary">Envíos Rápidos</h5>
                <small className="text-light">Despachamos a todo Chile en tiempo récord.</small>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sección de Misión/Visión */}
      <div className="row mt-5">
        <div className="col-md-6 mb-4">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body text-center p-5">
              <div className="mb-3 text-primary">
                <i className="fas fa-bullseye fa-3x"></i>
              </div>
              <h3 className="text-primary">Nuestra Misión</h3>
              <p className="text-light">Proveer tecnología de punta y asesoramiento experto para que cada gamer pueda construir su setup soñado sin complicaciones.</p>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body text-center p-5">
              <div className="mb-3 text-primary">
                <i className="fas fa-eye fa-3x"></i>
              </div>
              <h3 className="text-primary">Nuestra Visión</h3>
              <p className="text-light">Ser la tienda referente en Latinoamérica para la comunidad gaming, reconocida por nuestra excelencia en servicio y catálogo innovador.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NosotrosPage;