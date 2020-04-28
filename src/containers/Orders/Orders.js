import React, {Component} from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';

class Orders extends Component {


    componentDidMount() {
        this.props.onFetchOrder()
    }

    render() {

        let orders = <Spinner />

        if(!this.props.loading) {
            orders = this.props.orders.map((order) => {
                return <Order ingredients={order.ingredients} price={order.price} key={order.id} />
            });   
        }

        if(this.props.error) {
            orders = <p style={{textAlign: "center"}}>Couldn't load orders!</p>
        }

        return (
            <div style={{padding: "50px 0"}}>
                {orders}    
            </div>
        );

    }

}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        error: state.order.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrder: () => dispatch(actions.fetchOrders())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));