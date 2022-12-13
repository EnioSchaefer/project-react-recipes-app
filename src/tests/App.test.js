import React from 'react';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

test('Renderiza o App', () => {
  renderWithRouter(<App />);
});
