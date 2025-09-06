// Variables globales
let currentProducts = [];
let currentCategory = 'all';
let currentSort = 'name-asc';

// Inicializar la tienda
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    setupEventListeners();
    updateCartUI();
});

// Cargar productos
function loadProducts() {
    currentProducts = window.productData || [];
    displayProducts(currentProducts);
}

// Configurar event listeners
function setupEventListeners() {
    // Filtros de categoría
    document.querySelectorAll('.category-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const category = this.getAttribute('data-category');
            filterProductsByCategory(category);
            
            // Actualizar UI
            document.querySelectorAll('.category-link').forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Ordenamiento
    document.querySelector('.sort-select').addEventListener('change', function() {
        currentSort = this.value;
        sortProducts(currentSort);
    });
    
    // Búsqueda
    document.querySelector('.search-btn').addEventListener('click', searchProducts);
    document.querySelector('.search-input').addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            searchProducts();
        }
    });
    
    // Modal de producto
    document.querySelector('.close-modal').addEventListener('click', closeProductModal);
    document.getElementById('overlay').addEventListener('click', closeProductModal);
    
    // Carrito
    document.getElementById('cart-button').addEventListener('click', openCart);
    document.querySelector('.close-cart').addEventListener('click', closeCart);
    document.getElementById('overlay').addEventListener('click', closeCart);
    document.querySelector('.checkout-btn').addEventListener('click', checkout);
}

// Mostrar productos en la grid
function displayProducts(products) {
    const productsGrid = document.getElementById('products-grid');
    const productsCount = document.getElementById('products-count');
    
    if (products.length === 0) {
        productsGrid.innerHTML = '<p class="no-products">No se encontraron productos</p>';
        productsCount.textContent = '0';
        return;
    }
    
    productsCount.textContent = products.length;
    
    productsGrid.innerHTML = products.map(product => `
        <div class="product-card" data-id="${product.id}">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-category">${product.category}</p>
                <p class="product-price">$${product.price.toLocaleString('es-CL')} CLP</p>
                <button class="btn-add-cart" data-id="${product.id}">Añadir al Carrito</button>
                <button class="btn-view-details" data-id="${product.id}">Ver Detalles</button>
            </div>
        </div>
    `).join('');
    
    // Añadir event listeners a los botones
    document.querySelectorAll('.btn-view-details').forEach(btn => {
        btn.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');
            showProductDetails(productId);
        });
    });
    
    document.querySelectorAll('.btn-add-cart').forEach(btn => {
        btn.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');
            addToCart(productId);
        });
    });
}

// Filtrar productos por categoría
function filterProductsByCategory(category) {
    currentCategory = category;
    
    if (category === 'all') {
        displayProducts(window.productData);
        return;
    }
    
    const filteredProducts = window.productData.filter(product => 
        product.category === category
    );
    
    displayProducts(filteredProducts);
}

// Buscar productos
function searchProducts() {
    const searchTerm = document.querySelector('.search-input').value.toLowerCase();
    
    if (!searchTerm) {
        displayProducts(currentCategory === 'all' ? window.productData : 
            window.productData.filter(p => p.category === currentCategory));
        return;
    }
    
    const filteredProducts = window.productData.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
    );
    
    displayProducts(filteredProducts);
}

// Ordenar productos
function sortProducts(sortType) {
    let sortedProducts = [...currentProducts];
    
    switch(sortType) {
        case 'name-asc':
            sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'name-desc':
            sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
            break;
        case 'price-asc':
            sortedProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            sortedProducts.sort((a, b) => b.price - a.price);
            break;
    }
    
    displayProducts(sortedProducts);
}

