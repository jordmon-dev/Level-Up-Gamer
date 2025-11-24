// Validación del formulario de login
function validarLogin(event) {
  event.preventDefault();
  
  // Obtener valores del formulario
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  
  // Resetear mensajes de error
  document.getElementById('email-error').textContent = '';
  document.getElementById('password-error').textContent = '';
  
  let esValido = true;

  // Validar email
  if (!validarEmail(email)) {
    document.getElementById('email-error').textContent = 
      'Por favor ingresa un correo válido (@duoc.cl, @profesor.duoc.cl o @gmail.com)';
    esValido = false;
  }

  // Validar contraseña
  if (password.length < 4 || password.length > 10) {
    document.getElementById('password-error').textContent = 
      'La contraseña debe tener entre 4 y 10 caracteres';
    esValido = false;
  }

  // Si todo es válido, procesar el login
  if (esValido) {
    procesarLogin(email, password);
  }
}

// Validar formato de email
function validarEmail(email) {
  const dominiosPermitidos = ['@duoc.cl', '@profesor.duoc.cl', '@gmail.com'];
  return dominiosPermitidos.some(dominio => email.includes(dominio));
}

// Procesar el login (simulación)
function procesarLogin(email, password) {
  // Obtener usuarios registrados del localStorage
  const usuariosRegistrados = JSON.parse(localStorage.getItem('usuariosRegistrados') || '[]');
  
  // Buscar usuario
  const usuario = usuariosRegistrados.find(u => u.email === email && u.password === password);
  
  if (usuario) {
    // Login exitoso
    alert('¡Login exitoso! Bienvenido a Level-Up Gamer');
    
    // Guardar sesión en localStorage
    localStorage.setItem('usuarioLogueado', JSON.stringify({
      email: email,
      timestamp: new Date().getTime()
    }));
    
    // Redirigir a la página principal
    window.location.href = 'index.html';
  } else {
    // Credenciales incorrectas
    alert('Credenciales incorrectas. Por favor intenta nuevamente.');
  }
}

// Verificar si ya hay una sesión activa
function verificarSesion() {
  const usuarioLogueado = JSON.parse(localStorage.getItem('usuarioLogueado'));
  if (usuarioLogueado) {
    // Si ya está logueado, redirigir al inicio
    window.location.href = 'index.html';
  }
}

// Inicializar página de login
document.addEventListener('DOMContentLoaded', function() {
  actualizarCarrito();
  verificarSesion();
  
  // Agregar validación en tiempo real
  document.getElementById('email').addEventListener('input', function() {
    document.getElementById('email-error').textContent = '';
  });
  
  document.getElementById('password').addEventListener('input', function() {
    document.getElementById('password-error').textContent = '';
  });
});