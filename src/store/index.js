const redux = require('redux');

const authReducer = (state = {logginUser: null}, action) => {
    if(action.type === 'login') {
        return {
            logginUser: action.user
        }
    }

    if(action.type === 'logout') {
        return {
            logginUser: null
        }
    }

    return state;
}

const store = redux.createStore(authReducer);

export default store;