import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import copy from 'clipboard-copy';
import App from '../App';
import renderWithRouter from './Helpers/renderWith';
import fetch from '../../cypress/mocks/fetch';

describe('Testa a tela de RecipeInprogress', () => {
  jest.mock('clipboard-copy');
  afterEach(() => {
    jest.resetAllMocks();
  });

  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(fetch);
  });

  it('verifica os botões', async () => {
    const { history } = renderWithRouter(<App />);

    act(() => { history.push('/meals/52771/in-progress'); });

    const mainImg = await screen.findByTestId('recipe-photo');
    expect(mainImg).toBeInTheDocument();

    const btnFavorite = await screen.findByTestId('favorite-btn');
    expect(btnFavorite).toBeInTheDocument();
    expect(btnFavorite).toHaveAttribute('src', 'whiteHeartIcon.svg');
    userEvent.click(btnFavorite);
    expect(btnFavorite).toHaveAttribute('src', 'blackHeartIcon.svg');
    userEvent.click(btnFavorite);
    expect(btnFavorite).toHaveAttribute('src', 'whiteHeartIcon.svg');

  it.skip('verifica os botões', async () => {
    const { history } = renderWithRouter(<App />);

    act(() => { history.push('/meals/52977'); });


    const btnStartRecipe = await screen.findByTestId('finish-recipe-btn');
    expect(btnStartRecipe).toBeInTheDocument();
    userEvent.click(btnStartRecipe);
    expect(history.location.pathname).toBe('/done-recipes');
  });

  it('verifica os renderizacao e inputs', async () => {
    copy.mockImplementation(() => {});
    const { history } = renderWithRouter(<App />);

    act(() => { history.push('/drinks/178319/in-progress'); });

    const ingredient = await screen.findByTestId('0-ingredient-name-and-measure');
    expect(ingredient).toBeInTheDocument();
    userEvent.click(ingredient);

    const btnShare = await screen.findByTestId('share-btn');
    expect(btnShare).toBeInTheDocument();
    userEvent.click(btnShare);
    jest.clearAllMocks();
  });

  // it('verifica os renderizacao e inputs', async () => {
  //   const { history } = renderWithRouter(<App />);

  //   act(() => { history.push('/drinks/178319/in-progress'); });

  //   const isAlcoholic = await screen.findByTestId('recipe-category');
  //   expect(isAlcoholic).toBeInTheDocument();
  //   expect(isAlcoholic).toHaveTextContent('Alcoholic');
  // });
});
