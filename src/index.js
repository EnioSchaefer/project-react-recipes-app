import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { RecipeProvider } from './context/RecipeContext';
import { LoginProvider } from './context/LoginContext';

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    <LoginProvider>
      <RecipeProvider>
        <App />
      </RecipeProvider>
    </LoginProvider>,
  );
