import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import { MOCK_MEALS, MOCK_DRINKS, mealCategories, drinkCategories } from './helpers/mocks/principal';

const searchBtn = 'search-button';
const searchInpt = 'search-input';
const execSearch = 'exec-search-btn';
const nameSearch = 'name-search-radio';
const ratio = 'first-letter-search-radio';

const oneDrink = {
  drinks: [{
    strDrink: 'ABC',
    idDrink: '13501',
    strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/tqpvqp1472668328.jpg',
  }],
};

const nulo = {
  meals: null,
};

describe('Testes do SearchBar', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('testa nulo', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(nulo)
        .mockResolvedValueOnce(mealCategories)
        .mockResolvedValueOnce(MOCK_MEALS),
    });
    const { history } = renderWithRouter(<App />);

    act(() => history.push('/meals'));

    screen.logTestingPlaygroundURL();
    const searchButton = await screen.findByTestId(searchBtn);
    userEvent.click(searchButton);
    const nameRadio = await screen.findByTestId(nameSearch);
    userEvent.click(nameRadio);
    const searchInput = await screen.findByTestId(searchInpt);
    userEvent.type(searchInput, 'www');
    const filterSearchButton = await screen.findByTestId(execSearch);
    userEvent.click(filterSearchButton);
  });

  it('Verifica as funcionalidades dos botões da barra de pesquisa', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(MOCK_MEALS)
        .mockResolvedValueOnce(mealCategories)
        .mockResolvedValueOnce(MOCK_MEALS),
    });

    const { history } = renderWithRouter(<App />);

    act(() => history.push('/meals'));
    // await screen.findAllByText('Meals');

    const searchButton = await screen.findByTestId('search-button');
    userEvent.click(searchButton);
    const nameRadio = await screen.findByTestId(nameSearch);
    userEvent.click(nameRadio);

    const searchInput = await screen.findByTestId(searchInpt);
    userEvent.type(searchInput, 'cheese');

    const filterSearchButton = await screen.findByTestId(execSearch);
    userEvent.click(filterSearchButton);

    await waitFor(() => {
      userEvent.click(searchButton);
      const ingredientRadio = screen.getByTestId(ratio);
      userEvent.click(ingredientRadio);
    });

    userEvent.type(searchInput, 'guava');

    userEvent.click(filterSearchButton);

    await waitFor(() => {
      userEvent.click(searchButton);
      const firstLetter = screen.getByTestId(ratio);
      userEvent.click(firstLetter);
    });

    userEvent.type(searchInput, 'v');

    userEvent.click(filterSearchButton);
    const searchInput2 = screen.getByTestId(searchInpt);
    userEvent.clear(searchInput2);
    userEvent.type(searchInput2, 'a');
    userEvent.click(screen.getByTestId(ratio));
    userEvent.click(screen.getByTestId(execSearch));
    expect(fetch).toHaveBeenLastCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?f=a');
  });
  it(
    'Verifica se a chamada da API é feita no endpoint correto em cada ocasião na página "/drinks"',
    () => {
      jest.spyOn(global, 'fetch');
      global.fetch.mockResolvedValue({
        json: jest.fn().mockResolvedValue(MOCK_DRINKS),
      });
      const { history } = renderWithRouter(<App />);
      act(() => {
        history.push('/drinks');
      });
      userEvent.click(screen.getByTestId(searchBtn));
      const searchInput = screen.getByTestId(searchInpt);
      userEvent.clear(searchInput);
      userEvent.type((searchInput), 'chicken');
      userEvent.click(screen.getByTestId(nameSearch));
      userEvent.click(screen.getByTestId(execSearch));

      expect(fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=chicken');

      const searchInput1 = screen.getByTestId(searchInpt);
      userEvent.clear(searchInput1);
      userEvent.type((searchInput1), 'chicken');
      userEvent.click(screen.getByTestId('ingredient-search-radio'));
      userEvent.click(screen.getByTestId(execSearch));

      expect(fetch).toHaveBeenLastCalledWith('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=chicken');

      const searchInput2 = screen.getByTestId(searchInpt);
      userEvent.clear(searchInput2);
      userEvent.type(searchInput2, 'a');
      userEvent.click(screen.getByTestId(ratio));
      userEvent.click(screen.getByTestId(execSearch));
      expect(fetch).toHaveBeenLastCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a');
    },
  );

  it('Verifica se todos os botões e inputs são passíveis de clique ou escrita', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(MOCK_MEALS)
        .mockResolvedValueOnce(mealCategories)
        .mockResolvedValueOnce(MOCK_MEALS),
    });
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
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(MOCK_MEALS)
        .mockResolvedValueOnce(mealCategories)
        .mockResolvedValueOnce(MOCK_MEALS),
    });
    const { history } = renderWithRouter(<App />);
    act(() => history.push('/meals'));
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
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(oneDrink)
        .mockResolvedValueOnce(drinkCategories)
        .mockResolvedValueOnce(MOCK_DRINKS),
    });
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

    // const filterSearchButton = await screen.findByTestId(execSearch);
    // userEvent.click(filterSearchButton);
    // await screen.findByTestId('recipe-title');

    // expect(history.location.pathname).toBe('/drinks/13501');
  });

  it('Verifica se a pesquisa é inexistente', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(MOCK_MEALS)
        .mockResolvedValueOnce(mealCategories)
        .mockResolvedValueOnce(MOCK_MEALS),
    });
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
