const initialState = {
    shoppingListItems: []
}

const shoppingListReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_SHOPPING_LIST':
            return {
                shoppingListItems: action.listItems
            }
        case 'CLEAR_SHOPPING_LIST':
            return {
                shoppingListItems: []
            }
        default: 
            return state
    }
}

export default shoppingListReducer;