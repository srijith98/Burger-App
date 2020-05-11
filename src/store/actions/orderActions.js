import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

const burgerPurchaseSuccess = (id, data) => {
    return {
        type: actionTypes.BURGER_PURCHASE_SUCCESS,
        orderId: id,
        orderData: data
    }
}

const burgerPurchaseFailed = (error) => {
    return {
        type: actionTypes.BURGER_PURCHASE_FAILED,
        error: error
    }
}

const startPurchaseBurger = () => {
    return {
        type: actionTypes.BURGER_PURCHASE_START
    }
}

export const purchaseBurger = (orderData, token) => {
    return dispatch => {
        dispatch(startPurchaseBurger())
        axios.post('orders.json?auth=' + token, orderData)
            .then(response => {
                dispatch(burgerPurchaseSuccess(response.data.name, orderData))
                console.log(response.data)
            })
            .catch(err => {
                dispatch(burgerPurchaseFailed(err))
            });
    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
};

const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
};

const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
};

const fetchOrdersFailed = () => {
    return {
        type: actionTypes.FETCH_ORDERS_FAILED
    }
};

export const fetchOrders = (token, userId) => {
    return dispatch => {
        dispatch(fetchOrdersStart())
        const queryParameters = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`
        axios.get('orders.json' + queryParameters)
            .then(res => {
                const ordersFetched = [];
                for(let key in res.data) {
                    ordersFetched.push({...res.data[key], id: key})
                }
                dispatch(fetchOrdersSuccess(ordersFetched))
            })
            .catch(() => {
                dispatch(fetchOrdersFailed())
            })
    }
};