import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { RecipeProvider } from './context/RecipeContext';
import { LoginProvider } from './context/LoginContext';

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    <BrowserRouter>
      <LoginProvider>
        <RecipeProvider>
          <App />
        </RecipeProvider>
      </LoginProvider>
    </BrowserRouter>,
  );
