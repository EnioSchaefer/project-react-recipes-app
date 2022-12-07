import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
// import Drinks from './pages/Drinks';
// import Meals from './pages/Meals';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import MainRecipes from './pages/MainRecipes';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" />
        <Route exact path="meals/:id" />
        <Route exact path="/drinks/:id" />
        <Route exact path="/meals/:id/in-progress" />
        <Route exact path="/drinks/:id/in-progress" />
        <Route exact path="/drinks" component={ MainRecipes } />
        <Route exact path="/meals" component={ MainRecipes } />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/done-recipes" component={ DoneRecipes } />
        <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
      </Switch>
    </div>
  );
}

export default App;
