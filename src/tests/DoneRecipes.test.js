import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import copy from 'clipboard-copy';
import renderWithRouter from './helpers/renderWithRouter';
import fetch from '../../cypress/mocks/fetch';
import App from '../App';

const doneRecipe = [
  {
    id: '52771',
    type: 'meal',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    doneDate: '23/06/2020',
    tags: ['Pasta', 'Curry'],
  },
  {
    id: '178319',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    doneDate: '23/06/2020',
    tags: [],
  },
];

const doneLink = '/done-recipes';
jest.mock('clipboard-copy');

describe('Testa a tela de Done Recipes', () => {
  localStorage.setItem('doneRecipes', JSON.stringify(doneRecipe));

  afterEach(() => {
    jest.resetAllMocks();
  });

  jest.mock('clipboard-copy');

  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(fetch);
  });

  it('verifica se renderiza lista de receitas feitas', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => history.push(doneLink));

    const done = await screen.findAllByTestId('done');
    expect(done).toHaveLength(2);
  });

  it('Filtros all e meal', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => history.push(doneLink));

    const allBtn = await screen.findByTestId('filter-by-all-btn');
    expect(allBtn).toBeInTheDocument();
    userEvent.click(allBtn);

    const doneRecipe1 = await screen.findByTestId('0-horizontal-image');
    expect(doneRecipe1).toBeInTheDocument();
    const doneRecipe2 = await screen.findByTestId('1-horizontal-image');
    expect(doneRecipe2).toBeInTheDocument();

    const mealsBtn = await screen.findByTestId('filter-by-meal-btn');
    userEvent.click(mealsBtn);

    const mealsRecipe = await screen.findByTestId('0-horizontal-name');
    expect(mealsRecipe).toHaveTextContent('Spicy Arrabiata Penne');
  });

  it('teste filtro drink', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => history.push(doneLink));

    const allBtn = await screen.findByTestId('filter-by-all-btn');
    expect(allBtn).toBeInTheDocument();
    userEvent.click(allBtn);

    const doneRecipe1 = await screen.findByTestId('0-horizontal-image');
    expect(doneRecipe1).toBeInTheDocument();
    const doneRecipe2 = await screen.findByTestId('1-horizontal-image');
    expect(doneRecipe2).toBeInTheDocument();

    const drinksBtn = await screen.findByTestId('filter-by-drink-btn');
    userEvent.click(drinksBtn);

    const drinksRecipe = await screen.findByTestId('0-horizontal-name');
    expect(drinksRecipe).toHaveTextContent('Aquamarine');
  });

  it('testa Share Btn', async () => {
    copy.mockImplementation(() => {});
    const { history } = renderWithRouter(<App />);
    act(() => history.push(doneLink));

    const shareBtn = await screen.findByTestId('0-horizontal-share-btn');
    expect(shareBtn).toBeInTheDocument();
    userEvent.click(shareBtn); await new Promise((r) => { setTimeout(r, 2000); });
    // const shareMsg = await screen.findByTestId('share');
    // expect(shareMsg).toHaveTextContent('Link copied!');
    jest.clearAllMocks();
  });
});
