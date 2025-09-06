// Datos de productos
window.productData = [
    {
        id: 'JM001',
        category: 'Juegos de Mesa',
        name: 'Catan',
        price: 29990,
        description: 'Un clásico juego de estrategia donde los jugadores compiten por colonizar y expandirse en la isla de Catan. Ideal para 3-4 jugadores y perfecto para noches de juego en familia o con amigos.'
    },
    {
        id: 'JM002',
        category: 'Juegos de Mesa',
        name: 'Carcassonne',
        price: 24990,
        description: 'Un juego de colocación de fichas donde los jugadores construyen el paisaje alrededor de la fortaleza medieval de Carcassonne. Ideal para 2-5 jugadores y fácil de aprender.'
    },
    {
        id: 'AC001',
        category: 'Accesorios',
        name: 'Controlador Inalámbrico Xbox Series X',
        price: 59990,
        description: 'Ofrece una experiencia de juego cómoda con botones mapeables y una respuesta táctil mejorada. Compatible con consolas Xbox y PC.'
    },
    {
        id: 'AC002',
        category: 'Accesorios',
        name: 'Auriculares Gamer HyperX Cloud II',
        price: 79990,
        description: 'Proporcionan un sonido envolvente de calidad con un micrófono desmontable y almohadillas de espuma viscoelástica para mayor comodidad durante largas sesiones de juego.'
    },
    {
        id: 'CQ001',
        category: 'Consolas',
        name: 'PlayStation 5',
        price: 549990,
        description: 'La consola de última generación de Sony, que ofrece gráficos impresionantes y tiempos de carga ultrarrápidos para una experiencia de juego inmersiva.'
    },
    {
        id: 'CG001',
        category: 'Computadores Gamers',
        name: 'PC Gamer ASUS ROG Strix',
        price: 1299990,
        description: 'Un potente equipo diseñado para los gamers más exigentes, equipado con los últimos componentes para ofrecer un rendimiento excepcional en cualquier juego.'
    },
    {
        id: 'SG001',
        category: 'Sillas Gamers',
        name: 'Silla Gamer SecretLab Titan',
        price: 349990,
        description: 'Diseñada para el máximo confort, esta silla ofrece un soporte ergonómico y personalización ajustable para sesiones de juego prolongadas.'
    },
    {
        id: 'MS001',
        category: 'Mouse',
        name: 'Mouse Gamer Logitech G502 HERO',
        price: 49990,
        description: 'Con sensor de alta precisión y botones personalizables, este mouse es ideal para gamers que buscan un control preciso y personalización.'
    },
    {
        id: 'MP001',
        category: 'Mousepad',
        name: 'Mousepad Razer Goliathus Extended Chroma',
        price: 29990,
        description: 'Ofrece un área de juego amplia con iluminación RGB personalizable, asegurando una superficie suave y uniforme para el movimiento del mouse.'
    },
    {
        id: 'PP001',
        category: 'Poleras Personalizadas',
        name: 'Polera Gamer Personalizada Level-Up',
        price: 14990,
        description: 'Una camiseta cómoda y estilizada, con la posibilidad de personalizarla con tu gamer tag o diseño favorito.'
    }
];

// Añadir imágenes a los productos
window.productData.forEach(product => {
    product.image = `https://placehold.co/300x200/1a1a1a/39FF14?text=${encodeURIComponent(product.name)}`;
});