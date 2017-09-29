import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import stop from './stop'

export default combineReducers({
  routing: routerReducer,
  stop
});
