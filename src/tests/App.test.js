import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
// import RecipeProvider from '../context/RecipeContext';

test('Testes da Tela de receita em progresso', () => {
  render(
    <App />,
  );
  const imgRecipe = screen.getByTestId(/imageOf/i);
  expect(imgRecipe).toBeInTheDocument();
});
