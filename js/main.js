// Función para cargar productos destacados
function loadFeaturedProducts() {
    const featuredContainer = document.getElementById('featured-products');
    
    if (!featuredContainer) return;
    
    // Obtener algunos productos destacados (primeros 4)
    const featuredProducts = window.productData ? window.productData.slice(0, 4) : [];
    
    if (featuredProducts.length === 0) {
        featuredContainer.innerHTML = '<p>No hay productos disponibles</p>';
        return;
    }
    
    // Generar HTML para los productos
    featuredContainer.innerHTML = featuredProducts.map(product => `
        <div class="product-card">
            <img src="${product.image || 'https://placehold.co/300x200/1a1a1a/39FF14?text=Producto'}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">$${product.price.toLocaleString('es-CL')} CLP</p>
                <button class="btn-add-cart" data-id="${product.id}">Añadir al Carrito</button>
            </div>
        </div>
    `).join('');
}

// Manejar el toggle del menú en móviles
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    
    // Actualizar contador del carrito
    updateCartCount();
});

// Función para actualizar el contador del carrito
function updateCartCount() {
    const cartCountElements = document.querySelectorAll('.cart-count');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    
    cartCountElements.forEach(element => {
        element.textContent = totalItems;
    });
}

// Manejar agregar al carrito
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn-add-cart')) {
        const productId = e.target.getAttribute('data-id');
        addToCart(productId);
    }
});

// Función para agregar producto al carrito
function addToCart(productId) {
    const product = window.productData.find(p => p.id === productId);
    
    if (!product) return;
    
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    
    // Mostrar mensaje de confirmación
    alert(`¡${product.name} añadido al carrito!`);

    // ... (código existente)

// Actualizar UI basado en autenticación
function updateAuthUI() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const authLink = document.querySelector('a[href="auth.html"]');
    
    if (currentUser && authLink) {
        authLink.textContent = currentUser.email;
        authLink.href = '#';
        authLink.addEventListener('click', function(e) {
            e.preventDefault();
            if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
                localStorage.removeItem('currentUser');
                window.location.reload();
            }
        });
    }
    
    // Mostrar opciones de admin si el usuario es admin
    if (currentUser && currentUser.role === 'admin') {
        const adminLink = document.querySelector('a[href="admin.html"]');
        if (!adminLink) {
            const navMenu = document.querySelector('.nav-menu');
            const newAdminLink = document.createElement('a');
            newAdminLink.href = 'admin.html';
            newAdminLink.className = 'nav-link';
            newAdminLink.textContent = 'Admin';
            
            // Insertar antes del enlace de carrito
            const cartLink = document.querySelector('.cart-btn');
            navMenu.insertBefore(newAdminLink, cartLink);
        }
    }
}

// Llamar a updateAuthUI cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    // ... (código existente)
    updateAuthUI();
});

}