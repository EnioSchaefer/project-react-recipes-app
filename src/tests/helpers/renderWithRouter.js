// src/renderWithRouter.js
import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { RecipeProvider } from '../../context/RecipeContext';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(
      <RecipeProvider>
        <Router history={ history }>
          {component}
        </Router>
      </RecipeProvider>,
    ),
    history });
};

export default renderWithRouter;
