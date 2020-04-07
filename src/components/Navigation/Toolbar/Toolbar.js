import React from 'react';
import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import ToggleSideDrawer from '../SideDrawer/ToggleSideDrawer/ToggleSideDrawer'

const toolbar = props => (
    <header className={classes.Toolbar}>
        <ToggleSideDrawer clicked={props.clickedMenu} />
        <Logo />
        <nav className={classes.DesktopOnly}>
            <NavigationItems />
        </nav>
    </header>
);

export default toolbar;