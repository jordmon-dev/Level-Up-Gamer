// Datos de usuarios (simulando una base de datos)
if (!localStorage.getItem('users')) {
    // Usuario admin por defecto
    const defaultUsers = [
        {
            id: '1',
            email: 'admin@duoc.cl',
            password: 'admin123',
            birthdate: '1990-01-01',
            role: 'admin',
            registrationDate: new Date().toISOString(),
            levelUpPoints: 0,
            discount: 0
        }
    ];
    localStorage.setItem('users', JSON.stringify(defaultUsers));
}

// Usuario actual
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;

// Inicializar la autenticación
document.addEventListener('DOMContentLoaded', function() {
    initializeAuth();
    updateUIBasedOnAuth();
});

// Inicializar funcionalidades de autenticación
function initializeAuth() {
    // Cambio entre pestañas
    document.getElementById('login-tab').addEventListener('click', () => switchAuthTab('login'));
    document.getElementById('register-tab').addEventListener('click', () => switchAuthTab('register'));
    document.getElementById('go-to-register').addEventListener('click', (e) => {
        e.preventDefault();
        switchAuthTab('register');
    });
    document.getElementById('go-to-login').addEventListener('click', (e) => {
        e.preventDefault();
        switchAuthTab('login');
    });
    
    // Toggle de visibilidad de contraseña
    document.getElementById('login-password-toggle').addEventListener('click', () => 
        togglePasswordVisibility('login-password', 'login-password-toggle')
    );
    document.getElementById('register-password-toggle').addEventListener('click', () => 
        togglePasswordVisibility('register-password', 'register-password-toggle')
    );
    
    // Envío de formularios
    document.getElementById('login-form').addEventListener('submit', handleLogin);
    document.getElementById('register-form').addEventListener('submit', handleRegister);
    
    // Validación en tiempo real
    document.getElementById('register-email').addEventListener('blur', validateRegisterEmail);
    document.getElementById('register-password').addEventListener('blur', validateRegisterPassword);
    document.getElementById('register-birthdate').addEventListener('blur', validateBirthdate);
}

// Cambiar entre pestañas de login/registro
function switchAuthTab(tab) {
    // Actualizar pestañas
    document.getElementById('login-tab').classList.toggle('active', tab === 'login');
    document.getElementById('register-tab').classList.toggle('active', tab === 'register');
    
    // Mostrar formulario correspondiente
    document.getElementById('login-form').classList.toggle('active', tab === 'login');
    document.getElementById('register-form').classList.toggle('active', tab === 'register');
}

// Alternar visibilidad de contraseña
function togglePasswordVisibility(inputId, toggleId) {
    const input = document.getElementById(inputId);
    const toggle = document.getElementById(toggleId);
    
    if (input.type === 'password') {
        input.type = 'text';
        toggle.textContent = '🔒';
    } else {
        input.type = 'password';
        toggle.textContent = '👁️';
    }
}

// Manejar inicio de sesión
function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    // Validar campos
    if (!validateEmail(email) || !password) {
        showAuthError('Por favor completa todos los campos correctamente');
        return;
    }
    
    // Buscar usuario
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
        showAuthError('Credenciales incorrectas');
        return;
    }
    
    // Iniciar sesión
    currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
    
    showAuthSuccess('¡Inicio de sesión exitoso!');
    updateUIBasedOnAuth();
    
    // Redirigir después de un breve tiempo
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1500);
}

// Manejar registro
function handleRegister(e) {
    e.preventDefault();
    
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const birthdate = document.getElementById('register-birthdate').value;
    const referral = document.getElementById('register-referral').value;
    const terms = document.getElementById('register-terms').checked;
    
    // Validar campos
    if (!validateRegisterEmail() || !validateRegisterPassword() || !validateBirthdate() || !terms) {
        showAuthError('Por favor completa todos los campos correctamente');
        return;
    }
    
    // Verificar si el usuario ya existe
    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.some(u => u.email === email)) {
        showAuthError('Este correo electrónico ya está registrado');
        return;
    }
    
    // Calcular edad
    const age = calculateAge(new Date(birthdate));
    if (age < 18) {
        showAuthError('Debes ser mayor de 18 años para registrarte');
        return;
    }
    
    // Crear nuevo usuario
    const newUser = {
        id: generateId(),
        email: email,
        password: password,
        birthdate: birthdate,
        role: 'customer',
        registrationDate: new Date().toISOString(),
        levelUpPoints: 0,
        discount: email.includes('@duoc.cl') ? 20 : 0,
        referralCode: referral || null
    };
    
    // Añadir puntos por referido si aplica
    if (referral) {
        newUser.levelUpPoints += 100; // Puntos por usar código de referido
    }
    
    // Guardar usuario
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    // Iniciar sesión automáticamente
    currentUser = newUser;
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    
    showAuthSuccess('¡Registro exitoso! Bienvenido a Level-Up Gamer');
    updateUIBasedOnAuth();
    
    // Redirigir después de un breve tiempo
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1500);
}

// Validar email de registro
function validateRegisterEmail() {
    const email = document.getElementById('register-email').value;
    const errorElement = document.getElementById('register-email-error');
    
    if (!validateEmail(email)) {
        showFieldError('register-email', errorElement, 'Por favor ingresa un correo válido');
        return false;
    }
    
    // Validar dominios permitidos
    const allowedDomains = ['duoc.cl', 'profesor.duoc.cl', 'gmail.com'];
    const domain = email.split('@')[1];
    
    if (!allowedDomains.includes(domain)) {
        showFieldError('register-email', errorElement, 'Solo se permiten correos @duoc.cl, @profesor.duoc.cl y @gmail.com');
        return false;
    }
    
    clearFieldError('register-email', errorElement);
    return true;
}

