// js/carrito.js - Funciones del carrito (AHORA usa window.cuponesValidos de data.js)

console.log('✅ Carrito.js cargado');

// Variables globales
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
let cuponAplicado = null;
{}

// Función para agregar producto al carrito (mejorada)
function agregarAlCarrito(id) {
    console.log('Intentando agregar producto ID:', id); // Para debug
    
    // Verificar que el array productos existe y es accesible
    if (typeof productos === 'undefined' || !productos.length) {
        console.error('Error: Array de productos no disponible');
        alert('Error: No se pueden cargar los productos. Intenta recargar la página.');
        return;
    }
    
    const producto = productos.find(p => p.id === id);
    
    if (producto) {
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
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
        console.error('Producto no encontrado con ID:', id);
        alert('Error: Producto no encontrado');
    }
}


// Mostrar items del carrito
function mostrarCarrito() {
    const container = document.getElementById('carrito-items');
    const carritoVacio = document.getElementById('carrito-vacio');
    const btnCheckout = document.getElementById('btn-checkout');

    if (carrito.length === 0) {
        carritoVacio.style.display = 'block';
        container.innerHTML = '';
        btnCheckout.disabled = true;
        return;
    }

    carritoVacio.style.display = 'none';
    btnCheckout.disabled = false;

    // Agrupar productos por ID para manejar cantidades
    const productosAgrupados = {};
    carrito.forEach(producto => {
        if (productosAgrupados[producto.id]) {
            productosAgrupados[producto.id].cantidad += 1;
        } else {
            productosAgrupados[producto.id] = { ...producto, cantidad: 1 };
        }
    });

    container.innerHTML = Object.values(productosAgrupados).map(producto => `
        <div class="row align-items-center mb-4 carrito-item" data-id="${producto.id}">
            <div class="col-md-2">
                <img src="${producto.imagen}" alt="${producto.nombre}" 
                     class="img-fluid rounded" style="max-height: 80px;">
            </div>
            <div class="col-md-4">
                <h6 class="mb-1">${producto.nombre}</h6>
                <small class="text-muted">${producto.categoria || 'Accesorio'}</small>
            </div>
            <div class="col-md-2">
                <span class="price">$${producto.precio.toLocaleString('es-CL')} CLP</span>
            </div>
            <div class="col-md-2">
                <div class="input-group input-group-sm">
                    <button class="btn btn-outline-secondary" 
                            onclick="cambiarCantidad(${producto.id}, -1)">-</button>
                    <input type="number" class="form-control text-center" 
                           value="${producto.cantidad}" min="1" 
                           onchange="actualizarCantidad(${producto.id}, this.value)">
                    <button class="btn btn-outline-secondary" 
                            onclick="cambiarCantidad(${producto.id}, 1)">+</button>
                </div>
            </div>
            <div class="col-md-2 text-end">
                <span class="fw-bold">$${(producto.precio * producto.cantidad).toLocaleString('es-CL')} CLP</span>
                <br>
                <button class="btn btn-link text-danger p-0" 
                        onclick="eliminarProducto(${producto.id})">
                    <i class="fas fa-trash"></i> Eliminar
                </button>
            </div>
        </div>
        <hr>
    `).join('');

    actualizarResumen();
}

// Actualizar resumen de precios
function actualizarResumen() {
    const subtotal = carrito.reduce((total, producto) => total + producto.precio, 0);
    const envio = subtotal > 50000 ? 0 : 3000; // Envío gratis sobre $50.000
    
    let descuento = 0;
    if (cuponAplicado) {
        descuento = subtotal * (cuponAplicado / 100);
    }

    const total = subtotal - descuento + envio;

    document.getElementById('subtotal').textContent = `$${subtotal.toLocaleString('es-CL')} CLP`;
    document.getElementById('descuento').textContent = `-$${descuento.toLocaleString('es-CL')} CLP`;
    document.getElementById('envio').textContent = envio === 0 ? 'Gratis' : `$${envio.toLocaleString('es-CL')} CLP`;
    document.getElementById('total').textContent = `$${total.toLocaleString('es-CL')} CLP`;
}

