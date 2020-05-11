import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.module.css';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact>Burger Builder</NavigationItem>
        {props.isAuthenticated? <NavigationItem link="/orders">My Orders</NavigationItem>: null}
        {!props.isAuthenticated? <NavigationItem link="/auth">Log In</NavigationItem>: <NavigationItem link="/logout">Log Out</NavigationItem>}
    </ul>
);

export default navigationItems;