import * as actionTypes from '../actions/actionTypes';

const initialState = {
    loading: false,
    orders: [],
    purchased: false,
    error: false
}

const reducer = (state = initialState, action) => {

    switch (action.type) {

        case actionTypes.PURCHASE_INIT :
            return {
                ...state,
                purchased: false
            }

        case actionTypes.BURGER_PURCHASE_START :
            return {
                ...state,
                loading: true
            }
        
        case actionTypes.BURGER_PURCHASE_SUCCESS :
            const newOrder = {
                ...action.orderData,
                id: action.orderId
            }
            return {
                ...state,
                loading: false,
                orders: state.orders.concat(newOrder),
                purchased: true
            };

        case actionTypes.BURGER_PURCHASE_FAILED :
            return {
                ...state,
                loading: false
            };

        case actionTypes.FETCH_ORDERS_START :
            return {
                ...state,
                loading: true
            }

        case actionTypes.FETCH_ORDERS_SUCCESS :
            return {
                ...state,
                orders: action.orders,
                loading: false,
                error: false
            }

        case actionTypes.FETCH_ORDERS_FAILED:
            return {
                ...state,
                error: true
            }

        default : return state;

    }

}

export default reducer;