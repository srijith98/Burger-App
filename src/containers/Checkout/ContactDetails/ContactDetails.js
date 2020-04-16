import React, {Component} from 'react';
import classes from './ContactDetails.module.css';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactDetails extends Component {

    state = {
        name: '',
        phone: '',
        address: {
            place: '',
            pincode: ''
        },
        showSpinner: false
    }

    orderHandler = () => {
        this.setState({showSpinner: true})
        const order = {
            customer: {
                name: 'Srijith',
                phone: '9876543210',
                address: 'Provident Welworthcity, Bangalore'
            },
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            deliveryMethod: 'Superfast',
            paymentMethod: 'Cash on delivery'
        };
        axios.post('orders.json', order)
            .then(response => {
                this.setState({showSpinner: false})
                console.log(response)
                this.props.history.push('/')
            })
            .catch(err => {
                this.setState({showSpinner: false})
                console.log(err)
            });
    }

    render() {

        let form = (
            <form>
                <input className={classes.Input} type="text" name="name" placeholder="Your Name" />
                <input className={classes.Input} type="text" name="phone" placeholder="Your Contact number" />
                <input className={classes.Input} type="text" name="place" placeholder="Your address" />
                <input className={classes.Input} type="text" name="pincode" placeholder="Your pincode" />
            </form>
        );

        if(this.state.showSpinner) {
            form = <Spinner />
        }

        return(
            <div className={classes.ContactDetails}>
                <h3>Please enter your details.</h3>
                {form}
                <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
            </div>
        )
    }

}

export default ContactDetails;