// Validar contraseña de registro
function validateRegisterPassword() {
    const password = document.getElementById('register-password').value;
    const errorElement = document.getElementById('register-password-error');
    
    if (password.length < 4 || password.length > 10) {
        showFieldError('register-password', errorElement, 'La contraseña debe tener entre 4 y 10 caracteres');
        return false;
    }
    
    clearFieldError('register-password', errorElement);
    return true;
}

// Validar fecha de nacimiento
function validateBirthdate() {
    const birthdate = document.getElementById('register-birthdate').value;
    const errorElement = document.getElementById('register-birthdate-error');
    
    if (!birthdate) {
        showFieldError('register-birthdate', errorElement, 'La fecha de nacimiento es requerida');
        return false;
    }
    
    const age = calculateAge(new Date(birthdate));
    if (age < 18) {
        showFieldError('register-birthdate', errorElement, 'Debes ser mayor de 18 años para registrarte');
        return false;
    }
    
    clearFieldError('register-birthdate', errorElement);
    return true;
}

// Mostrar error en campo
function showFieldError(inputId, errorElement, message) {
    document.getElementById(inputId).classList.add('error');
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

// Limpiar error de campo
function clearFieldError(inputId, errorElement) {
    document.getElementById(inputId).classList.remove('error');
    errorElement.style.display = 'none';
}

// Mostrar mensaje de error de autenticación
function showAuthError(message) {
    // Crear o actualizar elemento de notificación
    let notification = document.querySelector('.auth-notification.error');
    
    if (!notification) {
        notification = document.createElement('div');
        notification.className = 'auth-notification error';
        document.querySelector('.auth-container').prepend(notification);
        
        // Estilos para la notificación
        const style = document.createElement('style');
        style.textContent = `
            .auth-notification {
                padding: 1rem;
                margin-bottom: 1.5rem;
                border-radius: 4px;
                text-align: center;
            }
            
            .auth-notification.error {
                background-color: rgba(255, 68, 68, 0.1);
                border: 1px solid #ff4444;
                color: #ff4444;
            }
            
            .auth-notification.success {
                background-color: rgba(57, 255, 20, 0.1);
                border: 1px solid #39ff14;
                color: #39ff14;
            }
        `;
        document.head.appendChild(style);
    }
    
    notification.textContent = message;
    notification.classList.add('error');
    notification.classList.remove('success');
    
    // Ocultar después de 5 segundos
    setTimeout(() => {
        notification.style.display = 'none';
    }, 5000);
}

// Mostrar mensaje de éxito de autenticación
function showAuthSuccess(message) {
    let notification = document.querySelector('.auth-notification');
    
    if (!notification) {
        notification = document.createElement('div');
        notification.className = 'auth-notification';
        document.querySelector('.auth-container').prepend(notification);
    }
    
    notification.textContent = message;
    notification.classList.add('success');
    notification.classList.remove('error');
    notification.style.display = 'block';
    
    // Ocultar después de 5 segundos
    setTimeout(() => {
        notification.style.display = 'none';
    }, 5000);
}

// Validar formato de email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Calcular edad a partir de fecha de nacimiento
function calculateAge(birthdate) {
    const today = new Date();
    let age = today.getFullYear() - birthdate.getFullYear();
    const monthDiff = today.getMonth() - birthdate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthdate.getDate())) {
        age--;
    }
    
    return age;
}

// Generar ID único
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Actualizar UI basado en estado de autenticación
function updateUIBasedOnAuth() {
    const authLink = document.querySelector('a[href="auth.html"]');
    
    if (currentUser) {
        // Cambiar "Login" por el email del usuario
        if (authLink) {
            authLink.textContent = currentUser.email;
            authLink.href = '#';
            authLink.addEventListener('click', handleLogout);
        }
        
        // Mostrar opciones de admin si corresponde
        if (currentUser.role === 'admin') {
            showAdminOptions();
        }
    }
}

// Mostrar opciones de administrador
function showAdminOptions() {
    // Añadir enlace al panel de admin si no existe
    if (!document.querySelector('a[href="admin.html"]')) {
        const navMenu = document.querySelector('.nav-menu');
        const adminLink = document.createElement('a');
        adminLink.href = 'admin.html';
        adminLink.className = 'nav-link';
        adminLink.textContent = 'Admin';
        
        // Insertar antes del enlace de carrito
        const cartLink = document.querySelector('.cart-btn');
        navMenu.insertBefore(adminLink, cartLink);
    }
}

// Manejar cierre de sesión
function handleLogout(e) {
    e.preventDefault();
    
    if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
        localStorage.removeItem('currentUser');
        currentUser = null;
        window.location.href = 'index.html';
    }
}

// Función para verificar autenticación en otras páginas
function checkAuthentication() {
    if (!currentUser) {
        currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
    }
    return currentUser !== null;
}

// Función para verificar si el usuario es administrador
function isAdmin() {
    return currentUser && currentUser.role === 'admin';
}

// Función para obtener el usuario actual
function getCurrentUser() {
    return currentUser;
}