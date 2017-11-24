import React from 'react';
import { Route, Link } from 'react-router-dom';
import Home from '../home';
import Stop from '../stop';

const App = () => (
  <div>
    <div className="header">
      <a className="pure-button pure-button-primary button-large" href="#">Show nearby stops</a>
    </div>
    <div className="content">
      <Route exact path="/" component={Home} />
      <Route exact path="/stop/:naptanId" component={Stop} />
    </div>
  </div>
);

export default App;
