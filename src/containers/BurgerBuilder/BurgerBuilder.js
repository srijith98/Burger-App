import React, {Component} from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index'; 



class BurgerBuilder extends Component {

    state = {
        purchaseMode: false,
        showSpinner: false
    };

    componentDidMount() {
        this.props.setIngredientHandler();
    }

    updatePurchasable = (totalPrice) => {
        
        this.setState({purchasable: totalPrice>20});
    }

    purchaseHandler = () => {
        this.setState({purchaseMode: true});
    }

    notPurchasedHandler = () => {
        this.setState({purchaseMode: false});
    }

    continuePurchaseHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }

    render() {
        // console.log(this.state);
        const disabledInfo = {...this.props.ingredients};
        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;
        

        let burger = (<div style={{paddingTop: "50px"}}>{this.props.error? <p style={{textAlign: "center"}}>Couldn't load burger!</p> :<Spinner />}</div>);
        if(this.props.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ingredients} />
                    <BuildControls addIngredient={this.props.addIngredientHandler} removeIngredient={this.props.removeIngredientHandler} disabled={disabledInfo} price={this.props.totalPrice} purchasable={this.props.canOrder} order={this.purchaseHandler} />
                </Aux>
            );
            orderSummary = <OrderSummary ingredients={this.props.ingredients} totalPrice={this.props.totalPrice} cancelPurchase={this.notPurchasedHandler} continuePurchase={this.continuePurchaseHandler} />
        }

        if(this.state.showSpinner) {
            orderSummary = <Spinner />
        }

        return(
            <Aux>
                <Modal show={this.state.purchaseMode} closeModal={this.notPurchasedHandler}>
                   {orderSummary} 
                </Modal>
                {burger}
            </Aux>
        );
    }

}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        canOrder: state.burgerBuilder.purchasable,
        error: state.burgerBuilder.error
    }
};

const mapDispatchToProps = dispatch => {
    return {
        addIngredientHandler: (ingredient) => dispatch(actions.addIngredient(ingredient)),
        removeIngredientHandler: (ingredient) => dispatch(actions.removeIngredient(ingredient)),
        setIngredientHandler: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));