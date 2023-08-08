import { createStore, combineReducers } from 'redux';
import authReducer from './authReducer';
import shoppingListReducer from './shoppingList';

const rootReducer = combineReducers({
  auth: authReducer,
  shoppingList: shoppingListReducer, 
});

const store = createStore(rootReducer);

export default store;