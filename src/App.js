import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import RecipeDetails from './components/RecipeDetails';
import RecipeInProgress from './components/RecipeInProgress';
import MainRecipes from './pages/MainRecipes';

function App() {
  return (
    <Switch>
      <Route exact path="/drinks" component={ MainRecipes } />
      <Route exact path="/meals" component={ MainRecipes } />
      <Route exact path="/drinks/:id" component={ RecipeDetails } />
      <Route exact path="/meals/:id" component={ RecipeDetails } />
      <Route exact path="/drinks/:id/in-progress" component={ RecipeInProgress } />
      <Route exact path="/meals/:id/in-progress" component={ RecipeInProgress } />
    </Switch>
  );
}

export default App;
