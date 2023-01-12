import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import copy from 'clipboard-copy';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import fetch from '../../cypress/mocks/fetch';

jest.mock('clipboard-copy');

const drink = '/drinks/178319/in-progress';

const expectedDoneRecipes = {
  id: '178319',
  nationality: '',
  name: 'Aquamarine',
  category: 'Cocktail',
  image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
  tags: [],
  alcoholicOrNot: 'Alcoholic',
  type: 'drink',
};

describe('Testa a tela de RecipeInprogress', () => {
  localStorage.setItem('doneRecipes', JSON.stringify(expectedDoneRecipes));
  jest.mock('clipboard-copy');
  afterEach(() => {
    jest.resetAllMocks();
  });

  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(fetch);
  });

  test('verifica os botões', async () => {
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
  });
  test('verifica os botões', async () => {
    const { history } = renderWithRouter(<App />);
    localStorage.clear();

    act(() => { history.push(drink); });
    await screen.findByTestId('0-ingredient-name-and-measure');

    const ingredient = await screen.findByTestId('0-ingredient-steps');
    expect(ingredient).toBeInTheDocument();
    userEvent.click(ingredient);
    screen.logTestingPlaygroundURL();
    const ingredient1 = await screen.findByTestId('1-ingredient-steps');
    expect(ingredient1).toBeInTheDocument();
    userEvent.click(ingredient1);
    const ingredient2 = await screen.findByTestId('2-ingredient-steps');
    expect(ingredient2).toBeInTheDocument();
    userEvent.click(ingredient2);
    const btnFinishRecipe = await screen.findByTestId('finish-recipe-btn');
    expect(btnFinishRecipe).toBeEnabled();

    userEvent.click(btnFinishRecipe);
    expect(history.location.pathname).toBe('/done-recipes');
  });

  test('verifica os renderizacao e inputs', async () => {
    copy.mockImplementation(() => {});
    const { history } = renderWithRouter(<App />);

    act(() => { history.push(drink); });

    const ingredient = await screen.findByTestId('0-ingredient-name-and-measure');
    expect(ingredient).toBeInTheDocument();
    userEvent.click(ingredient);

    const btnShare = await screen.findByTestId('share-btn');
    expect(btnShare).toBeInTheDocument();
    userEvent.click(btnShare);
    jest.clearAllMocks();
  });

  // test('Testa se o botao de compartilhar chama a funcao correta', () => {
  //   const { history } = renderWithRouter(<App />);

  //   act(() => history.push('/in-progress'));
  //   expect(history.location.pathname).toBe('/in-progress');

  //   const shareBtn = screen.getByTestId('0-horizontal-share-btn');
  //   expect(shareBtn).toBeInTheDocument();
  //   act(() => userEvent.click(shareBtn));

  //   const copiedText = screen.getByText('Link copied!');
  //   expect(copiedText).toBeInTheDocument();
  // });

  it('testa Share Btn', async () => {
    copy.mockImplementation(() => {});
    const { history } = renderWithRouter(<App />);
    act(() => history.push('/drinks/178319/in-progress'));

    const shareBtn = await screen.findByTestId('share-btn');
    expect(shareBtn).toBeInTheDocument();
    userEvent.click(shareBtn); await new Promise((r) => { setTimeout(r, 2000); });
    // const shareMsg = await screen.findByTestId('share');
    // expect(shareMsg).toHaveTextContent('Link copied!');
    jest.clearAllMocks();
  });
});

// it('verifica os renderizacao e inputs', async () => {
//   const { history } = renderWithRouter(<App />);

//   act(() => { history.push('/drinks/178319/in-progress'); });

//   const isAlcoholic = await screen.findByTestId('recipe-category');
//   expect(isAlcoholic).toBeInTheDocument();
//   expect(isAlcoholic).toHaveTextContent('Alcoholic');
// });
