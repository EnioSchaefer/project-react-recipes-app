import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
// import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';

import Login from './components/Login';
import TelaPrincipal from './components/TelaPrincipal';

function App() {
  return (

    <div>
      {/* <span className="logo">TRYBE</span>
      <object
        className="rocksGlass"
        type="image/svg+xml"
        data={ rockGlass }
      >
        Glass
      </object> */}
      {/* <Login /> */}
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/meals" component={ TelaPrincipal } />
        <Route exact path="/drinks" component={ TelaPrincipal } />
        {/* falta especificar o componente certo da tela Priincipal */}
      </Switch>
    </div>
  );
}

export default App;
