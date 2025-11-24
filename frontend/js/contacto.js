// Validación del formulario de contacto
function validarContacto(event) {
    event.preventDefault();
    
    // Obtener valores del formulario
    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const asunto = document.getElementById('asunto').value;
    const mensaje = document.getElementById('mensaje').value.trim();
    
    // Resetear mensajes de error
    document.querySelectorAll('.text-danger').forEach(el => el.textContent = '');
    
    let esValido = true;

    // Validar nombre (requerido, máximo 100 caracteres)
    if (nombre.length === 0) {
        document.getElementById('nombre-error').textContent = 'El nombre es requerido';
        esValido = false;
    } else if (nombre.length > 100) {
        document.getElementById('nombre-error').textContent = 'Máximo 100 caracteres';
        esValido = false;
    }

    // Validar email (opcional pero si se ingresa debe ser válido)
    if (email.length > 0 && !validarEmailContacto(email)) {
        document.getElementById('email-error').textContent = 
            'Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com';
        esValido = false;
    }

    // Validar teléfono (opcional pero si se ingresa debe ser válido)
    if (telefono.length > 0 && !validarTelefono(telefono)) {
        document.getElementById('telefono-error').textContent = 
            'Formato de teléfono inválido. Use +56 9 1234 5678 o 2 2345 6789';
        esValido = false;
    }

    // Validar mensaje (requerido, máximo 500 caracteres)
    if (mensaje.length === 0) {
        document.getElementById('mensaje-error').textContent = 'El mensaje es requerido';
        esValido = false;
    } else if (mensaje.length > 500) {
        document.getElementById('mensaje-error').textContent = 'Máximo 500 caracteres';
        esValido = false;
    }

    // Si todo es válido, procesar el contacto
    if (esValido) {
        procesarContacto({
            nombre,
            email,
            telefono,
            asunto,
            mensaje
        });
    }
}

// Validar email para contacto (mismo formato que login/registro)
function validarEmailContacto(email) {
    const dominiosPermitidos = ['@duoc.cl', '@profesor.duoc.cl', '@gmail.com'];
    return dominiosPermitidos.some(dominio => email.includes(dominio));
}

// Validar teléfono chileno (formato flexible)
function validarTelefono(telefono) {
    // Patrones aceptados: +56 9 1234 5678, 56912345678, 2 2345 6789, 223456789
    const patrones = [
        /^\+56\s?9\s?\d{4}\s?\d{4}$/, // +56 9 1234 5678
        /^569\d{8}$/,                  // 56912345678
        /^9\d{8}$/,                    // 912345678
        /^2\s?\d{4}\s?\d{4}$/,         // 2 2345 6789
        /^2\d{8}$/                     // 223456789
    ];
    
    // Eliminar espacios y guiones
    const telefonoLimpio = telefono.replace(/[\s\-]/g, '');
    
    return patrones.some(patron => patron.test(telefonoLimpio));
}

// Procesar el formulario de contacto
function procesarContacto(contactoData) {
    // Guardar contacto en localStorage (simulación de base de datos)
    const contactos = JSON.parse(localStorage.getItem('contactos') || '[]');
    contactos.push({
        ...contactoData,
        fecha: new Date().toISOString(),
        leido: false
    });
    
    localStorage.setItem('contactos', JSON.stringify(contactos));
    
    // Mostrar mensaje de éxito
    alert('¡Mensaje enviado con éxito! Te contactaremos pronto.');
    
    // Limpiar formulario
    document.getElementById('contacto-form').reset();
    
    // Opcional: Redirigir a página de inicio después de 2 segundos
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 2000);
}

// Contador de caracteres para el mensaje
function actualizarContadorMensaje() {
    const mensaje = document.getElementById('mensaje');
    const contador = document.querySelector('[for="mensaje"] + .form-text');
    
    if (mensaje && contador) {
        const longitud = mensaje.value.length;
        contador.textContent = `${longitud}/500 caracteres`;
        
        // Cambiar color si se acerca al límite
        if (longitud > 450) {
            contador.style.color = 'orange';
        } else if (longitud > 490) {
            contador.style.color = 'red';
        } else {
            contador.style.color = '';
        }
    }
}

// Inicializar página de contacto
document.addEventListener('DOMContentLoaded', function() {
    actualizarCarrito();
    
    // Configurar contador de caracteres para el mensaje
    const mensajeTextarea = document.getElementById('mensaje');
    if (mensajeTextarea) {
        mensajeTextarea.addEventListener('input', actualizarContadorMensaje);
        actualizarContadorMensaje(); // Actualizar inicialmente
    }
    
    // Agregar validación en tiempo real
    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            const errorId = this.id + '-error';
            const errorElement = document.getElementById(errorId);
            if (errorElement) {
                errorElement.textContent = '';
            }
        });
    });
});