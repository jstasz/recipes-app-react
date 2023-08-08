const initialState = {
    loadedRecipes: [],
    userRecipes: [],
    isLoadingRecipes: false
};

const recipesReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'RECIPES_LOADING':
            return {
                ...state,
                isLoadingRecipes: true
            };
        case 'RECIPES_LOADED':
            return {
                ...state,
                isLoadingRecipes: false
            };
        case 'SET_LOADED_RECIPES':
            return {
                ...state,
                loadedRecipes: action.recipes,
            };
        case 'SET_USER_RECIPES':
            return {
                ...state,
                userRecipes: action.recipes,
            };
        case 'CLEAR_USER_RECIPES':
            return {
                ...state,
                userRecipes: [],
            };
        default:
            return state;
    }
};

export default recipesReducer;