// Mostrar detalles del producto
function showProductDetails(productId) {
    const product = window.productData.find(p => p.id === productId);
    
    if (!product) return;
    
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="modal-image">
        <div class="modal-info">
            <h2 class="modal-title">${product.name}</h2>
            <p class="modal-category">${product.category}</p>
            <p class="modal-price">$${product.price.toLocaleString('es-CL')} CLP</p>
            <p class="modal-description">${product.description}</p>
            <div class="modal-actions">
                <div class="quantity-control">
                    <button class="quantity-btn" data-action="decrease">-</button>
                    <input type="number" class="quantity-input" value="1" min="1">
                    <button class="quantity-btn" data-action="increase">+</button>
                </div>
                <button class="btn-add-cart modal-add-cart" data-id="${product.id}">Añadir al Carrito</button>
            </div>
        </div>
    `;
    
    // Event listeners para cantidad
    modalBody.querySelector('.quantity-btn[data-action="decrease"]').addEventListener('click', function() {
        const input = modalBody.querySelector('.quantity-input');
        if (input.value > 1) input.value = parseInt(input.value) - 1;
    });
    
    modalBody.querySelector('.quantity-btn[data-action="increase"]').addEventListener('click', function() {
        const input = modalBody.querySelector('.quantity-input');
        input.value = parseInt(input.value) + 1;
    });
    
    // Event listener para añadir al carrito desde el modal
    modalBody.querySelector('.modal-add-cart').addEventListener('click', function() {
        const quantity = parseInt(modalBody.querySelector('.quantity-input').value);
        addToCart(productId, quantity);
        closeProductModal();
    });
    
    // Mostrar modal
    document.getElementById('product-modal').style.display = 'block';
    document.getElementById('overlay').classList.add('active');
}

// Cerrar modal de producto
function closeProductModal() {
    document.getElementById('product-modal').style.display = 'none';
    document.getElementById('overlay').classList.remove('active');
}

// Abrir carrito
function openCart(e) {
    e.preventDefault();
    document.getElementById('cart-sidebar').classList.add('open');
    document.getElementById('overlay').classList.add('active');
    updateCartUI();
}

// Cerrar carrito
function closeCart() {
    document.getElementById('cart-sidebar').classList.remove('open');
    document.getElementById('overlay').classList.remove('active');
}

// Actualizar UI del carrito
function updateCartUI() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Tu carrito está vacío</p>';
        cartTotal.textContent = '$0';
        return;
    }
    
    // Calcular total
    let total = 0;
    
    cartItems.innerHTML = cart.map(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        return `
            <div class="cart-item" data-id="${item.id}">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-info">
                    <h4 class="cart-item-title">${item.name}</h4>
                    <p class="cart-item-price">$${item.price.toLocaleString('es-CL')} CLP</p>
                    <div class="cart-item-actions">
                        <button class="quantity-btn" data-action="decrease" data-id="${item.id}">-</button>
                        <span class="cart-item-quantity">${item.quantity}</span>
                        <button class="quantity-btn" data-action="increase" data-id="${item.id}">+</button>
                        <button class="remove-item" data-id="${item.id}">🗑️</button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
    
    cartTotal.textContent = `$${total.toLocaleString('es-CL')} CLP`;
    
    // Añadir event listeners a los botones del carrito
    document.querySelectorAll('.cart-item-actions .quantity-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');
            const action = this.getAttribute('data-action');
            updateCartItemQuantity(productId, action);
        });
    });
    
    document.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');
            removeFromCart(productId);
        });
    });
}

// Actualizar cantidad de item en el carrito
function updateCartItemQuantity(productId, action) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const itemIndex = cart.findIndex(item => item.id === productId);
    
    if (itemIndex === -1) return;
    
    if (action === 'increase') {
        cart[itemIndex].quantity += 1;
    } else if (action === 'decrease') {
        if (cart[itemIndex].quantity > 1) {
            cart[itemIndex].quantity -= 1;
        } else {
            // Si la cantidad es 1, eliminar el producto
            cart.splice(itemIndex, 1);
        }
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    updateCartUI();
}

// Eliminar producto del carrito
function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== productId);
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    updateCartUI();
}

// Añadir producto al carrito (sobrescribir la función en main.js)
window.addToCart = function(productId, quantity = 1) {
    const product = window.productData.find(p => p.id === productId);
    
    if (!product) return;
    
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItemIndex = cart.findIndex(item => item.id === productId);
    
    if (existingItemIndex !== -1) {
        cart[existingItemIndex].quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    
    // Mostrar notificación
    showNotification(`${product.name} añadido al carrito`);
}

// Mostrar notificación
function showNotification(message) {
    // Crear elemento de notificación si no existe
    let notification = document.querySelector('.notification');
    
    if (!notification) {
        notification = document.createElement('div');
        notification.className = 'notification';
        document.body.appendChild(notification);
        
        // Estilos para la notificación
        const style = document.createElement('style');
        style.textContent = `
            .notification {
                position: fixed;
                bottom: 20px;
                right: 20px;
                background-color: var(--accent-green);
                color: black;
                padding: 1rem 2rem;
                border-radius: 4px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                z-index: 1002;
                transform: translateY(100px);
                opacity: 0;
                transition: transform 0.3s ease, opacity 0.3s ease;
            }
            
            .notification.show {
                transform: translateY(0);
                opacity: 1;
            }
        `;
        document.head.appendChild(style);
    }
    
    notification.textContent = message;
    notification.classList.add('show');
    
    // Ocultar después de 3 segundos
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Proceder al pago
function checkout() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (cart.length === 0) {
        alert('Tu carrito está vacío');
        return;
    }
    
    alert('¡Gracias por tu compra! Esta es una simulación. En una implementación real, aquí se procesaría el pago.');
    
    // Vaciar carrito después de la compra
    localStorage.removeItem('cart');
    updateCartCount();
    updateCartUI();
    closeCart();
}