// ===== DATOS GLOBALES =====
const productos = [
    {
        id: 1,
        codigo: "CQ001",
        nombre: "PlayStation 5",
        precio: 549990,
        categoria: "Consolas",
        imagen: "img/ps5.jpg",
        descripcion: "La consola de última generación de Sony, que ofrece gráficos impresionantes y tiempos de carga ultrarrápidos para una experiencia de juego inmersiva.",
        destacado: true,
        stock: 15
    },
    {
        id: 2,
        codigo: "CG001",
        nombre: "PC Gamer ASUS ROG Strix",
        precio: 1299990,
        categoria: "Computadores Gamers",
        imagen: "img/pc-gamer.jpg",
        descripcion: "Un potente equipo diseñado para los gamers más exigentes, equipado con los últimos componentes para ofrecer un rendimiento excepcional en cualquier juego.",
        destacado: true,
        stock: 8
    },
    {
        id: 3,
        codigo: "AC002",
        nombre: "Auriculares Gamer HyperX Cloud II",
        precio: 79990,
        categoria: "Accesorios",
        imagen: "img/auriculares.jpg",
        descripcion: "Proporcionan un sonido envolvente de calidad con un micrófono desmontable y almohadillas de espuma viscoelástica para mayor comodidad durante largas sesiones de juego.",
        destacado: true,
        stock: 20
    },
    {
        id: 4,
        codigo: "SG001",
        nombre: "Silla Gamer SecretLab Titan",
        precio: 349990,
        categoria: "Sillas Gamers",
        imagen: "img/silla-gamer.jpg",
        descripcion: "Diseñada para el máximo confort, esta silla ofrece un soporte ergonómico y personalización ajustable para sesiones de juego prolongadas.",
        destacado: true,
        stock: 12
    },
    {
        id: 5,
        codigo: "JM001",
        nombre: "Catan",
        precio: 29990,
        categoria: "Juegos de Mesa",
        imagen: "img/catan.jpg",
        descripcion: "Un clásico juego de estrategia donde los jugadores compiten por colonizar y expandirse en la isla de Catan. Ideal para 3-4 jugadores.",
        destacado: false,
        stock: 25
    },
    {
        id: 6,
        codigo: "MS001",
        nombre: "Mouse Gamer Logitech G502 HERO",
        precio: 49990,
        categoria: "Mouse",
        imagen: "img/mouse-gamer.jpg",
        descripcion: "Con sensor de alta precisión y botones personalizables, este mouse es ideal para gamers que buscan un control preciso y personalización.",
        destacado: false,
        stock: 18
    },
    {
        id: 7,
        codigo: "AC001",
        nombre: "Controlador Inalámbrico Xbox Series X",
        precio: 59990,
        categoria: "Accesorios",
        imagen: "img/control-xbox.jpg",
        descripcion: "Ofrece una experiencia de juego cómoda con botones mapeables y una respuesta táctil mejorada. Compatible con consolas Xbox y PC.",
        destacado: false,
        stock: 22
    },
    {
        id: 8,
        codigo: "MP001",
        nombre: "Mousepad Razer Goliathus Extended Chroma",
        precio: 29990,
        categoria: "Mousepad",
        imagen: "img/mousepad.jpg",
        descripcion: "Ofrece un área de juego amplia con iluminación RGB personalizable, asegurando una superficie suave y uniforme para el movimiento del mouse.",
        destacado: false,
        stock: 30
    }
];

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
let usuarioActual = JSON.parse(localStorage.getItem('usuarioActual')) || null;

// ===== FUNCIONES DE INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', function() {
    inicializarAplicacion();
});

function inicializarAplicacion() {
    // Cargar la sección home por defecto
    if (!window.location.hash) {
        window.location.hash = '#home';
    }
    
    // Configurar la navegación
    configurarNavegacion();
    
    // Actualizar el contador del carrito
    actualizarContadorCarrito();
    
    // Verificar si hay un usuario logueado
    verificarAutenticacion();
}

function configurarNavegacion() {
    // Navegación por hash (para deep linking)
    window.addEventListener('hashchange', function() {
        const seccion = window.location.hash.substring(1) || 'home';
        mostrarSeccion(seccion);
    });
    
    // Cargar la sección actual al iniciar
    const seccionInicial = window.location.hash.substring(1) || 'home';
    mostrarSeccion(seccionInicial);
}

