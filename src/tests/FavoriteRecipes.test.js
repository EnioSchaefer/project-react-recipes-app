import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import favoriteLocalStorage from './helpers/favoriteLocalStorage';

jest.mock('clipboard-copy');
const favRecipesRoute = '/favorite-recipes';

describe('Testa o componente FavoriteRecipes', () => {
  beforeEach(() => localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteLocalStorage)));

  test('Testa se as receitas favoritas sao mostradas na tela', () => {
    const { history } = renderWithRouter(<App />);

    act(() => history.push(favRecipesRoute));
    expect(history.location.pathname).toBe(favRecipesRoute);

    const favoriteCards = screen.getAllByRole('link');
    expect(favoriteCards.length).toBe(6);
  });

  test('Testa se ao clicar na foto ou no nome da receita e redirecionado para detalhes da receita', () => {
    const { history } = renderWithRouter(<App />);

    act(() => history.push(favRecipesRoute));
    expect(history.location.pathname).toBe(favRecipesRoute);

    const favoriteCards = screen.getAllByRole('link');

    userEvent.click(favoriteCards[0]);
    expect(history.location.pathname).toBe('/meals/53013');

    userEvent.click(favoriteCards[1]);
    expect(history.location.pathname).toBe('/meals/53013');
  });

  test('Testa se o botao de desfavoritar funciona corretamente', () => {
    const { history } = renderWithRouter(<App />);

    act(() => history.push(favRecipesRoute));
    expect(history.location.pathname).toBe(favRecipesRoute);

    const unfavoriteBtn = screen.getAllByAltText('unfavorite button');

    userEvent.click(unfavoriteBtn[0]);

    const currLocalStg = JSON.parse(localStorage.getItem('favoriteRecipes'));
    expect(currLocalStg.length).toBe(2);
  });

  test('Testa se os nomes sao renderizados corretamente', () => {
    const { history } = renderWithRouter(<App />);

    act(() => history.push(favRecipesRoute));
    expect(history.location.pathname).toBe(favRecipesRoute);

    const favName = screen.getByTestId('0-horizontal-top-text');

    expect(favName.innerHTML).toContain('American');
    expect(favName.innerHTML).toContain('Beef');
  });

  test('Testa se o botao de compartilhar aparece na tela', () => {
    const { history } = renderWithRouter(<App />);

    act(() => history.push(favRecipesRoute));
    expect(history.location.pathname).toBe(favRecipesRoute);

    const shareBtn = screen.getAllByAltText('share button');
    expect(shareBtn[0].src).toBe('http://localhost/shareIcon.svg');
  });

  test('Testa se os botoes de filtro funcionam', () => {
    const { history } = renderWithRouter(<App />);

    act(() => history.push(favRecipesRoute));
    expect(history.location.pathname).toBe(favRecipesRoute);

    const filterMealBtn = screen.getByTestId('filter-by-meal-btn');
    userEvent.click(filterMealBtn);

    const links01 = screen.getAllByRole('link');
    expect(links01).toHaveLength(6);

    const filterDrinkBtn = screen.getByTestId('filter-by-drink-btn');
    userEvent.click(filterDrinkBtn);

    const filterAllBtn = screen.getByTestId('filter-by-all-btn');
    userEvent.click(filterAllBtn);

    const links02 = screen.getAllByRole('link');
    expect(links02).toHaveLength(6);
  });

  test('Testa se aparece uma mensagem de tela vazia se nao houver receitas favoritas', () => {
    const { history } = renderWithRouter(<App />);

    localStorage.clear('favoriteRecipes');

    act(() => history.push(favRecipesRoute));
    expect(history.location.pathname).toBe(favRecipesRoute);

    const empty = screen.getByText('Sem receitas favoritas :(');
    expect(empty).toBeInTheDocument();
  });

  test('Testa se o botao de compartilhar chama a funcao correta', () => {
    const { history } = renderWithRouter(<App />);

    act(() => history.push(favRecipesRoute));
    expect(history.location.pathname).toBe(favRecipesRoute);

    const shareBtn = screen.getByTestId('0-horizontal-share-btn');
    expect(shareBtn).toBeInTheDocument();
    act(() => userEvent.click(shareBtn));

    const copiedText = screen.getByText('Link copied!');
    expect(copiedText).toBeInTheDocument();
  });
});
