// Array de productos más completo
const productos = [
  {
    id: 1,
    nombre: "PlayStation 5",
    precio: 549990,
    imagen: "https://via.placeholder.com/300x200/333/fff?text=PS5",
    categoria: "Consolas",
    descripcion: "La consola de última generación de Sony con gráficos impresionantes."
  },
  {
    id: 2,
    nombre: "Mouse Gamer Logitech G502",
    precio: 49990,
    imagen: "https://via.placeholder.com/300x200/333/fff?text=Mouse+Gamer",
    categoria: "Accesorios",
    descripcion: "Sensor de alta precisión y botones personalizables."
  },
  {
    id: 3,
    nombre: "Silla Gamer SecretLab Titan",
    precio: 349990,
    imagen: "https://via.placeholder.com/300x200/333/fff?text=Silla+Gamer",
    categoria: "Sillas Gamers",
    descripcion: "Diseñada para el máximo confort en sesiones prolongadas."
  },
  {
    id: 4,
    nombre: "Catan",
    precio: 29990,
    imagen: "https://via.placeholder.com/300x200/333/fff?text=Catan",
    categoria: "Juegos de Mesa",
    descripcion: "Clásico juego de estrategia para 3-4 jugadores."
  },
  {
    id: 5,
    nombre: "Auriculares HyperX Cloud II",
    precio: 79990,
    imagen: "https://via.placeholder.com/300x200/333/fff?text=Auriculares",
    categoria: "Accesorios",
    descripcion: "Sonido envolvente de calidad con micrófono desmontable."
  },
  {
    id: 6,
    nombre: "PC Gamer ASUS ROG Strix",
    precio: 1299990,
    imagen: "https://via.placeholder.com/300x200/333/fff?text=PC+Gamer",
    categoria: "Computadores Gamers",
    descripcion: "Potente equipo para gamers exigentes."
  }
];

// Mostrar todos los productos
function mostrarProductos(productosArray = productos) {
  const container = document.getElementById('lista-productos');
  if (!container) return;

  container.innerHTML = productosArray.map(producto => `
    <div class="col-md-4 mb-4">
      <div class="card h-100">
        <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
        <div class="card-body">
          <h5 class="card-title">${producto.nombre}</h5>
          <p class="text-muted">${producto.categoria}</p>
          <p class="price">$${producto.precio.toLocaleString('es-CL')} CLP</p>
          <p class="card-text">${producto.descripcion}</p>
          <div class="d-grid gap-2">
            <button class="btn btn-primary" onclick="agregarAlCarrito(${producto.id})">
              <i class="fas fa-cart-plus me-2"></i>Agregar al carrito
            </button>
            <button class="btn btn-outline-light" onclick="verDetalle(${producto.id})">
              <i class="fas fa-eye me-2"></i>Ver detalle
            </button>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

// Filtrar productos por búsqueda y categoría
function filtrarProductos() {
  const textoBusqueda = document.getElementById('buscador').value.toLowerCase();
  const categoriaSeleccionada = document.getElementById('filtro-categoria').value;

  const productosFiltrados = productos.filter(producto => {
    const coincideTexto = producto.nombre.toLowerCase().includes(textoBusqueda) ||
                         producto.descripcion.toLowerCase().includes(textoBusqueda);
    const coincideCategoria = categoriaSeleccionada === '' || producto.categoria === categoriaSeleccionada;
    
    return coincideTexto && coincideCategoria;
  });

  mostrarProductos(productosFiltrados);
}

// Ver detalle del producto (redirige a página de detalle)
function verDetalle(id) {
  // Guardar el ID del producto seleccionado para la página de detalle
  localStorage.setItem('productoSeleccionado', id);
  window.location.href = 'detalle-producto.html';
}

// Inicializar página de productos
document.addEventListener('DOMContentLoaded', function() {
  actualizarCarrito();
  mostrarProductos();
});