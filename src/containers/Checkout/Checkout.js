import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactDetails from './ContactDetails/ContactDetails';
import {connect} from 'react-redux';

class Checkout extends Component {

    cancelCheckout = () => {
        this.props.history.goBack();
    }

    continueCheckout = () => {
        this.props.history.replace('/checkout/contact-details');
    }

    render() {
        
        return(
            <div>
                <CheckoutSummary ingredients={this.props.ingredients} cancelCheckout={this.cancelCheckout} continueCheckout={this.continueCheckout} totalPrice={this.props.totalPrice} />
                <Route path={this.props.match.path + '/contact-details'} component={ContactDetails} />
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice
    }
}

export default connect(mapStateToProps)(Checkout);