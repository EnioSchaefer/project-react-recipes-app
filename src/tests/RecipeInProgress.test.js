import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
// import RecipeProvider from '../context/RecipeContext';

test('Testes da Tela de receita em progresso', () => {
  renderWithRouter(
    <App />,

  );
  const imgRecipe = screen.getByTestId(/imageOf/i);
  expect(imgRecipe).toBeInTheDocument();
});
