import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.module.css';

const controls = [
    {label: 'Cheese', type: 'cheese'},
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Meat', type: 'meat'}
]

const buildControls = props => (
    <div className = {classes.BuildControls}>
        <p>Current price: <strong>Rs.{props.price}</strong></p>
        {controls.map((control) => {
            return <BuildControl key={control.label} label={control.label} moreClicked={() => props.addIngredient(control.type)} lessClicked={() => props.removeIngredient(control.type)} disabled={props.disabled[control.type]} />
        })}
        <button className={classes.OrderButton} disabled={!props.purchasable} onClick={props.order}>{props.isAuth? 'ORDER NOW': 'LOG IN TO ORDER'}</button>
    </div>
);

export default buildControls;