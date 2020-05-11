import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';
import BackDrop from '../../UI/BackDrop/BackDrop';
import Aux from '../../../hoc/Auxiliary/Auxiliary'

const SideDrawer = (props) => {

        
        let assignedClasses = [classes.SideDrawer, classes.Open];

        if(!props.open) {
            assignedClasses = [classes.SideDrawer, classes.Close];
        }

        return (
            <Aux>
                <BackDrop show={props.open} clicked={props.closeClicked} />
                <div className={assignedClasses.join(' ')}>
                    <div className={classes.Logo}>
                        <Logo />
                    </div>
                    <nav>
                        <NavigationItems isAuthenticated={props.isAuth} />
                    </nav>
                </div>
            </Aux>
        );
}

export default SideDrawer;