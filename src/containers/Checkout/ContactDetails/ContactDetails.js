import React, {Component} from 'react';
import classes from './ContactDetails.module.css';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import {connect} from 'react-redux';
import * as orderActions from '../../../store/actions/index';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';

class ContactDetails extends Component {

    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: "text",
                    name: "name",
                    placeholder: "Your Name"
                },
                value: '',
                label: 'Name',
                valid: false,
                rules: {
                    required: true
                },
                touched: false
            },
            phone: {
                elementType: 'input',
                elementConfig: {
                    type: "text",
                    name: "phone",
                    placeholder: "Your Contact number"
                },
                value: '',
                label: 'Phone',
                valid: false,
                rules: {
                    required: true,
                    minLength: 10,
                    maxLength: 10
                },
                touched: false
            },
            address: {
                elementType: 'textarea',
                elementConfig: {
                    type: "text",
                    name: "name",
                    placeholder: "Your Address"
                },
                value: '',
                label: 'Address',
                valid: false,
                rules: {
                    required: true
                },
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'superfast', displayValue: 'Superfast'},
                        {value: 'fast', displayValue: 'Fast'},
                        {value: 'cheapest', displayValue: 'Cheapest'}]
                },
                value: 'superfast',
                label: 'Delivery method',
                valid: true,
                rules: {}
            },
            paymentMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'cod', displayValue: 'Cash on Delivery'},
                        {value: 'upi', displayValue: 'UPI'},
                        {value: 'creditcard', displayValue: 'Credit card'},
                        {value: 'debitcard', displayValue: 'Debit card'}
                    ]
                },
                value: 'cod',
                label: 'Payment method',
                valid: true,
                rules: {}
            }
        },
        formValid: false
    }

    orderHandler = (e) => {
        e.preventDefault();
        const orderDataForm = {};
        for(let orderIdentifier in this.state.orderForm) {
            orderDataForm[orderIdentifier] = this.state.orderForm[orderIdentifier].value;
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            orderData: orderDataForm
        };
        // console.log(order);
        this.props.placeOrder(order);
    }

    checkValidity(inputValue, rules) {
        let isValid = true;

        if(rules.required) {
            isValid = inputValue.trim() !== '' && isValid;
        }

        if(rules.minLength) {
            isValid = inputValue.length >= rules.minLength && isValid;
        }

        if(rules.maxLength) {
            isValid = inputValue.length <= rules.maxLength && isValid;
        }

        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        // console.log(event.target.value);
        const updatedForm = {...this.state.orderForm};
        const updatedFormElement = {...updatedForm[inputIdentifier]};
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.rules);
        updatedFormElement.touched = true;
        // console.log(updatedFormElement);
        updatedForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for(let inputIdentifier in updatedForm) {
            formIsValid = updatedForm[inputIdentifier].valid && formIsValid;
        }

        this.setState({orderForm: updatedForm, formValid: formIsValid});
    }

    render() {

        const orderFormArray = [];
        for(let key in this.state.orderForm) {
            orderFormArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }

        let form = (
            <form onSubmit={this.orderHandler}>
                <h2>Please enter your details.</h2>
                {orderFormArray.map(element => {
                    return (<Input key={element.id} elementType={element.config.elementType} label={element.config.label} elementConfig={element.config.elementConfig} value={element.config.value} changed={(event) => this.inputChangedHandler(event, element.id)} invalid={!element.config.valid} shouldValidate={element.config.rules} touched={element.config.touched} />)
                })}
                <Button btnType="Success" disabled={!this.state.formValid} clicked={this.orderHandler}>ORDER</Button>
            </form>
        );

        if(this.props.showSpinner) {
            form = <Spinner />
        }

        return(
            <div className={classes.ContactDetails}>
                {form}
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        showSpinner: state.order.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        placeOrder: (orderData) => dispatch(orderActions.purchaseBurger(orderData))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactDetails, axios));