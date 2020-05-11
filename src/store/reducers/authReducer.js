import * as actionTypes from '../actions/actionTypes';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    redirectPath: '/'
};

const reducer = (state = initialState, action) => {

    switch(action.type) {

        case actionTypes.AUTH_START :
            return {
                ...state,
                error: null,
                loading: true
            }
        
        case actionTypes.AUTH_SUCCESS :
            return {
                ...state,
                token: action.token,
                userId: action.userId,
                error: null,
                loading: false
            }

        case actionTypes.AUTH_FAIL :
            return {
                ...state,
                token: null,
                userId: null,
                error: action.error,
                loading: false
            }

        case actionTypes.AUTH_LOGOUT :
            return {
                ...state,
                token: null,
                userId: null
            }

        case actionTypes.AUTH_REDIRECT_PATH :
            return {
                ...state,
                redirectPath: action.path
            }

        default: return state

    }

};

export default reducer;