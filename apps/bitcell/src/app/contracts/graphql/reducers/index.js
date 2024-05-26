// reducers/index.js
import { combineReducers } from 'redux';
import lipidStoreReducer from './lipidStoreReducer';

export default combineReducers({
  lipidStore: lipidStoreReducer,
});