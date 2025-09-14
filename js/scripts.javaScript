// Array de productos de ejemplo
const productos = [
  {
    id: 1,
    nombre: "PlayStation 5",
    precio: 549990,
    imagen: "https://via.placeholder.com/300x200/333/fff?text=PS5",
    categoria: "Consolas"
  },
  {
    id: 2,
    nombre: "Mouse Gamer Logitech G502",
    precio: 49990,
    imagen: "https://via.placeholder.com/300x200/333/fff?text=Mouse+Gamer",
    categoria: "Accesorios"
  },
  {
    id: 3,
    nombre: "Silla Gamer SecretLab",
    precio: 349990,
    imagen: "https://via.placeholder.com/300x200/333/fff?text=Silla+Gamer",
    categoria: "Sillas Gamers"
  }
];

// Carrito de compras
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Función para agregar al carrito (ya existe)
function agregarAlCarrito(id) {
  const producto = productos.find(p => p.id === id);
  if (producto) {
    carrito.push(producto);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCarrito();
    alert(`¡${producto.nombre} agregado al carrito!`);
  }
}

// Función para actualizar contador del carrito (ya existe)
function actualizarCarrito() {
  const cartCount = document.getElementById('cart-count');
  if (cartCount) {
    cartCount.textContent = carrito.length;
  }
}

// Función para mostrar productos destacados (solo en index.html)
function mostrarProductosDestacados() {
  const container = document.getElementById('productos-destacados');
  if (!container) return;

  const productosDestacados = productos.slice(0, 3);
  
  container.innerHTML = productosDestacados.map(producto => `
    <div class="col-md-4 mb-4">
      <div class="card h-100">
        <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
        <div class="card-body">
          <h5 class="card-title">${producto.nombre}</h5>
          <p class="price">$${producto.precio.toLocaleString('es-CL')} CLP</p>
          <button class="btn btn-primary w-100" onclick="agregarAlCarrito(${producto.id})">
            <i class="fas fa-cart-plus me-2"></i>Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

  // Mostrar solo 3 productos destacados
  const productosDestacados = productos.slice(0, 3);
  
  container.innerHTML = productosDestacados.map(producto => `
    <div class="col-md-4 mb-4">
      <div class="card h-100">
        <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
        <div class="card-body">
          <h5 class="card-title">${producto.nombre}</h5>
          <p class="price">$${producto.precio.toLocaleString('es-CL')} CLP</p>
          <button class="btn btn-primary w-100" onclick="agregarAlCarrito(${producto.id})">
            <i class="fas fa-cart-plus me-2"></i>Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

// Llamar a la función cuando se cargue la página
document.addEventListener('DOMContentLoaded', function() {
  actualizarCarrito();
  mostrarProductosDestacados();
});

//Funciones del login acá

// Verificar si el usuario está logueado
function estaLogueado() {
  return localStorage.getItem('usuarioLogueado') !== null;
}

// Obtener información del usuario logueado
function obtenerUsuario() {
  const usuario = localStorage.getItem('usuarioLogueado');
  return usuario ? JSON.parse(usuario) : null;
}

// Cerrar sesión
function cerrarSesion() {
  localStorage.removeItem('usuarioLogueado');
  alert('Sesión cerrada correctamente');
  window.location.href = 'index.html';
}

// Actualizar navbar según estado de login
function actualizarNavbar() {
  const usuario = obtenerUsuario();
  const loginLink = document.querySelector('a[href="login.html"]');
  
  if (usuario && loginLink) {
    loginLink.innerHTML = `<i class="fas fa-user me-1"></i>Cerrar Sesión`;
    loginLink.href = '#';
    loginLink.onclick = function(e) {
      e.preventDefault();
      cerrarSesion();
    };
  }
}

// Inicializar en todas las páginas
document.addEventListener('DOMContentLoaded', function() {
  actualizarCarrito();
  actualizarNavbar();
});