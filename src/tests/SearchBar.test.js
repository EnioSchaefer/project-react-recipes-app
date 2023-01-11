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
});