// ===== FUNCIONES DE NAVEGACIÓN =====
function mostrarSeccion(seccionId) {
    const mainContent = document.getElementById('main-content');
    if (!mainContent) return;
    
    // Ocultar todas las secciones primero
    document.querySelectorAll('.seccion').forEach(sec => {
        sec.classList.remove('active');
    });
    
    // Mostrar la sección solicitada
    const seccion = document.getElementById(seccionId);
    if (seccion) {
        seccion.classList.add('active');
        window.scrollTo(0, 0);
        
        // Ejecutar inicializaciones específicas de la sección
        inicializarSeccion(seccionId);
    } else {
        // Si la sección no existe, redirigir a home
        window.location.hash = '#home';
    }
    
    // Actualizar navegación activa
    actualizarNavegacionActiva(seccionId);
}

function actualizarNavegacionActiva(seccionId) {
    // Actualizar clases activas en la navegación
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('onclick')?.includes(seccionId)) {
            link.classList.add('active');
        }
    });
}

function inicializarSeccion(seccionId) {
    switch(seccionId) {
        case 'home':
            renderizarProductosDestacados();
            break;
        case 'productos':
            renderizarTodosProductos();
            break;
        case 'carrito':
            renderizarCarrito();
            break;
        case 'registro':
            inicializarFormularioRegistro();
            break;
        case 'login':
            inicializarFormularioLogin();
            break;
        // Más inicializaciones para otras secciones
    }
}

// ===== FUNCIONES DE PRODUCTOS =====
function renderizarProductosDestacados() {
    const container = document.getElementById('featured-products');
    if (!container) return;
    
    const productosDestacados = productos.filter(p => p.destacado);
    container.innerHTML = productosDestacados.map(producto => `
        <div class="col-md-3 mb-4">
            <div class="product-card h-100">
                <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}" onerror="this.src='https://via.placeholder.com/300x200?text=Imagen+no+disponible'">
                <div class="card-body">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text text-secondary">${producto.categoria}</p>
                    <p class="price">$${producto.precio.toLocaleString('es-CL')} CLP</p>
                    <button class="btn btn-primary w-100 mb-2" onclick="agregarAlCarrito(${producto.id})">Añadir al carrito</button>
                    <button class="btn btn-outline-light w-100" onclick="mostrarDetalleProducto(${producto.id})">Ver detalles</button>
                </div>
            </div>
        </div>
    `).join('');
}

