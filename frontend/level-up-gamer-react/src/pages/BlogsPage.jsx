// src/pages/BlogsPage.jsx
import React from 'react';

function BlogsPage() {
  // Datos simulados (puedes moverlos a data.js si prefieres)
  const blogPosts = [
    {
      id: 1,
      titulo: "Los 5 juegos más esperados del 2024",
      imagen: "https://via.placeholder.com/400x250/333/fff?text=Juegos+2024",
      resumen: "Descubre los títulos más anticipados que llegarán este año a todas las plataformas.",
      fecha: "15 Enero 2024",
      autor: "Carlos Rodríguez",
      categoria: "Noticias"
    },
    {
      id: 2,
      titulo: "Cómo optimizar tu setup gaming",
      imagen: "https://via.placeholder.com/400x250/333/fff?text=Setup+Gaming",
      resumen: "Guía completa para mejorar tu experiencia de juego con simples ajustes de hardware.",
      fecha: "10 Enero 2024",
      autor: "Ana Martínez",
      categoria: "Guías"
    },
    {
      id: 3,
      titulo: "Review: HyperX Cloud II - ¿Vale la pena?",
      imagen: "https://via.placeholder.com/400x250/333/fff?text=HyperX+Review",
      resumen: "Análisis detallado de los auriculares más populares del mercado tras 3 meses de uso.",
      fecha: "28 Diciembre 2023",
      autor: "Carlos Rodríguez",
      categoria: "Reviews"
    },
    {
      id: 4,
      titulo: "Torneo Fortnite: Inscripciones Abiertas",
      imagen: "https://via.placeholder.com/400x250/333/fff?text=Torneo+Fortnite",
      resumen: "Participa en nuestro torneo mensual con premios increíbles para los primeros lugares.",
      fecha: "05 Enero 2024",
      autor: "Diego Fernández",
      categoria: "Eventos"
    }
  ];

  return (
    <div className="container mt-5">
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold">Blog Level-Up Gamer</h1>
        <p className="lead">Noticias, tips y novedades del mundo gaming</p>
      </div>

      <div className="row">
        {blogPosts.map(post => (
          <div className="col-lg-4 col-md-6 mb-4" key={post.id}>
            <div className="card h-100 shadow-sm hover-card">
              <img src={post.imagen} className="card-img-top" alt={post.titulo} />
              <div className="card-body">
                <div className="mb-2">
                  <span className="badge bg-primary">{post.categoria}</span>
                </div>
                <h5 className="card-title">{post.titulo}</h5>
                <p className="card-text text-muted">{post.resumen}</p>
              </div>
              <div className="card-footer bg-white border-top-0">
                <div className="d-flex justify-content-between align-items-center small text-muted">
                  <span><i className="far fa-calendar me-1"></i>{post.fecha}</span>
                  <span><i className="far fa-user me-1"></i>{post.autor}</span>
                </div>
                <button className="btn btn-outline-primary w-100 mt-3">Leer más</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Newsletter */}
      <div className="row py-5">
        <div className="col-lg-8 mx-auto">
          <div className="card bg-dark text-white border-primary p-4 text-center">
            <h3>¡No te pierdas nada!</h3>
            <p>Suscríbete a nuestro newsletter para recibir las últimas novedades.</p>
            <div className="input-group mb-3 w-75 mx-auto">
              <input type="email" className="form-control" placeholder="Tu email..." />
              <button className="btn btn-primary" type="button">Suscribirse</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogsPage;