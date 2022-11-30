import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import RecipeInProgress from './components/RecipeInProgress';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          path="/meals/:id-da-receita/in-progress"
        />
        <Route
          path="/drinks/:id-da-receita/in-progress"
        />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
