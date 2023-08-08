const initialState = {
    loggedUser: null,
    authError: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                loggedUser: action.user,
                authError: null
            };
        case 'LOGOUT':
            return {
                ...state,
                loggedUser: null,
            };
        case 'AUTH_FAILURE':
            return {
                ...state,
                authError: action.errorMessage,
            };
        default:
            return state;
    }
};

export default authReducer;






