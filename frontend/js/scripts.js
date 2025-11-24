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
    imagen: "",
    categoria: "Accesorios",
    descripcion: "Sensor de alta precisión y botones personalizables."
  },
  {
    id: 3,
    nombre: "Silla Gamer SecretLab Titan",
    precio: 349990,
    imagen: "img/sillagamer.jpg",
    categoria: "Sillas Gamers",
    descripcion: "Diseñada para el máximo confort en sesiones prolongadas."
  },
  {
    id: 4,
    nombre: "Catan",
    precio: 29990,
    imagen: "img/catan.jpg",
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

// js/scripts.js - Funciones globales

console.log('✅ Scripts.js cargado');

// Array de productos ahora viene de data.js
// const productos = [...] // ELIMINAR ESTA LÍNEA

// Carrito de compras
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Función para actualizar el contador del carrito en todas las páginas
function actualizarCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const cartCount = document.getElementById('cart-count');
    
    if (cartCount) {
        cartCount.textContent = carrito.length;
        console.log('🛒 Carrito actualizado:', carrito.length, 'productos');
    }
}

// Función para agregar producto al carrito (mejorada)
function agregarAlCarrito(id) {
    console.log('🛒 Intentando agregar producto ID:', id);
    
    // Verificar que el array productos existe y es accesible
    if (typeof productos === 'undefined' || !productos.length) {
        console.error('❌ Error: Array de productos no disponible');
        alert('Error: No se pueden cargar los productos. Intenta recargar la página.');
        return;
    }
    
    const producto = productos.find(p => p.id === id);
    
    if (producto) {
        carrito.push(producto);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        
        actualizarCarrito();
        
        // Mostrar notificación bonita
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: var(--color-primary);
            color: white;
            padding: 15px;
            border-radius: 5px;
            z-index: 1000;
            animation: slideIn 0.3s ease;
        `;
        notification.innerHTML = `
            <i class="fas fa-check-circle me-2"></i>
            ¡${producto.nombre} agregado al carrito!
        `;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
        
    } else {
        console.error('❌ Producto no encontrado con ID:', id);
        alert('Error: Producto no encontrado');
    }
}

// Función para verificar si el usuario está logueado
function estaLogueado() {
    return localStorage.getItem('usuarioLogueado') !== null;
}

// Función para obtener información del usuario logueado
function obtenerUsuario() {
    const usuario = localStorage.getItem('usuarioLogueado');
    return usuario ? JSON.parse(usuario) : null;
}

// Función para cerrar sesión
function cerrarSesion() {
    localStorage.removeItem('usuarioLogueado');
    alert('Sesión cerrada correctamente');
    window.location.href = 'index.html';
}

// Función para actualizar navbar según estado de login
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
    console.log('📄 Página cargada:', document.title);
    actualizarCarrito();
    actualizarNavbar();
});

// Agregar estilos para la animación
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
`;
document.head.appendChild(style);