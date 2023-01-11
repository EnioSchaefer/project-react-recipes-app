import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('Testa o componente Footer', () => {
  it('Verifica as funcionalidades do botão de comdia', async () => {
    const { history } = renderWithRouter(<App />);

    act(() => history.push('/meals'));
    await screen.findAllByText('Meals');

    const mealsButton = await screen.getByTestId('meals-bottom-btn');
    expect(mealsButton).toBeInTheDocument();
    userEvent.click(mealsButton);
    expect(history.location.pathname).toBe('/meals');
  });

  it('Verifica as funcionalidades do botão de bebidas', async () => {
    const { history } = renderWithRouter(<App />);

    act(() => history.push('drinks'));
    await screen.findAllByText('Drinks');

    const drinksButton = await screen.getByTestId('drinks-bottom-btn');
    expect(drinksButton).toBeInTheDocument();
    userEvent.click(drinksButton);
    expect(history.location.pathname).toBe('/drinks');
  });
});
