import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'; // Necesario porque usamos Link
import ProductoCard from './ProductoCard';

describe('Componente ProductoCard', () => {
  
  const productoPrueba = {
    id: 1,
    nombre: 'Silla Gamer Test',
    precio: 150000,
    categoria: 'Sillas',
    imagen: 'img/silla.jpg',
    descripcion: 'Silla de prueba'
  };

  it('debería renderizar correctamente el nombre y el precio (Props)', () => {
    render(
      <BrowserRouter>
        <ProductoCard producto={productoPrueba} />
      </BrowserRouter>
    );

    // Verificamos texto con Jasmine
    expect(screen.getByText('Silla Gamer Test')).toBeTruthy();
    
    // Para el precio usamos una expresión regular para ser flexibles con el formato
    // getByText lanzará error si no lo encuentra
    expect(screen.getByText(/\$150\.000/)).toBeTruthy();
  });

  it('debería llamar a la función onClick al hacer clic (Eventos)', () => {
    // Jasmine tiene 'spies' (espías) nativos
    const spyClick = jasmine.createSpy('onClickSpy');

    render(
      <BrowserRouter>
        <ProductoCard producto={productoPrueba} onClick={spyClick} />
      </BrowserRouter>
    );

    const boton = screen.getByRole('button', { name: /Añadir/i });
    fireEvent.click(boton);

    // Verificamos el espía de Jasmine
    expect(spyClick).toHaveBeenCalledWith(1); // Verificamos que se llamó con el ID 1
  });
});