import React from 'react';
import classes from './Order.module.css';

const order = (props) => {

    const ingredients = []
    for(let key in props.ingredients) {
        ingredients.push(`${key.charAt(0).toUpperCase() + key.slice(1)}(${props.ingredients[key]})`)
    }
    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredients.join(' ')}</p>
        <p>Price: <strong>Rs. {props.price}</strong></p>
        </div>
    );

}

export default order;