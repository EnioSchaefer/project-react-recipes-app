import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import Profile from '../pages/Profile';
import renderWithRouter from './helpers/renderWithRouter';

beforeEach(() => localStorage.setItem('user', JSON.stringify({ email: '1231231311@ghasgj.com' })));

describe('Testa o componente Profile', () => {
  test('testa se o email e renderizado na tela', () => {
    renderWithRouter(<Profile />);

    const screenEmail = screen.getByTestId('profile-email');
    expect(screenEmail).toBeDefined();
    expect(screenEmail).toContainHTML('1231231311@ghasgj.com');
  });

  test('testa se a tela possui os tres botoes corretos', () => {
    renderWithRouter(<Profile />);

    const doneBtn = screen.getByTestId('profile-done-btn');
    const favoriteBtn = screen.getByTestId('profile-favorite-btn');
    const logoutBtn = screen.getByTestId('profile-logout-btn');
    expect(doneBtn).toBeInTheDocument();
    expect(favoriteBtn).toBeInTheDocument();
    expect(logoutBtn).toBeInTheDocument();
  });

  test('testa se o botao Done Recipes leva a tela de receitas feitas', () => {
    const { history } = renderWithRouter(<Profile />);

    const doneBtn = screen.getByTestId('profile-done-btn');
    act(() => userEvent.click(doneBtn));

    expect(history.location.pathname).toBe('/done-recipes');
  });

  test('testa se o botao Favorite Recipes leva a tela de receitas favoritas', () => {
    const { history } = renderWithRouter(<Profile />);

    const favoriteBtn = screen.getByTestId('profile-favorite-btn');
    act(() => userEvent.click(favoriteBtn));

    expect(history.location.pathname).toBe('/favorite-recipes');
  });

  test('testa se o botao logout limpa o localStorage leva a tela de login', () => {
    const { history } = renderWithRouter(<Profile />);

    const logoutBtn = screen.getByTestId('profile-logout-btn');
    act(() => userEvent.click(logoutBtn));

    expect(localStorage.getItem('user')).toBeNull();
    expect(history.location.pathname).toBe('/');
  });
});
