import React from 'react';
import { screen, act } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './Helpers/renderWith';

describe('Testa a tela de RecipeInprogress', () => {
  it('verifica os botões', async () => {
    const { history } = renderWithRouter(<App />);

    act(() => { history.push('/meals/52977/in-progress'); });

    const btnStartRecipe = await screen.findByTestId('finish-recipe-btn');
    expect(btnStartRecipe).toBeInTheDocument();
  });
});
