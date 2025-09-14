// Datos de los posts del blog
const blogPosts = [
  {
    id: 1,
    titulo: "Los 5 juegos más esperados del 2024",
    imagen: "https://via.placeholder.com/400x250/333/fff?text=Juegos+2024",
    resumen: "Descubre los títulos más anticipados que llegarán este año a todas las plataformas.",
    contenido: "El 2024 promete ser un año increíble para los gamers. Con lanzamientos como...",
    fecha: "15 Enero 2024",
    autor: "Carlos Rodríguez",
    categoria: "Noticias"
  },
  {
    id: 2,
    titulo: "Cómo optimizar tu setup gaming",
    imagen: "https://via.placeholder.com/400x250/333/fff?text=Setup+Gaming",
    resumen: "Guía completa para mejorar tu experiencia de juego con simples ajustes.",
    contenido: "Un buen setup puede marcar la diferencia entre una experiencia mediocre y una extraordinaria...",
    fecha: "10 Enero 2024",
    autor: "Ana Martínez",
    categoria: "Guías"
  },
  {
    id: 3,
    titulo: "Torneo Fortnite: Abiertas las inscripciones",
    imagen: "https://via.placeholder.com/400x250/333/fff?text=Torneo+Fortnite",
    resumen: "Participa en nuestro torneo mensual con premios increíbles.",
    contenido: "¡La competencia está que arde! Este mes tendremos un torneo especial de Fortnite...",
    fecha: "5 Enero 2024",
    autor: "Diego Fernández",
    categoria: "Eventos"
  },
  {
    id: 4,
    titulo: "Review: HyperX Cloud II - ¿Vale la pena?",
    imagen: "https://via.placeholder.com/400x250/333/fff?text=HyperX+Review",
    resumen: "Análisis detallado de los auriculares más populares del mercado.",
    contenido: "Después de 3 meses de uso intensivo, te contamos todo lo que necesitas saber...",
    fecha: "28 Diciembre 2023",
    autor: "Carlos Rodríguez",
    categoria: "Reviews"
  },
  {
    id: 5,
    titulo: "Tips para mejorar tu K/D ratio",
    imagen: "https://via.placeholder.com/400x250/333/fff?text=Tips+Gaming",
    resumen: "Consejos profesionales para dominar cualquier shooter competitivo.",
    contenido: "¿Cansado de morir constantemente? Estos tips cambiarán tu forma de jugar...",
    fecha: "20 Diciembre 2023",
    autor: "Ana Martínez",
    categoria: "Guías"
  },
  {
    id: 6,
    titulo: "Novedades E3 2024: Lo que se viene",
    imagen: "https://via.placeholder.com/400x250/333/fff?text=E3+2024",
    resumen: "Todo lo anunciado en la feria más importante del gaming.",
    contenido: "La E3 nunca decepciona y este año trae sorpresas increíbles para todos...",
    fecha: "15 Diciembre 2023",
    autor: "Diego Fernández",
    categoria: "Noticias"
  }
];

// Mostrar posts del blog
function mostrarBlogPosts() {
  const container = document.getElementById('blog-posts');
  if (!container) return;

  container.innerHTML = blogPosts.map(post => `
    <div class="col-lg-4 col-md-6 mb-4">
      <div class="card h-100 blog-card">
        <img src="${post.imagen}" class="card-img-top" alt="${post.titulo}">
        <div class="card-body">
          <span class="badge bg-primary mb-2">${post.categoria}</span>
          <h5 class="card-title">${post.titulo}</h5>
          <p class="card-text">${post.resumen}</p>
          <div class="d-flex justify-content-between align-items-center">
            <small class="text-muted">${post.fecha}</small>
            <small class="text-muted">Por ${post.autor}</small>
          </div>
        </div>
        <div class="card-footer bg-transparent border-0">
          <button class="btn btn-outline-primary w-100" onclick="verPost(${post.id})">
            Leer más <i class="fas fa-arrow-right ms-2"></i>
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

// Ver post completo (redirige a página de detalle)
function verPost(id) {
  // Guardar el ID del post seleccionado para la página de detalle
  localStorage.setItem('postSeleccionado', id);
  window.location.href = 'detalle-blog.html';
}

// Filtrar posts por categoría (opcional para futuras implementaciones)
function filtrarPosts(categoria) {
  const postsFiltrados = categoria 
    ? blogPosts.filter(post => post.categoria === categoria)
    : blogPosts;
  
  mostrarBlogPosts(postsFiltrados);
}

// Inicializar página de blog
document.addEventListener('DOMContentLoaded', function() {
  actualizarCarrito();
  mostrarBlogPosts();
});