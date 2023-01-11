import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
// import AppProvider from '../context/AppProvider';
import renderWithRouter from './helpers/renderWithRouter';

describe('Testes do Header', () => {
  it('Verifica a funcionalidade do botão de perfil', async () => {
    const { history } = renderWithRouter(<App />);

    act(() => history.push('/meals'));
    await screen.findAllByText('Meals');

    const profileButton = await screen.getByTestId('profile-top-btn');
    expect(profileButton).toBeInTheDocument();
    userEvent.click(profileButton);
    expect(history.location.pathname).toBe('/profile');
  });

  it('Verifica a funcionalidade do botão de pesquisa', async () => {
    const { history } = renderWithRouter(<App />);

    act(() => history.push('/meals'));

    const searchButton = await screen.findByTestId('search-button');

    userEvent.click(searchButton);

    const searchInput = await screen.getByTestId('search-input');
    expect(searchInput).toBeNull();

    expect(await screen.findByTestId('search-top-btn')).toBeInTheDocument();
    userEvent.click(await screen.findByTestId('search-top-btn'));

    expect(searchInput).not.toBeVisible();
  });
});
