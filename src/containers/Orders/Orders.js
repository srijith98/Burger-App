import React, {Component} from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner'; 

class Orders extends Component {

    state =  {
        orders: null,
        error: false
    };

    componentDidMount() {
        axios.get('orders.json')
            .then(res => {
                const ordersFetched = [];
                for(let key in res.data) {
                    ordersFetched.push({...res.data[key], id: key})
                }
                this.setState({orders: ordersFetched})
                console.log(this.state.orders)
            })
            .catch(() => {
                this.setState({error: true})
            })
    }

    render() {

        let orders = <div style={{paddingTop: "50px"}}>{this.state.error? <p style={{textAlign: "center"}}>Couldn't load orders!</p> :<Spinner />}</div>;

        if(this.state.orders) {
            orders = this.state.orders.map((order) => {
                return <Order ingredients={order.ingredients} price={order.price} key={order.id} />
            });   
        }

        return (
            <div>
                {orders}    
            </div>
        );

    }

}

export default withErrorHandler(Orders, axios);