import React, {Component} from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

const INGREDIENTS_PRICE = {
    cheese: 10,
    salad: 15,
    bacon: 25,
    meat: 30
}

class BurgerBuilder extends Component {

    state = {
        ingredients : {
            cheese: 0,
            salad: 0,
            bacon: 0,
            meat: 0
        },
        totalPrice : 20,
        purchasable: false,
        purchaseMode: false
    };

    updatePurchasable = (totalPrice) => {
        
        this.setState({purchasable: totalPrice>20});
    }

    addIngredientHandler = (type) => {
        // console.log(this.state);
        const prevIngredients = {...this.state.ingredients};
        prevIngredients[type]++;
        const prevPrice = this.state.totalPrice;
        const newPrice = prevPrice + INGREDIENTS_PRICE[type];
        this.setState({totalPrice: newPrice, ingredients: prevIngredients});
        // console.log(this.state);
        this.updatePurchasable(newPrice);
    }

    
    removeIngredientHandler = (type) => {
        const prevIngredients = {...this.state.ingredients};
        if(prevIngredients[type] <= 0) {
            return;
        }
        prevIngredients[type]--;
        const prevPrice = this.state.totalPrice;
        const newPrice = prevPrice - INGREDIENTS_PRICE[type];
        this.setState({totalPrice: newPrice, ingredients: prevIngredients});
        // console.log(this.state);
        this.updatePurchasable(newPrice);
    }

    purchaseHandler = () => {
        this.setState({purchaseMode: true});
    }

    notPurchasedHandler = () => {
        this.setState({purchaseMode: false});
    }

    continuePurchaseHandler = () => {
        alert('Continue..')
    }

    render() {
        // console.log(this.state);
        const disabledInfo = {...this.state.ingredients};
        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        return(
            <Aux>
                <Modal show={this.state.purchaseMode} notPurchased={this.notPurchasedHandler}>
                    <OrderSummary ingredients={this.state.ingredients} totalPrice={this.state.totalPrice} cancelPurchase={this.notPurchasedHandler} continuePurchase={this.continuePurchaseHandler} />
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls addIngredient={this.addIngredientHandler} removeIngredient={this.removeIngredientHandler} disabled={disabledInfo} price={this.state.totalPrice} purchasable={this.state.purchasable} order={this.purchaseHandler} />
            </Aux>
        );
    }

}

export default BurgerBuilder;