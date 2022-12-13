import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

const emailTestId = 'email-input';
const passwordTestId = 'password-input';
const btnTestId = 'login-submit-btn';
const testEmail = 'teste@email.com';
const testPassword = '1234567';

describe('Testa o componente Login', () => {
  test('Testa se os inputs e botao estao na tela', () => {
    renderWithRouter(<App />);

    const emailInput = screen.getByTestId(emailTestId);
    const passwordInput = screen.getByTestId(passwordTestId);
    const logInBtn = screen.getByTestId(btnTestId);
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(logInBtn).toBeInTheDocument();
  });

  test('Testa se o botao inicia desabilitado e habilita quando necessario', () => {
    renderWithRouter(<App />);

    const emailInput = screen.getByTestId(emailTestId);
    const passwordInput = screen.getByTestId(passwordTestId);
    const logInBtn = screen.getByTestId(btnTestId);
    expect(logInBtn).toBeDisabled();

    act(() => {
      userEvent.type(emailInput, testEmail);
      userEvent.type(passwordInput, testPassword);
    });

    const updatedLogInBtn = screen.getByTestId(btnTestId);
    expect(updatedLogInBtn).toBeEnabled();
  });

  test('Testa se ao clicar no botao os dados sao salvos no localStorage e o usuario enviado a pagina de Meals', () => {
    const { history } = renderWithRouter(<App />);

    expect(history.location.pathname).toBe('/');
    const emailInput = screen.getByTestId(emailTestId);
    const passwordInput = screen.getByTestId(passwordTestId);
    const logInBtn = screen.getByTestId(btnTestId);

    act(() => {
      userEvent.type(emailInput, testEmail);
      userEvent.type(passwordInput, testPassword);
      userEvent.click(logInBtn);
    });

    const localStg = JSON.parse(localStorage.getItem('user'));
    expect(localStg.email).toBe(testEmail);

    expect(history.location.pathname).toBe('/meals');
  });
});
