import * as actionTypes from './actions';

const initialState = {
    ingredients : {
        cheese: 0,
        salad: 0,
        bacon: 0,
        meat: 0
    },
    totalPrice : 20,
    purchasable: false
}

const INGREDIENTS_PRICE = {
    cheese: 10,
    salad: 15,
    bacon: 25,
    meat: 30
}

const reducer = (state = initialState, action) => {

    switch(action.type) {

        case actionTypes.ADD_INGREDIENT :
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENTS_PRICE[action.ingredientName],
                purchasable: (state.totalPrice + INGREDIENTS_PRICE[action.ingredientName])>20
            }

        case actionTypes.REMOVE_INGREDIENT :
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENTS_PRICE[action.ingredientName],
                purchasable: (state.totalPrice + INGREDIENTS_PRICE[action.ingredientName])>20
            }

        default : return state

    }

}

export default reducer;