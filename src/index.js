import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import store, { history } from './redux/store';
import App from './components/app';
import { AppRegistry } from 'react-native'

const MyApp = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>
);

// App registration and rendering
AppRegistry.registerComponent('MyApp', () => MyApp)
AppRegistry.runApplication('MyApp', { rootTag: document.getElementById('root') })
