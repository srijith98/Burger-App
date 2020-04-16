import React, {Component} from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENTS_PRICE = {
    cheese: 10,
    salad: 15,
    bacon: 25,
    meat: 30
}

class BurgerBuilder extends Component {

    state = {
        ingredients : null,
        totalPrice : 20,
        purchasable: false,
        purchaseMode: false,
        showSpinner: false,
        error: false
    };

    componentDidMount() {
        axios.get('ingredients.json')
            .then(response => {
                this.setState({ingredients: response.data})
            })
            .catch(() => {
                this.setState({error: true})
            })
    }

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
        
      
        const query = [];
        for(let i in this.state.ingredients) {
            query.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        query.push('price=' + this.state.totalPrice);
        const queryString = query.join('&');

        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
    }

    render() {
        // console.log(this.state);
        const disabledInfo = {...this.state.ingredients};
        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;
        

    let burger = (<div style={{paddingTop: "50px"}}>{this.state.error? <p style={{textAlign: "center"}}>Couldn't load burger!</p> :<Spinner />}</div>);
        if(this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls addIngredient={this.addIngredientHandler} removeIngredient={this.removeIngredientHandler} disabled={disabledInfo} price={this.state.totalPrice} purchasable={this.state.purchasable} order={this.purchaseHandler} />
                </Aux>
            );
            orderSummary = <OrderSummary ingredients={this.state.ingredients} totalPrice={this.state.totalPrice} cancelPurchase={this.notPurchasedHandler} continuePurchase={this.continuePurchaseHandler} />
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

export default withErrorHandler(BurgerBuilder, axios);