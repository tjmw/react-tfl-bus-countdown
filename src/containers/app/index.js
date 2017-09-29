import React from 'react';
import { Route, Link } from 'react-router-dom';
import Home from '../home';
import Stop from '../stop';

const App = () => (
  <div>
    <header>
      <Link to="/">Home</Link>
      <Link to="/stop">Example Stop</Link>
    </header>

    <main>
      <Route exact path="/" component={Home} />
      <Route exact path="/stop" component={Stop} />
    </main>
  </div>
);

export default App;
