import { createStore, combineReducers } from 'redux';
import authReducer from './authReducer';
import shoppingListReducer from './shoppingList';
import recipesReducer from './recipesRecuer';

const rootReducer = combineReducers({
  auth: authReducer,
  shoppingList: shoppingListReducer, 
  recipes: recipesReducer
});

const store = createStore(rootReducer);

export default store;