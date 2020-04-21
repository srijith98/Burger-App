import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.module.css';

const checkoutSummary = props => {
    return (
        <div className={classes.CheckoutSummary}>
            <h2>Hope your burger tastes good!</h2>
            <div style={{width: "100%", margin: "auto"}}>
                <Burger ingredients={props.ingredients} />
                <p>Total price: <strong>Rs. {props.totalPrice}</strong></p>
            </div>
            <Button  btnType="Danger" clicked={props.cancelCheckout}>CANCEL</Button>
            <Button  btnType="Success" clicked={props.continueCheckout}>CONTINUE</Button>
        </div>
    );
}

export default checkoutSummary;