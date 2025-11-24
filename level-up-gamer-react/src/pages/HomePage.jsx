import { Link } from 'react-router-dom';

// Recibimos 'productos' por props
function HomePage({ productos, agregarAlCarrito }) {
  const destacados = productos.filter(p => p.destacado);

  return (
    <div>
      <section className="hero-section bg-dark py-5 text-white text-center">
        <h1 className="display-4 fw-bold">LEVEL-UP GAMER</h1>
        <p className="lead">Lleva tu experiencia al siguiente nivel</p>
        <Link to="/productos" className="btn btn-primary btn-lg">Ver Productos</Link>
      </section>

      <section className="py-5 container">
        <h2 className="text-center mb-5">Destacados</h2>
        <div className="row">
          {destacados.map(p => (
            <div className="col-md-3 mb-4" key={p.id}>
              <div className="card h-100">
                <img src={p.imagen.startsWith('http') ? p.imagen : `/${p.imagen}`} className="card-img-top" alt={p.nombre} onError={(e) => e.target.src='https://via.placeholder.com/300'} />
                <div className="card-body">
                  <h5>{p.nombre}</h5>
                  <p className="fw-bold">${p.precio.toLocaleString('es-CL')}</p>
                  <button className="btn btn-primary w-100" onClick={() => agregarAlCarrito(p.id)}>Añadir</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
export default HomePage;