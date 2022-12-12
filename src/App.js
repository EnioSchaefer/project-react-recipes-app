import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import RecipeDetails from './components/RecipeDetails';
// import RecipeInProgress from './components/RecipeInProgress';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import MainRecipes from './pages/MainRecipes';
import Login from './components/Login';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/drinks" component={ MainRecipes } />
      <Route exact path="/meals" component={ MainRecipes } />
      <Route exact path="/drinks/:id" component={ RecipeDetails } />
      <Route exact path="/meals/:id" component={ RecipeDetails } />
      <Route exact path="/drinks/:id/in-progress" component={ {} } />
      <Route exact path="/meals/:id/in-progress" component={ {} } />
      <Route exact path="/done-recipes" component={ DoneRecipes } />
      <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
      <Route exact path="/profile" component={ Profile } />
    </Switch>
  );
}

export default App;
