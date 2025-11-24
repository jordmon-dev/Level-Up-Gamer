// Datos de regiones y comunas de Chile
const regionesComunas = {
    "Arica y Parinacota": ["Arica", "Camarones", "Putre", "General Lagos"],
    "Tarapacá": ["Iquique", "Alto Hospicio", "Pozo Almonte", "Camiña", "Colchane", "Huara", "Pica"],
    "Antofagasta": ["Antofagasta", "Mejillones", "Sierra Gorda", "Taltal", "Calama", "Ollagüe", "San Pedro de Atacama", "Tocopilla", "María Elena"],
    "Atacama": ["Copiapó", "Caldera", "Tierra Amarilla", "Chañaral", "Diego de Almagro", "Vallenar", "Alto del Carmen", "Freirina", "Huasco"],
    "Coquimbo": ["La Serena", "Coquimbo", "Andacollo", "La Higuera", "Paiguano", "Vicuña", "Illapel", "Canela", "Los Vilos", "Salamanca", "Ovalle", "Combarbalá", "Monte Patria", "Punitaqui", "Río Hurtado"],
    "Valparaíso": ["Valparaíso", "Casablanca", "Concón", "Juan Fernández", "Puchuncaví", "Quintero", "Viña del Mar", "Isla de Pascua", "Los Andes", "Calle Larga", "Rinconada", "San Esteban", "La Ligua", "Cabildo", "Papudo", "Petorca", "Zapallar", "Quillota", "Calera", "Hijuelas", "La Cruz", "Nogales", "San Antonio", "Algarrobo", "Cartagena", "El Quisco", "El Tabo", "Santo Domingo", "San Felipe", "Catemu", "Llaillay", "Panquehue", "Putaendo", "Santa María", "Quilpué", "Limache", "Olmué", "Villa Alemana"],
    "Metropolitana": ["Santiago", "Cerrillos", "Cerro Navia", "Conchalí", "El Bosque", "Estación Central", "Huechuraba", "Independencia", "La Cisterna", "La Florida", "La Granja", "La Pintana", "La Reina", "Las Condes", "Lo Barnechea", "Lo Espejo", "Lo Prado", "Macul", "Maipú", "Ñuñoa", "Pedro Aguirre Cerda", "Peñalolén", "Providencia", "Pudahuel", "Quilicura", "Quinta Normal", "Recoleta", "Renca", "San Joaquín", "San Miguel", "San Ramón", "Vitacura", "Puente Alto", "Pirque", "San José de Maipo", "Colina", "Lampa", "Tiltil", "San Bernardo", "Buin", "Calera de Tango", "Paine", "Melipilla", "Alhué", "Curacaví", "María Pinto", "San Pedro", "Talagante", "El Monte", "Isla de Maipo", "Padre Hurtado", "Peñaflor"],
    "O'Higgins": ["Rancagua", "Codegua", "Coinco", "Coltauco", "Doñihue", "Graneros", "Las Cabras", "Machalí", "Malloa", "Mostazal", "Olivar", "Peumo", "Pichidegua", "Quinta de Tilcoco", "Rengo", "Requínoa", "San Vicente", "Pichilemu", "La Estrella", "Litueche", "Marchihue", "Navidad", "San Fernando", "Chépica", "Chimbarongo", "Lolol", "Nancagua", "Palmilla", "Peralillo", "Placilla", "Pumanque", "Santa Cruz"],
    "Maule": ["Talca", "ConsVtución", "Curepto", "Empedrado", "Maule", "Pelarco", "Pencahue", "Río Claro", "San Clemente", "San Rafael", "Cauquenes", "Chanco", "Pelluhue", "Curicó", "Hualañé", "Licantén", "Molina", "Rauco", "Romeral", "Sagrada Familia", "Teno", "Vichuquén", "Linares", "Colbún", "Longaví", "Parral", "ReVro", "San Javier", "Villa Alegre", "Yerbas Buenas"],
    "Ñuble": ["Chillán", "Bulnes", "Chillán Viejo", "El Carmen", "Pemuco", "Pinto", "Quillón", "San Ignacio", "Yungay", "Quirihue", "Cobquecura", "Coelemu", "Ninhue", "Portezuelo", "Ránquil", "Treguaco", "San Carlos", "Coihueco", "Ñiquén", "San Fabián", "San Nicolás"],
    "Biobío": ["Concepción", "Coronel", "Chiguayante", "Florida", "Hualpén", "Hualqui", "Lota", "Penco", "San Pedro de la Paz", "Santa Juana", "Talcahuano", "Tomé", "Arauco", "Cañete", "Contulmo", "Curanilahue", "Lebu", "Los Álamos", "Tirúa", "Los Ángeles", "Antuco", "Cabrero", "Laja", "Mulchén", "Nacimiento", "Negrete", "Quilaco", "Quilleco", "San Rosendo", "Santa Bárbara", "Tucapel", "Yumbel", "Alto Biobío"],
    "Araucanía": ["Temuco", "Carahue", "Cunco", "Curarrehue", "Freire", "Galvarino", "Gorbea", "Lautaro", "Loncoche", "Melipeuco", "Nueva Imperial", "Padre las Casas", "Perquenco", "Pitrufquén", "Pucón", "Saavedra", "Teodoro Schmidt", "Toltén", "Vilcún", "Villarrica", "Cholchol", "Angol", "Collipulli", "Curacautín", "Ercilla", "Lonquimay", "Los Sauces", "Lumaco", "Purén", "Renaico", "Traiguén", "Victoria"],
    "Los Ríos": ["Valdivia", "Corral", "Lanco", "Los Lagos", "Máfil", "Mariquina", "Paillaco", "Panguipulli", "La Unión", "Futrono", "Lago Ranco", "Río Bueno"],
    "Los Lagos": ["Puerto Montt", "Calbuco", "Cochamó", "Fresia", "FruVllar", "Los Muermos", "Llanquihue", "Maullín", "Puerto Varas", "Castro", "Ancud", "Chonchi", "Curaco de Vélez", "Dalcahue", "Puqueldón", "Queilén", "Quellón", "Quemchi", "Quinchao", "Osorno", "San Juan de la Costa", "San Pablo", "Chaitén", "Futaleufú", "Hualaihué", "Palena"],
    "Aysén": ["Coihaique", "Lago Verde", "Aysén", "Cisnes", "Guaitecas", "Cochrane", "O'Higgins", "Tortel", "Chile Chico", "Río Ibáñez"],
    "Magallanes": ["Punta Arenas", "Laguna Blanca", "Río Verde", "San Gregorio", "Cabo de Hornos", "Antártica", "Porvenir", "Primavera", "Timaukel", "Natales", "Torres del Paine"]
};

