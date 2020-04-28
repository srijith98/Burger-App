import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route, Redirect } from 'react-router-dom';
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

        let summary = <Redirect to="/" />

        if(this.props.ingredients) {
            const redirectOnPurchase = this.props.purchased ? <Redirect to="/" /> : null;
            summary = (
                <div>
                    {redirectOnPurchase}
                    <CheckoutSummary ingredients={this.props.ingredients} cancelCheckout={this.cancelCheckout} continueCheckout={this.continueCheckout} totalPrice={this.props.totalPrice} />
                    <Route path={this.props.match.path + '/contact-details'} component={ContactDetails} />
                </div>
            )
        }
        
        return summary;
    }

}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        purchased: state.order.purchased
    }
}

export default connect(mapStateToProps)(Checkout);