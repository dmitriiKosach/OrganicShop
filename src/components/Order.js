import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import ProductListContainer from './ProductListContainer';
import Preloader from './Preloader';

const Order= (props) => {

    const orders = useSelector(state => state.orders);
    const [isLoader, setIsLoader] = useState(false);

    const addOrder = (order) => {
        const ind = orders.findIndex(temp => +temp.orderID === +order.orderID);
        if(ind >= 0) {
            return false;
        }
        setIsLoader(true);
        props.ordersService.addOrder(order)
            .then(()=>{
                setIsLoader(false);
            })
            .catch (error => {
                setIsLoader(false);
                alert(JSON.stringify(error))
            });
        return  true;
    };

    return <React.Fragment>
        <ProductListContainer addOrder={addOrder} productsService={props.productsService}/>
        {isLoader ? <Preloader/> : ''}
    </React.Fragment>
}

export default Order;