import React from 'react';
import { screen, act } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './Helpers/renderWith';

describe('Testa a tela de RecipeInprogress', () => {
  it.skip('verifica os botões', async () => {
    const { history } = renderWithRouter(<App />);

    act(() => { history.push('/meals/52977'); });

    const btnStartRecipe = await screen.findByTestId('finish-recipe-btn');
    expect(btnStartRecipe).toBeInTheDocument();
  });
});