// Cargar regiones en el select
function cargarRegiones() {
    const selectRegion = document.getElementById('region');
    if (!selectRegion) return;

    // Ordenar regiones alfabéticamente
    const regionesOrdenadas = Object.keys(regionesComunas).sort();
    
    regionesOrdenadas.forEach(region => {
        const option = document.createElement('option');
        option.value = region;
        option.textContent = region;
        selectRegion.appendChild(option);
    });
}

// Cargar comunas según la región seleccionada
function cargarComunas() {
    const region = document.getElementById('region').value;
    const selectComuna = document.getElementById('comuna');
    
    // Limpiar select de comunas
    selectComuna.innerHTML = '<option value="">Selecciona una comuna</option>';
    
    if (region && regionesComunas[region]) {
        // Ordenar comunas alfabéticamente
        const comunasOrdenadas = regionesComunas[region].sort();
        
        comunasOrdenadas.forEach(comuna => {
            const option = document.createElement('option');
            option.value = comuna;
            option.textContent = comuna;
            selectComuna.appendChild(option);
        });
    }
}

// Validar RUN chileno
function validarRUN(run) {
    // Eliminar espacios y convertir a mayúsculas
    run = run.trim().toUpperCase();
    
    // Validar formato básico
    if (!/^[0-9]+[0-9kK]{1}$/.test(run)) {
        return false;
    }
    
    // Validar que tenga entre 7 y 9 caracteres (sin contar el dígito verificador)
    const cuerpo = run.slice(0, -1);
    if (cuerpo.length < 6 || cuerpo.length > 8) {
        return false;
    }
    
    // Simulación de validación (en un sistema real se validaría el dígito verificador)
    return true;
}

// Validar edad (mayor de 18 años)
function validarEdad(fechaNacimiento) {
    if (!fechaNacimiento) return true; // Opcional
    
    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);
    const edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();
    
    return mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate()) ? edad - 1 : edad;
}