function renderizarTodosProductos() {
    const container = document.getElementById('productos-container');
    if (!container) return;
    
    container.innerHTML = productos.map(producto => `
        <div class="col-md-4 mb-4">
            <div class="product-card h-100">
                <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}" onerror="this.src='https://via.placeholder.com/300x200?text=Imagen+no+disponible'">
                <div class="card-body">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text text-secondary">${producto.categoria}</p>
                    <p class="price">$${producto.precio.toLocaleString('es-CL')} CLP</p>
                    <div class="d-grid gap-2">
                        <button class="btn btn-primary" onclick="agregarAlCarrito(${producto.id})">Añadir al carrito</button>
                        <button class="btn btn-outline-light" onclick="mostrarDetalleProducto(${producto.id})">Ver detalles</button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

function mostrarDetalleProducto(id) {
    const producto = productos.find(p => p.id === id);
    if (!producto) return;
    
    // Crear modal de detalle de producto
    const modalHTML = `
        <div class="modal fade" id="productoModal" tabindex="-1">
            <div class="modal-dialog modal-lg">
                <div class="modal-content bg-dark text-light">
                    <div class="modal-header border-secondary">
                        <h5 class="modal-title">${producto.nombre}</h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-6">
                                <img src="${producto.imagen}" class="img-fluid rounded" alt="${producto.nombre}" onerror="this.src='https://via.placeholder.com/500x500?text=Imagen+no+disponible'">
                            </div>
                            <div class="col-md-6">
                                <h4 class="text-success">$${producto.precio.toLocaleString('es-CL')} CLP</h4>
                                <p><strong>Categoría:</strong> ${producto.categoria}</p>
                                <p><strong>Código:</strong> ${producto.codigo}</p>
                                <p><strong>Stock disponible:</strong> ${producto.stock} unidades</p>
                                <p>${producto.descripcion}</p>
                                <div class="d-grid mt-4">
                                    <button class="btn btn-primary btn-lg" onclick="agregarAlCarrito(${producto.id}); const modal = bootstrap.Modal.getInstance(document.getElementById('productoModal')); modal.hide();">
                                        Añadir al carrito
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Insertar modal en el DOM si no existe
    let modalContainer = document.getElementById('modal-container');
    if (!modalContainer) {
        modalContainer = document.createElement('div');
        modalContainer.id = 'modal-container';
        document.body.appendChild(modalContainer);
    }
    modalContainer.innerHTML = modalHTML;
    
    // Mostrar el modal
    const modal = new bootstrap.Modal(document.getElementById('productoModal'));
    modal.show();
}

// ===== FUNCIONES DEL CARRITO =====
function agregarAlCarrito(id) {
    const producto = productos.find(p => p.id === id);
    if (!producto) return;
    
    // Verificar stock
    if (producto.stock <= 0) {
        mostrarAlerta('Error', 'Producto sin stock disponible', 'danger');
        return;
    }
    
    const itemExistente = carrito.find(item => item.id === id);
    
    if (itemExistente) {
        if (itemExistente.cantidad >= producto.stock) {
            mostrarAlerta('Error', 'No hay suficiente stock disponible', 'danger');
            return;
        }
        itemExistente.cantidad += 1;
    } else {
        carrito.push({
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            imagen: producto.imagen,
            cantidad: 1
        });
    }
    
    // Guardar en localStorage
    guardarCarrito();
    
    // Actualizar interfaz
    actualizarContadorCarrito();
    
    // Mostrar confirmación
    mostrarAlerta('¡Producto añadido!', `${producto.nombre} se ha añadido al carrito`, 'success');
}

function eliminarDelCarrito(id) {
    carrito = carrito.filter(item => item.id !== id);
    guardarCarrito();
    renderizarCarrito();
}

function actualizarCantidadCarrito(id, cambio) {
    const item = carrito.find(item => item.id === id);
    if (!item) return;
    
    const producto = productos.find(p => p.id === id);
    if (!producto) return;
    
    const nuevaCantidad = item.cantidad + cambio;
    
    if (nuevaCantidad < 1) {
        eliminarDelCarrito(id);
        return;
    }
    
    if (nuevaCantidad > producto.stock) {
        mostrarAlerta('Error', 'No hay suficiente stock disponible', 'danger');
        return;
    }
    
    item.cantidad = nuevaCantidad;
    guardarCarrito();
    renderizarCarrito();
}

function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function actualizarContadorCarrito() {
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        const totalItems = carrito.reduce((total, item) => total + item.cantidad, 0);
        cartCount.textContent = totalItems;
    }
}