// Cambiar cantidad de un producto
function cambiarCantidad(id, delta) {
    const productoIndex = carrito.findIndex(p => p.id === id);
    if (productoIndex !== -1) {
        if (delta === -1) {
            // Eliminar una unidad
            const firstIndex = carrito.findIndex(p => p.id === id);
            carrito.splice(firstIndex, 1);
        } else {
            // Agregar una unidad
            const producto = carrito.find(p => p.id === id);
            carrito.push({ ...producto });
        }
        localStorage.setItem('carrito', JSON.stringify(carrito));
        mostrarCarrito();
        actualizarCarrito();
    }
}

// Actualizar cantidad desde input
function actualizarCantidad(id, nuevaCantidad) {
    nuevaCantidad = parseInt(nuevaCantidad);
    if (isNaN(nuevaCantidad) || nuevaCantidad < 1) return;

    const producto = carrito.find(p => p.id === id);
    if (!producto) return;

    // Eliminar todas las instancias del producto
    carrito = carrito.filter(p => p.id !== id);
    
    // Agregar la nueva cantidad
    for (let i = 0; i < nuevaCantidad; i++) {
        carrito.push({ ...producto });
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarrito();
    actualizarCarrito();
}

// Eliminar producto del carrito
function eliminarProducto(id) {
    carrito = carrito.filter(p => p.id !== id);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarrito();
    actualizarCarrito();
}

// Aplicar cupón de descuento
function aplicarCupon() {
    const codigo = document.getElementById('cupon').value.trim().toUpperCase();
    const mensaje = document.getElementById('cupon-mensaje');

    // Usar window.cuponesValidos de data.js
    if (cuponesValidos[codigo]) {
        cuponAplicado = cuponesValidos[codigo];
        mensaje.textContent = `¡Cupón aplicado! ${cuponAplicado}% de descuento`;
        mensaje.style.color = 'green';
        actualizarResumen();
    } else {
        cuponAplicado = null;
        mensaje.textContent = 'Cupón inválido o expirado';
        mensaje.style.color = 'red';
        actualizarResumen();
    }
}

// Procesar compra
function procesarCompra() {
    if (carrito.length === 0) return;

    // Verificar si el usuario está logueado
    const usuarioLogueado = JSON.parse(localStorage.getItem('usuarioLogueado'));
    if (!usuarioLogueado) {
        alert('Debes iniciar sesión para completar la compra');
        window.location.href = 'login.html';
        return;
    }

    // Crear orden de compra
    const orden = {
        id: Date.now(),
        fecha: new Date().toISOString(),
        productos: carrito,
        subtotal: carrito.reduce((total, p) => total + p.precio, 0),
        descuento: cuponAplicado ? carrito.reduce((total, p) => total + p.precio, 0) * (cuponAplicado / 100) : 0,
        envio: carrito.reduce((total, p) => total + p.precio, 0) > 50000 ? 0 : 3000,
        total: 0,
        estado: 'pendiente'
    };

    orden.total = orden.subtotal - orden.descuento + orden.envio;

    // Guardar orden en historial
    const historial = JSON.parse(localStorage.getItem('historialCompras') || '[]');
    historial.push(orden);
    localStorage.setItem('historialCompras', JSON.stringify(historial));

    // Limpiar carrito
    carrito = [];
    localStorage.setItem('carrito', JSON.stringify(carrito));
    cuponAplicado = null;

    // Mostrar mensaje de éxito
    alert(`¡Compra realizada con éxito!\nTotal: $${orden.total.toLocaleString('es-CL')} CLP\nN° de orden: ${orden.id}`);
    
    // Redirigir a inicio
    window.location.href = 'index.html';
}

// Inicializar página de carrito
document.addEventListener('DOMContentLoaded', function() {
    console.log('🛒 Inicializando página de carrito');
    actualizarCarrito();
    mostrarCarrito();
});

