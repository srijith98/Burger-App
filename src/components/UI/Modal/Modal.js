import React, { Component } from 'react';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import classes from './Modal.module.css';
import BackDrop from '../BackDrop/BackDrop';

class Modal extends Component {

    componentDidUpdate() {
        console.log('[Modal] componentDidUpdate')
    }


    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !== this.props.show;
    }

    render() {
        return (
            <Aux>
                <BackDrop show={this.props.show} clicked={this.props.notPurchased} />
                <div className={classes.Modal} 
                style={{
                    transform: this.props.show? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: this.props.show? '1': '0'
                }}>
                    {this.props.children}
                </div>
            </Aux>
        );
    }
} 
 

export default Modal;