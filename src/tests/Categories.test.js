import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import { MOCK_MEALS, mealCategories } from './helpers/mocks/principal';

describe('testa Categories', () => {
  it('', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(MOCK_MEALS)
        .mockResolvedValueOnce(mealCategories)
        .mockResolvedValueOnce(MOCK_MEALS),
    });
    const { history } = renderWithRouter(<App />);

    act(() => history.push('/meals'));
    await screen.findAllByText('Meals');

    const beefButton = await screen.findByTestId('Beef-category-filter');
    userEvent.click(beefButton);

    const allButton = await screen.findByTestId('All-category-filter');
    userEvent.click(allButton);
  });
});
