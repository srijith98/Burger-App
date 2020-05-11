import * as actionTypes from './actionTypes';
import axios from 'axios';

const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
};

const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token,
        userId
    }
};

export const authLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('expiryDate')
    return {
        type: actionTypes.AUTH_LOGOUT
    }
};

const checkAuthExpiry = (expiringTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(authLogout())
        }, expiringTime * 1000)
    }
}

const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error
    }
};

export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart())
        const authData = {
            email,
            password,
            returnSecureToken: true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBGRsTJ4_KIWBFMCUQrmTkwcBbYzPd2QtI'
        if(!isSignUp) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBGRsTJ4_KIWBFMCUQrmTkwcBbYzPd2QtI'
        }
        axios.post(url, authData)
            .then(response => {
                // console.log(response)
                const expiryDate = new Date(new Date().getTime() + response.data.expiresIn * 1000)
                localStorage.setItem('token', response.data.idToken)
                localStorage.setItem('userId', response.data.localId)
                localStorage.setItem('expiryDate', expiryDate)
                dispatch(authSuccess(response.data.idToken, response.data.localId))
                dispatch(checkAuthExpiry(response.data.expiresIn))
            })
            .catch(err => {
                console.log(err.response.data.error.message)
                dispatch(authFail(err.response.data.error.message))
            })
    }
};

export const authRedirectPath = (path) => {
    return {
        type: actionTypes.AUTH_REDIRECT_PATH,
        path
    }
};

export const checkAuthState = () => {
    return dispatch => {
        const token = localStorage.getItem('token')
        if(!token) {
            dispatch(authLogout())
        } else {
            const expiryDate = new Date(localStorage.getItem('expiryDate'))
            if(expiryDate < new Date()) {
                dispatch(authLogout())
            } else {
                const userId = localStorage.getItem('userId')
                dispatch(authSuccess(token, userId))
                const expirySeconds = (expiryDate.getTime() - new Date().getTime())/1000
                dispatch(checkAuthExpiry(expirySeconds))
            }
        }
    }
}