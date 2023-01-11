import React from 'react';
// import { render } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './Helpers/renderWith';
// import RecipeProvider from '../context/RecipeContext';

test('Testes da Tela de receita em progresso', () => {
  renderWithRouter(
    <App />,
  );
});
