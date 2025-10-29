// src/components/Footer.test.jsx
import React from 'react';
// Importamos funciones de testing-library/react
import { render, screen } from '@testing-library/react'; 
// Importamos el componente que queremos probar
import Footer from './Footer'; 

// 'describe' agrupa tests relacionados
describe('Footer Component', () => {

  // 'it' define un caso de prueba individual
  it('debería renderizar el texto de copyright', () => {
    // 1. Renderizamos el componente Footer en un DOM virtual
    render(<Footer />); 

    // 2. Buscamos un elemento que contenga el texto específico.
    //    Usamos una expresión regular /.../i para ignorar mayúsculas/minúsculas.
    const copyrightText = screen.getByText(/© 2024 Level-Up Gamer - Todos los derechos reservados/i);

    // 3. Afirmamos (assert) que el elemento encontrado está presente en el documento virtual.
    //    expect(...).toBeInTheDocument() viene de @testing-library/jest-dom
    expect(copyrightText).toBeInTheDocument(); 
  });

  it('debería renderizar los enlaces a redes sociales', () => {
    render(<Footer />);

    // Buscamos los enlaces por su clase y atributo href (podríamos ser más específicos)
    const facebookLink = screen.getByRole('link', { name: /facebook/i });
    const instagramLink = screen.getByRole('link', { name: /instagram/i });
    const twitterLink = screen.getByRole('link', { name: /twitter/i });

    // Verificamos que los 3 enlaces existan
    expect(facebookLink).toBeInTheDocument();
    expect(instagramLink).toBeInTheDocument();
    expect(twitterLink).toBeInTheDocument();

    // Podríamos verificar también sus atributos 'href' si quisiéramos
    // expect(facebookLink).toHaveAttribute('href', '#'); 
  });

});