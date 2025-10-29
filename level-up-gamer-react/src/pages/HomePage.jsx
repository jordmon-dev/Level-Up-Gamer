import { Link } from 'react-router-dom';
import { productos } from '../data.js'; // Importamos nuestros productos
import ProductoCard from '../components/ProductoCard'; // Importamos la tarjeta

function HomePage() {

  // Filtramos los productos que son "destacados"
  const productosDestacados = productos.filter(p => p.destacado);

  return (
    <div>
      {/* Hero Section (tomado de index.html) */}
      <section className="hero-section bg-dark py-5">
        <div className="container text-center py-5">
          <h1 className="display-4 fw-bold mb-4">LEVEL-UP GAMER</h1>
          <p className="lead mb-4">Todo lo que necesitas para llevar tu experiencia gaming al siguiente nivel</p>
          <Link to="/productos" className="btn btn-primary btn-lg">Explorar Productos</Link>
        </div>
      </section>

      {/* Productos Destacados (tomado de index.html) */}
      <section className="py-5">
        <div className="container">
          <h2 className="text-center mb-5">Productos Destacados</h2>
          <div className="row">
            {/* Aquí "mapeamos" (recorremos) el array de productos destacados
              y creamos un componente ProductoCard por cada uno.
            */}
            {productosDestacados.map(producto => (
              <ProductoCard key={producto.id} producto={producto} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;