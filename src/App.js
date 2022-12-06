import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import RecipeDetails from './components/RecipeDetails';
import MainRecipes from './pages/MainRecipes';
import DoneRecipes from './pages/DoneRecipes';

function App() {
  return (
    <Switch>
      <Route exact path="/drinks" component={ MainRecipes } />
      <Route exact path="/meals" component={ MainRecipes } />
      <Route exact path="/drinks/:id" component={ RecipeDetails } />
      <Route exact path="/meals/:id" component={ RecipeDetails } />
      <Route exact path="/done-recipes" component={ DoneRecipes } />
    </Switch>
  );
}

export default App;
