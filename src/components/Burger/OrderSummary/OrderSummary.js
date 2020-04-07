import React from 'react';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button'

const orderSummary = props => {

    const ingredientsSummary = Object.keys(props.ingredients).map((ingredient) => {
    return <li key={ingredient}><span style={{textTransform: "capitalize"}}>{ingredient}</span>: {props.ingredients[ingredient]}</li>
    });

    return (
        <Aux>
            <h3>Your Order:</h3>
            <p>A delicious burger with the following ingredients.</p>
            <ul>
                {ingredientsSummary}
            </ul>
            <p>Total Price: Rs.{props.totalPrice}</p>
            <p>Checkout?</p>
            <Button btnType="Danger" clicked={props.cancelPurchase}>CANCEL</Button>
            <Button btnType="Success" clicked={props.continuePurchase}>CONTINUE</Button>
        </Aux>
    );
}

export default orderSummary;