function renderizarCarrito() {
    const container = document.getElementById('carrito-container');
    const totalContainer = document.getElementById('carrito-total');
    
    if (!container || !totalContainer) return;
    
    if (carrito.length === 0) {
        container.innerHTML = `
            <div class="text-center py-5">
                <i class="bi bi-cart-x" style="font-size: 3rem;"></i>
                <h4 class="mt-3">Tu carrito está vacío</h4>
                <p>Explora nuestros productos y añade algunos items a tu carrito</p>
                <button class="btn btn-primary" onclick="mostrarSeccion('productos')">Ver productos</button>
            </div>
        `;
        totalContainer.innerHTML = '';
        return;
    }
    
    container.innerHTML = carrito.map(item => {
        const subtotal = item.precio * item.cantidad;
        return `
            <div class="cart-item">
                <div class="row align-items-center">
                    <div class="col-md-2">
                        <img src="${item.imagen}" alt="${item.nombre}" class="img-fluid rounded" onerror="this.src='https://via.placeholder.com/100x100?text=Imagen'">
                    </div>
                    <div class="col-md-4">
                        <h5>${item.nombre}</h5>
                        <p class="text-secondary mb-0">$${item.precio.toLocaleString('es-CL')} CLP</p>
                    </div>
                    <div class="col-md-3">
                        <div class="d-flex align-items-center">
                            <button class="btn btn-outline-light btn-sm" onclick="actualizarCantidadCarrito(${item.id}, -1)">-</button>
                            <span class="mx-3">${item.cantidad}</span>
                            <button class="btn btn-outline-light btn-sm" onclick="actualizarCantidadCarrito(${item.id}, 1)">+</button>
                        </div>
                    </div>
                    <div class="col-md-2">
                        <h5>$${subtotal.toLocaleString('es-CL')} CLP</h5>
                    </div>
                    <div class="col-md-1">
                        <button class="btn btn-danger btn-sm" onclick="eliminarDelCarrito(${item.id})">
                            <i class="bi bi-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
    
    const total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    totalContainer.innerHTML = `
        <div class="d-flex justify-content-between align-items-center">
            <h4>Total: $${total.toLocaleString('es-CL')} CLP</h4>
            <button class="btn btn-success btn-lg" onclick="realizarCompra()">Finalizar Compra</button>
        </div>
    `;
}

function realizarCompra() {
    if (!usuarioActual) {
        mostrarAlerta('Inicia sesión', 'Debes iniciar sesión para realizar una compra', 'warning');
        mostrarSeccion('login');
        return;
    }
    
    // Simular proceso de compra
    mostrarAlerta('¡Compra realizada!', 'Gracias por tu compra. Tu pedido está siendo procesado.', 'success');
    
    // Vaciar carrito después de la compra
    carrito = [];
    guardarCarrito();
    actualizarContadorCarrito();
    renderizarCarrito();
}

// ===== FUNCIONES DE USUARIO =====
function inicializarFormularioRegistro() {
    const form = document.getElementById('form-registro');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nombre = document.getElementById('nombre').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        
        // Validaciones básicas
        if (password !== confirmPassword) {
            mostrarAlerta('Error', 'Las contraseñas no coinciden', 'danger');
            return;
        }
        
        if (!validarEmail(email)) {
            mostrarAlerta('Error', 'Por favor ingresa un email válido', 'danger');
            return;
        }
        
        // Guardar usuario (simulado)
        const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
        const usuarioExistente = usuarios.find(u => u.email === email);
        
        if (usuarioExistente) {
            mostrarAlerta('Error', 'Este email ya está registrado', 'danger');
            return;
        }
        
        const nuevoUsuario = {
            id: Date.now(),
            nombre,
            email,
            password, // En una app real, esto debería estar encriptado
            fechaRegistro: new Date().toISOString()
        };
        
        usuarios.push(nuevoUsuario);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        
        // Iniciar sesión automáticamente
        usuarioActual = nuevoUsuario;
        localStorage.setItem('usuarioActual', JSON.stringify(nuevoUsuario));
        
        mostrarAlerta('¡Registro exitoso!', 'Tu cuenta ha sido creada correctamente', 'success');
        mostrarSeccion('home');
    });
}

function inicializarFormularioLogin() {
    const form = document.getElementById('form-login');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        
        const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
        const usuario = usuarios.find(u => u.email === email && u.password === password);
        
        if (usuario) {
            usuarioActual = usuario;
            localStorage.setItem('usuarioActual', JSON.stringify(usuario));
            
            mostrarAlerta('¡Bienvenido!', `Hola de nuevo, ${usuario.nombre}`, 'success');
            mostrarSeccion('home');
        } else {
            mostrarAlerta('Error', 'Email o contraseña incorrectos', 'danger');
        }
    });
}

function cerrarSesion() {
    usuarioActual = null;
    localStorage.removeItem('usuarioActual');
    mostrarAlerta('Sesión cerrada', 'Has cerrado sesión correctamente', 'info');
    mostrarSeccion('home');
}

function verificarAutenticacion() {
    const usuario = JSON.parse(localStorage.getItem('usuarioActual'));
    if (usuario) {
        usuarioActual = usuario;
        actualizarUIUsuario();
    }
}

function actualizarUIUsuario() {
    const btnLogin = document.querySelector('a[onclick*="login"]');
    const btnRegistro = document.querySelector('a[onclick*="registro"]');
    const userMenu = document.getElementById('user-menu');
    
    if (usuarioActual) {
        if (btnLogin) btnLogin.style.display = 'none';
        if (btnRegistro) btnRegistro.style.display = 'none';
        
        if (userMenu) {
            userMenu.innerHTML = `
                <div class="dropdown">
                    <button class="btn btn-outline-light dropdown-toggle" type="button" data-bs-toggle="dropdown">
                        <i class="bi bi-person-circle me-2"></i> ${usuarioActual.nombre}
                    </button>
                    <ul class="dropdown-menu dropdown-menu-dark">
                        <li><a class="dropdown-item" href="#">Mi perfil</a></li>
                        <li><a class="dropdown-item" href="#">Mis pedidos</a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item" href="#" onclick="cerrarSesion()">Cerrar sesión</a></li>
                    </ul>
                </div>
            `;
        }
    }
}

// ===== FUNCIONES DE UTILIDAD =====
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function mostrarAlerta(titulo, mensaje, tipo) {
    // Crear elemento de alerta
    const alerta = document.createElement('div');
    alerta.className = `alert alert-${tipo} alert-dismissible fade show`;
    alerta.innerHTML = `
        <strong>${titulo}</strong> ${mensaje}
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="alert"></button>
    `;
    
    // Añadir al contenedor de alertas
    let alertContainer = document.getElementById('alert-container');
    if (!alertContainer) {
        alertContainer = document.createElement('div');
        alertContainer.id = 'alert-container';
        alertContainer.className = 'position-fixed top-0 end-0 p-3';
        alertContainer.style.zIndex = '1050';
        document.body.appendChild(alertContainer);
    }
    
    alertContainer.appendChild(alerta);
    
    // Auto-eliminar después de 5 segundos
    setTimeout(() => {
        if (alerta.parentNode) {
            alerta.classList.remove('show');
            setTimeout(() => alerta.remove(), 150);
        }
    }, 5000);
}

// ===== FUNCIONES PÚBLICAS PARA HTML =====
// Estas funciones se llaman desde los onclick en el HTML
window.mostrarSeccion = mostrarSeccion;
window.agregarAlCarrito = agregarAlCarrito;
window.mostrarDetalleProducto = mostrarDetalleProducto;
window.actualizarCantidadCarrito = actualizarCantidadCarrito;
window.eliminarDelCarrito = eliminarDelCarrito;
window.cerrarSesion = cerrarSesion;

// ===== INICIALIZACIÓN DE SECCIONES =====
function inicializarSeccion(seccionId) {
    switch(seccionId) {
        case 'home':
            renderizarProductosDestacados();
            break;
        case 'productos':
            renderizarTodosProductos();
            inicializarFiltrosProductos();
            break;
        case 'carrito':
            renderizarCarrito();
            break;
        case 'registro':
            inicializarFormularioRegistro();
            break;
        case 'login':
            inicializarFormularioLogin();
            break;
        case 'contacto':
            inicializarFormularioContacto();
            break;
    }
}

function inicializarFiltrosProductos() {
    const buscador = document.getElementById('buscador-productos');
    const filtroCategoria = document.getElementById('filtro-categoria');
    
    if (buscador) {
        buscador.addEventListener('input', filtrarProductos);
    }
    
    if (filtroCategoria) {
        filtroCategoria.addEventListener('change', filtrarProductos);
    }
}

function filtrarProductos() {
    const texto = document.getElementById('buscador-productos').value.toLowerCase();
    const categoria = document.getElementById('filtro-categoria').value;
    
    const productosFiltrados = productos.filter(producto => {
        const coincideTexto = producto.nombre.toLowerCase().includes(texto) || 
                             producto.descripcion.toLowerCase().includes(texto);
        const coincideCategoria = categoria === 'todas' || producto.categoria === categoria;
        
        return coincideTexto && coincideCategoria;
    });
    
    renderizarProductosFiltrados(productosFiltrados);
}

function renderizarProductosFiltrados(productosFiltrados) {
    const container = document.getElementById('productos-container');
    if (!container) return;
    
    if (productosFiltrados.length === 0) {
        container.innerHTML = `
            <div class="col-12 text-center py-5">
                <i class="bi bi-search" style="font-size: 3rem;"></i>
                <h4 class="mt-3">No se encontraron productos</h4>
                <p>Intenta con otros términos de búsqueda o categorías</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = productosFiltrados.map(producto => `
        <div class="col-md-4 mb-4">
            <div class="product-card h-100">
                <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}" onerror="this.src='https://via.placeholder.com/300x200?text=Imagen+no+disponible'">
                <div class="card-body">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text text-secondary">${producto.categoria}</p>
                    <p class="price">$${producto.precio.toLocaleString('es-CL')} CLP</p>
                    <div class="d-grid gap-2">
                        <button class="btn btn-primary" onclick="agregarAlCarrito(${producto.id})">Añadir al carrito</button>
                        <button class="btn btn-outline-light" onclick="mostrarDetalleProducto(${producto.id})">Ver detalles</button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

function inicializarFormularioContacto() {
    const form = document.getElementById('form-contacto');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nombre = document.getElementById('contact-name').value;
        const email = document.getElementById('contact-email').value;
        const asunto = document.getElementById('contact-subject').value;
        const mensaje = document.getElementById('contact-message').value;
        
        if (!validarEmail(email)) {
            mostrarAlerta('Error', 'Por favor ingresa un email válido', 'danger');
            return;
        }
        
        // Simular envío de formulario
        mostrarAlerta('¡Mensaje enviado!', 'Gracias por contactarnos. Te responderemos a la brevedad.', 'success');
        form.reset();
    });
}