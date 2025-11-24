import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';

// Jasmine usa 'describe' y 'it' igual que Vitest, pero las aserciones cambian ligeramente
describe('Componente Footer', () => {

  it('debería renderizar el texto de copyright', () => {
    render(<Footer />);
    // Buscamos el elemento
    const copyrightText = screen.getByText(/© 2024 Level-Up Gamer/i);
    
    // Aserción estilo Jasmine puro (sin jest-dom)
    expect(copyrightText).toBeTruthy(); // Verifica que el elemento exista
  });

  it('debería renderizar los enlaces a redes sociales', () => {
    render(<Footer />);

    // Usamos getByRole que lanza error si no encuentra el elemento,
    // por lo que si la prueba continúa, es que existen.
    const facebookLink = screen.getByRole('link', { name: /facebook/i });
    
    expect(facebookLink).not.toBeNull();
  });
});