import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import MainRecipes from './pages/MainRecipes';

function App() {
  return (
    <div className="meals">
      <Switch>
        <Route exact path="/drinks" component={ MainRecipes } />
        <Route exact path="/meals" component={ MainRecipes } />
      </Switch>
    </div>
  );
}

export default App;