// Validar formulario de registro
function validarRegistro(event) {
    event.preventDefault();
    
    // Obtener valores del formulario
    const run = document.getElementById('run').value.trim();
    const fechaNacimiento = document.getElementById('fecha-nacimiento').value;
    const nombres = document.getElementById('nombres').value.trim();
    const apellidos = document.getElementById('apellidos').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const region = document.getElementById('region').value;
    const comuna = document.getElementById('comuna').value;
    const direccion = document.getElementById('direccion').value.trim();
    const terminos = document.getElementById('terminos').checked;
    
    // Resetear mensajes de error
    document.querySelectorAll('.text-danger').forEach(el => el.textContent = '');
    
    let esValido = true;

    // Validar RUN
    if (!validarRUN(run)) {
        document.getElementById('run-error').textContent = 'RUN inválido. Formato: 12345678K (sin puntos ni guión)';
        esValido = false;
    }

    // Validar edad (mayor de 18 años)
    if (fechaNacimiento) {
        const edad = validarEdad(fechaNacimiento);
        if (edad < 18) {
            document.getElementById('edad-error').textContent = 'Debes ser mayor de 18 años para registrarte';
            esValido = false;
        }
    }

    // Validar nombres
    if (nombres.length === 0) {
        document.getElementById('nombres-error').textContent = 'Los nombres son requeridos';
        esValido = false;
    } else if (nombres.length > 50) {
        document.getElementById('nombres-error').textContent = 'Máximo 50 caracteres';
        esValido = false;
    }

    // Validar apellidos
    if (apellidos.length === 0) {
        document.getElementById('apellidos-error').textContent = 'Los apellidos son requeridos';
        esValido = false;
    } else if (apellidos.length > 100) {
        document.getElementById('apellidos-error').textContent = 'Máximo 100 caracteres';
        esValido = false;
    }

    // Validar email
    if (!validarEmail(email)) {
        document.getElementById('email-error').textContent = 'Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com';
        esValido = false;
    }

    // Validar contraseña
    if (password.length < 4 || password.length > 10) {
        document.getElementById('password-error').textContent = 'La contraseña debe tener entre 4 y 10 caracteres';
        esValido = false;
    }

    // Validar confirmación de contraseña
    if (password !== confirmPassword) {
        document.getElementById('confirm-password-error').textContent = 'Las contraseñas no coinciden';
        esValido = false;
    }

    // Validar región
    if (!region) {
        document.getElementById('region-error').textContent = 'Selecciona una región';
        esValido = false;
    }

    // Validar comuna
    if (!comuna) {
        document.getElementById('comuna-error').textContent = 'Selecciona una comuna';
        esValido = false;
    }

    // Validar dirección
    if (direccion.length === 0) {
        document.getElementById('direccion-error').textContent = 'La dirección es requerida';
        esValido = false;
    } else if (direccion.length > 300) {
        document.getElementById('direccion-error').textContent = 'Máximo 300 caracteres';
        esValido = false;
    }

    // Validar términos y condiciones
    if (!terminos) {
        document.getElementById('terminos-error').textContent = 'Debes aceptar los términos y condiciones';
        esValido = false;
    }

    // Si todo es válido, procesar el registro
    if (esValido) {
        procesarRegistro({
            run,
            fechaNacimiento,
            nombres,
            apellidos,
            email,
            password,
            region,
            comuna,
            direccion
        });
    }
}

// Validar email (misma función que en login)
function validarEmail(email) {
    const dominiosPermitidos = ['@duoc.cl', '@profesor.duoc.cl', '@gmail.com'];
    return dominiosPermitidos.some(dominio => email.includes(dominio));
}

// Procesar el registro
function procesarRegistro(usuarioData) {
    // Guardar usuario en localStorage (simulación de base de datos)
    const usuarios = JSON.parse(localStorage.getItem('usuariosRegistrados') || '[]');
    
    // Verificar si el email ya existe
    if (usuarios.some(u => u.email === usuarioData.email)) {
        alert('Este correo electrónico ya está registrado');
        return;
    }
    
    // Verificar si el RUN ya existe
    if (usuarios.some(u => u.run === usuarioData.run)) {
        alert('Este RUN ya está registrado');
        return;
    }
    
    // Agregar nuevo usuario
    usuarios.push(usuarioData);
    localStorage.setItem('usuariosRegistrados', JSON.stringify(usuarios));
    
    // Mostrar mensaje de éxito
    alert('¡Registro exitoso! Ahora puedes iniciar sesión');
    
    // Redirigir al login
    window.location.href = 'login.html';
}

// Inicializar página de registro
document.addEventListener('DOMContentLoaded', function() {
    actualizarCarrito();
    cargarRegiones();
    
    // Agregar validación en tiempo real
    const inputs = document.querySelectorAll('input, select, textarea');
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