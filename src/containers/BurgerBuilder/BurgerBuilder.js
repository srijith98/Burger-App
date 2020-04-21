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
import * as actionTypes from '../../store/actions'; 



class BurgerBuilder extends Component {

    state = {
        purchaseMode: false,
        showSpinner: false,
        error: false
    };

    componentDidMount() {
        // axios.get('ingredients.json')
        //     .then(response => {
        //         this.setState({ingredients: response.data})
        //     })
        //     .catch(() => {
        //         this.setState({error: true})
        //     })
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
        
      
        const query = [];
        for(let i in this.state.ingredients) {
            query.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ingredients[i]));
        }
        query.push('price=' + this.props.totalPrice);
        const queryString = query.join('&');

        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
    }

    render() {
        // console.log(this.state);
        const disabledInfo = {...this.props.ingredients};
        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;
        

    let burger = (<div style={{paddingTop: "50px"}}>{this.state.error? <p style={{textAlign: "center"}}>Couldn't load burger!</p> :<Spinner />}</div>);
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
        ingredients: state.ingredients,
        totalPrice: state.totalPrice,
        canOrder: state.purchasable
    }
};

const mapDispatchToProps = dispatch => {
    return {
        addIngredientHandler: (ingredient) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingredient}),
        removeIngredientHandler: (ingredient) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingredient})
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));