import React, {useState} from 'react';
import Details from './Details';
import $ from 'jquery';
import {useSelector} from 'react-redux';
import { CURRENCY } from '../config/config_paypal';

const OrdersTable = (props) => {

    let count = 1;
    const [order, setOrder] = useState({});
    const [orderID, setOrderID] = useState(0);
    const [products, setProducts] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const userData = useSelector(state => state.userData);

    const removeOrderFn = (orderID) => {
        props.removeOrder(orderID);
    };

    const showDetails = (order) => {
        setOrderID(order.orderID);
        setTotalPrice(order.totalPrice);
        setProducts([...order.products]);
        setOrder({...order});
        $(".mod").addClass("show");
        $("body").addClass("no-scroll");

        setTimeout(function() {
            $(".mod__dialog")
                .css({
                    transform: "rotateX(0)"
                });}, 300);
    };

    const hideDetail = () => {
        $(".mod__dialog").css({
            transform: "rotateX(90deg)"
        });

        setTimeout(function() {
            $(".mod").removeClass("show");
            $("body").removeClass("no-scroll");
        }, 400);
    };

    const orderItem = props.orders.map(order => {
        if (userData.isAdmin) {
            return <React.Fragment key={order.orderID}>
                <tr key={order.orderID}>
                    <td>{count++}</td>
                    <td>{order.date}</td>
                    <td>{order.orderID}</td>
                    <td>{order.userID}</td>
                    <td>{order.email}</td>
                    <td>{CURRENCY + ' ' + order.totalPrice}</td>
                    <td>{order.isPaid ? <i className="far fa-check-circle"/> : <i className="far fa-circle"/>}</td>
                    <td>
                        <button className="button__remove" type="button" onClick={() => removeOrderFn(order.orderID)}>
                            <i className="far fa-trash-alt"/>
                        </button>
                    </td>
                    <td>
                        <button className="button__remove" type="button" onClick={() => showDetails(order)} >
                            <i className="far fa-eye"/>
                        </button>
                    </td>
                </tr>
            </React.Fragment>
        } else {
            return userData.email === order.email
                ? <React.Fragment key={order.orderID}>
                    <tr key={order.orderID}>
                        <td>{count++}</td>
                        <td>{order.date}</td>
                        <td>{order.orderID}</td>
                        <td>{order.userID}</td>
                        <td>{order.email}</td>
                        <td>{CURRENCY + ' ' + order.totalPrice}</td>
                        <td>{order.isPaid ? <i className="far fa-check-circle"/> : <i className="far fa-circle"/>}</td>
                        {userData.isAdmin
                            ? <td>
                                <button className="button__remove" type="button" onClick={() => removeOrderFn(order.orderID)}>
                                    <i className="far fa-trash-alt"/>
                                </button>
                            </td>
                            : null}
                        <td>
                            <button className="button__remove" type="button" onClick={() => showDetails(order)}>
                                {order.isPaid ? <i className="far fa-eye"/> : <i className="fab fa-cc-paypal"/>}

                            </button>
                        </td>
                    </tr>
                </React.Fragment> : null;
        }
    });

    return <React.Fragment>
        <table>
            <thead >
            <tr>
                <th>#</th>
                <th>Date</th>
                <th>Order ID</th>
                <th>User ID</th>
                <th>Email Address</th>
                <th>Total price</th>
                <th>Payment status</th>
                {userData.isAdmin ? <th>Remove</th> : null}
                <th/>
            </tr>
            </thead>
            <tbody>
            {orderItem}
            </tbody>
        </table>
        <div className="mod" onClick={() => hideDetail()}>
            <div className="mod__dialog">
               <Details hideDetail={hideDetail} ordersService={props.ordersService} order={order} products={products} orderID={orderID}  totalPrice={totalPrice}/>
            </div>
        </div>
    </React.Fragment>
}
export default OrdersTable;