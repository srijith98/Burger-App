import React from 'react';
import classes from './Button.module.css';

const button = props => (
    <button type={props.type} onClick={props.clicked} className={[classes.Button, classes[props.btnType]].join(' ')} disabled={props.disabled}>{props.children}</button>
);

export default button;