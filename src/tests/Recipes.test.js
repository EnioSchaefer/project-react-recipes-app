import React from 'react';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import fetch from '../../cypress/mocks/fetch';

describe('Testa o componente Recipes', () => {
  afterEach(() => jest.clearAllMocks());

  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(fetch);
  });

  test('Testa se os cards de meals aparecem na tela', async () => {
    const { history } = renderWithRouter(<App />);

    act(() => history.push('/meals'));
    expect(history.location.pathname).toBe('/meals');

    const loading = screen.getByText('Loading Recipes...');
    waitForElementToBeRemoved(loading);

    const cardRecipes = await screen.findAllByRole('link');
    expect(cardRecipes.length).toBe(12);
  });

  test('Testa se os cards de drinks aparecem na tela', async () => {
    const { history } = renderWithRouter(<App />);

    act(() => history.push('/drinks'));
    expect(history.location.pathname).toBe('/drinks');

    const loading = screen.getByText('Loading Recipes...');
    waitForElementToBeRemoved(loading);

    const cardRecipes = await screen.findAllByRole('link');
    expect(cardRecipes.length).toBe(12);
  });
});
