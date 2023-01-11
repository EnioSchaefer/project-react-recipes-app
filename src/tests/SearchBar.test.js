import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

const searchBtn = 'search-button';
const searchInpt = 'search-input';
const execSearch = 'exec-search-btn';
const nameSearch = 'name-search-radio';

describe('Testes do SearchBar', () => {
  it('Verifica as funcionalidades dos botões da barra de pesquisa', async () => {
    const { history } = renderWithRouter(<App />);

    act(() => history.push('/meals'));
    await screen.findAllByText('Meals');

    const searchButton = await screen.findByTestId(searchBtn);
    userEvent.click(searchButton);

    const nameRadio = await screen.findByTestId(nameSearch);
    userEvent.click(nameRadio);

    const searchInput = await screen.findByTestId(searchInpt);
    userEvent.type(searchInput, 'cheese');

    const filterSearchButton = await screen.findByTestId(execSearch);
    userEvent.click(filterSearchButton);

    await waitFor(() => {
      userEvent.click(searchButton);
      const ingredientRadio = screen.getByTestId('ingredient-search-radio');
      userEvent.click(ingredientRadio);
    });

    userEvent.type(searchInput, 'guava');

    userEvent.click(filterSearchButton);

    await waitFor(() => {
      userEvent.click(searchButton);
      const firstLetter = screen.getByTestId('first-letter-search-radio');
      userEvent.click(firstLetter);
    });

    userEvent.type(searchInput, 'v');

    userEvent.click(filterSearchButton);
  });

  it('Verifica se todos os botões e inputs são passíveis de clique ou escrita', async () => {
    const { history } = renderWithRouter(<App />);

    act(() => history.push('/meals'));
    await screen.findAllByText('Meals');

    const searchButton = await screen.findByTestId(searchBtn);
    userEvent.click(searchButton);

    const searchInput = await screen.findByTestId(searchInpt);
    expect(searchInput).toBeVisible();
    userEvent.type(searchInput, 'oil');

    const ingredientRadio = await screen.findByTestId('ingredient-search-radio');
    expect(ingredientRadio).toBeInTheDocument();
    userEvent.click(ingredientRadio);

    const filterSearchButton = await screen.findByTestId(execSearch);
    userEvent.click(filterSearchButton);
  });

  it('Verifica se ao digitar mais de uma letra na busca por first letter é exibido um aviso/alert', async () => {
    renderWithRouter(<App />);
    window.alert = () => {};

    const searchButton = await screen.findByTestId(searchBtn);
    userEvent.click(searchButton);

    const firstLetterRadio = await screen.findByTestId('first-letter-search-radio');
    userEvent.click(firstLetterRadio);

    const searchInput = await screen.findByTestId(searchInpt);
    expect(searchInput).toBeVisible();
    userEvent.type(searchInput, 'chicken');

    const filterSearchButton = await screen.findByTestId(execSearch);
    userEvent.click(filterSearchButton);
  });

  it('Verifica se o resultado da pesquisa tiver apenas um resultado a tela é redirecionada para pagina de detalhes', async () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/drinks');
    });

    const searchButton = await screen.findByTestId(searchBtn);
    userEvent.click(searchButton);

    const nameRadio = await screen.findByTestId(nameSearch);
    userEvent.click(nameRadio);

    const searchInput = await screen.findByTestId(searchInpt);
    userEvent.type(searchInput, 'ABC');

    const filterSearchButton = await screen.findByTestId(execSearch);
    userEvent.click(filterSearchButton);

    await waitFor(() => {
      expect(history.location.pathname).toBe('/drinks/13501');
    });
  });

  it('Verifica se a pesquisa é inexistente', async () => {
    const { history } = renderWithRouter(<App />);

    window.alert = () => {};

    act(() => {
      history.push('/meals');
    });

    const searchButton = await screen.findByTestId(searchBtn);
    userEvent.click(searchButton);

    const nameRadio = await screen.findByTestId(nameSearch);
    userEvent.click(nameRadio);

    const searchInput = await screen.findByTestId(searchInpt);
    userEvent.type(searchInput, 'arroz');

    const filterSearchButton = await screen.findByTestId(execSearch);
    userEvent.click(filterSearchButton);
  });
});
