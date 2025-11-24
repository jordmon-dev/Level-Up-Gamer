// js/data.js - Datos globales de Level-Up Gamer

window.productos = [
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
        imagen: "https://via.placeholder.com/300x200/333/fff?text=Mouse+Gamer",
        categoria: "Accesorios",
        descripcion: "Sensor de alta precisión y botones personalizables."
    },
    {
        id: 3,
        nombre: "Silla Gamer SecretLab Titan",
        precio: 349990,
        imagen: "https://via.placeholder.com/300x200/333/fff?text=Silla+Gamer",
        categoria: "Sillas Gamers",
        descripcion: "Diseñada para el máximo confort en sesiones prolongadas."
    },
    {
        id: 4,
        nombre: "Catan",
        precio: 29990,
        imagen: "https://via.placeholder.com/300x200/333/fff?text=Catan",
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
        imagen: "img/asus.jpg",
        categoria: "Computadores Gamers",
        descripcion: "Potente equipo para gamers exigentes."
    },
    {
        id: 7,
        nombre: "Controlador Xbox Series X",
        precio: 59990,
        imagen: "https://via.placeholder.com/300x200/333/fff?text=Control+Xbox",
        categoria: "Accesorios",
        descripcion: "Control inalámbrico con botones mapeables."
    },
    {
        id: 8,
        nombre: "Polera Gamer Level-Up",
        precio: 14990,
        imagen: "https://via.placeholder.com/300x200/333/fff?text=Polera+Gamer",
        categoria: "Poleras Personalizadas",
        descripcion: "Polera personalizable con tu gamer tag."
    }
];

// Cupones de descuento válidos
window.cuponesValidos = {
    'LEVELUP10': 10, // 10% de descuento
    'GAMER20': 20,   // 20% de descuento
    'DUOC20': 20     // 20% de descuento para correos DUOC
};

// Datos de regiones y comunas de Chile
window.regionesComunas = {
    "Arica y Parinacota": ["Arica", "Camarones", "Putre", "General Lagos"],
    "Tarapacá": ["Iquique", "Alto Hospicio", "Pozo Almonte", "Camiña", "Colchane", "Huara", "Pica"],
    "Metropolitana": ["Santiago", "Maipú", "Puente Alto", "Las Condes", "Ñuñoa", "Providencia"],
    "Valparaíso": ["Valparaíso", "Viña del Mar", "Quilpué", "Villa Alemana"],
    "Bío Bío": ["Concepción", "Talcahuano", "Chiguayante", "San Pedro de la Paz"]
};

console.log('✅ Data.js cargado - Productos:', window.productos.length);