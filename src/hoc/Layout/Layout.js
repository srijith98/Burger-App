import React, {Component} from 'react';
import Aux from '../Auxiliary/Auxiliary';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import {connect} from 'react-redux';


class Layout extends Component {
    
    state={
        showSideDrawer: false
    };

    closeSideDrawerHandler = () => {
        this.setState({showSideDrawer: false});
    }

    toggleSideDrawerHandler = () => {
        this.setState((prevState) => ({showSideDrawer: !prevState.showSideDrawer}));
    }


    render() {
        return (
            <Aux>
                <Toolbar clickedMenu={this.toggleSideDrawerHandler} isAuth={this.props.isAuthenticated}/>
                <SideDrawer open={this.state.showSideDrawer} closeClicked={this.closeSideDrawerHandler} isAuth={this.props.isAuthenticated} />
                <main className = {classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);