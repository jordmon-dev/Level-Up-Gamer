// src/data.js

// Usamos 'export' para poder importar esta data en otros archivos
export const productos = [
    {
        id: 1,
        codigo: "CQ001",
        nombre: "PlayStation 5",
        precio: 549990,
        categoria: "Consolas",
        imagen: "img/ps5.jpg", // Usaremos estas imágenes después
        descripcion: "La consola de última generación de Sony...",
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
        descripcion: "Un potente equipo diseñado para los gamers más exigentes...",
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
        descripcion: "Proporcionan un sonido envolvente de calidad...",
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
        descripcion: "Diseñada para el máximo confort...",
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
        descripcion: "Un clásico juego de estrategia...",
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
        descripcion: "Con sensor de alta precisión...",
        destacado: false,
        stock: 18
    }
    // Puedes agregar el resto de productos de tu main.js aquí
];

// Aquí también puedes exportar los cupones y regiones
export const cuponesValidos = {
    'LEVELUP10': 10,
    'GAMER20': 20,
    'DUOC20': 20
};