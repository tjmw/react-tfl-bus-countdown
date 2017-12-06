import React from 'react';
import { Route, Link } from 'react-router-dom';
import Home from '../home';
import Stop from '../stop';

import { View, Button } from 'react-native'

const App = () => (
  <View>
    <View>
      <Button title="Show nearby stops" />
    </View>
    <View>
      <Route exact path="/" component={Home} />
      <Route exact path="/stop/:naptanId" component={Stop} />
    </View>
  </View>
);

export default App;
