import * as actionTypes from '../actions/actionTypes';

const initialState = {
    ingredients : null,
    totalPrice : 20,
    purchasable: false,
    error: false,
    building: false
}

const INGREDIENTS_PRICE = {
    cheese: 10,
    salad: 15,
    bacon: 25,
    meat: 30
}

const reducer = (state = initialState, action) => {

    switch(action.type) {

        case actionTypes.SET_INGREDIENTS :
            return {
                ...state,
                ingredients: {
                    salad: action.ingredients.salad,
                    bacon: action.ingredients.bacon,
                    cheese: action.ingredients.cheese,
                    meat: action.ingredients.meat
                },
                totalPrice: 20,
                error: false,
                purchasable: false,
                building: false
            }

        case actionTypes.FETCH_INGREDIENTS_FAILED :
            return {
                ...state,
                error: true
            }

        case actionTypes.ADD_INGREDIENT :
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENTS_PRICE[action.ingredientName],
                purchasable: (state.totalPrice + INGREDIENTS_PRICE[action.ingredientName])>20,
                building: true
            }

        case actionTypes.REMOVE_INGREDIENT :
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENTS_PRICE[action.ingredientName],
                purchasable: (state.totalPrice + INGREDIENTS_PRICE[action.ingredientName])>20,
                building: true
            }

        default : return state

    }

}

export default reducer;