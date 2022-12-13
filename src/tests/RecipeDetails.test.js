import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import fetch from '../../cypress/mocks/fetch';
import App from '../App';

const drink = '/drinks/178319';
describe('Testa a tela de Recipe Details', () => {
  localStorage.setItem('inProgressRecipes', JSON.stringify({ drinks: { 178319: ['Pineapple Juice-ingredient-1'] } }));

  afterEach(() => {
    jest.resetAllMocks();
  });

  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(fetch);
  });

  it('verifica meals/id', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => history.push('/meals/52771'));

    const mealRecipe = await screen.findByTestId('recipe-title');
    expect(mealRecipe).toBeInTheDocument();
    expect(mealRecipe).toHaveTextContent('Spicy Arrabiata Penne');

    const mealIngred = await screen.findByTestId('0-ingredient-name-and-measure');
    expect(mealIngred).toBeInTheDocument();
    expect(mealIngred).toHaveTextContent('penne rigate');

    const ytVideo = await screen.findByTestId('video');
    expect(ytVideo).toBeInTheDocument();
  });

  it('verifica drinks/id', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => history.push(drink));

    const drinkRecipe = await screen.findByTestId('recipe-title');
    expect(drinkRecipe).toBeInTheDocument();
    expect(drinkRecipe).toHaveTextContent('Aquamarine');

    const carousel = await screen.findByTestId('0-recommendation-card');
    expect(carousel).toBeInTheDocument();
    const carousel1 = await screen.findByTestId('1-recommendation-card');
    expect(carousel1).toBeInTheDocument();
  });

  it('Verifica favoritos e share', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => history.push('/meals/52771'));

    const fav = await screen.findByTestId('favorite-btn');
    expect(fav).toBeInTheDocument();
    expect(fav).toHaveAttribute('src', 'whiteHeartIcon.svg');
    userEvent.click(fav);
    expect(fav).toHaveAttribute('src', 'blackHeartIcon.svg');

    const share = screen.getByTestId('share-btn');
    expect(share).toBeInTheDocument();
  });

  it('Verifica Start Button', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => history.push(drink));

    const startBtn = await screen.findByTestId('start-recipe-btn');
    expect(startBtn).toBeInTheDocument();
    userEvent.click(startBtn);
    expect(history.location.pathname).toBe('/drinks/178319/in-progress');

    act(() => history.push('/drinks/178319/in-progress'));
    const ingredient = await screen.findByTestId('0-ingredient-step');
    userEvent.click(ingredient);
    act(() => history.push(drink));
    expect(startBtn).toHaveTextContent('Continue Recipe');
  });
});
