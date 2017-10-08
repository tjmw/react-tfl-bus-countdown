import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import predictions from './modules/predictions/reducer'

export default combineReducers({
  routing: routerReducer,
  predictions
});
