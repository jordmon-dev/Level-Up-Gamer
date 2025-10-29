src/components/Footer.jsx

function Footer() {
  return (
    <footer className="bg-dark text-light py-4 mt-5">
      <div className="container text-center">
        <p>&copy; 2024 Level-Up Gamer - Todos los derechos reservados</p>
        <div className="social-links">
          <a href="#" className="text-light mx-2"><i className="fab fa-facebook-f"></i></a>
          <a href="#" className="text-light mx-2"><i className="fab fa-instagram"></i></a>
          <a href="#" className="text-light mx-2"><i className="fab fa-twitter"></i></a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;