import React from 'react';
import PayPalCheckoutButton from './PayPalCheckoutButton';
import { CURRENCY } from '../config/config_paypal';

const Details = (props) => {

    let count = 1;
    const item = props.products.length <= 1 ? "item" : "items";

    const productItem = props.products.map(product => {
        return <tr key={product.article}>
            <td>{count++}</td>
            <td>{product.article}</td>
            <td>{product.name}</td>
            <td>{CURRENCY + ' ' + product.price}</td>
            <td>{product.quantity + ' ' + product.unit}</td>
            <td>{CURRENCY + ' ' + (product.price * ((product.unit === "gram" ? product.quantity / 100 : product.quantity))).toFixed(2)}</td>
        </tr>
    });

    const updateOrder = (order) => {
        props.ordersService.updateOrder(order);
    };

    return <React.Fragment>
        <div className="mod__content">
            <table>
                <thead >
                <tr>
                    <th>#</th>
                    <th>Product Article</th>
                    <th>Product Name</th>
                    <th>Product Price</th>
                    <th>Product Quantity </th>
                    <th>Product Total</th>
                </tr>
                </thead>
                <tbody>
                {productItem}
                </tbody>
            </table>
            <div className="table__footer">
                <div>
                    <span className="table__total table__total-subtext">Subtotal ({item} {props.products.length}):</span>
                    <span className="table__total table__total-unit">{CURRENCY}</span>
                    <span className="table__total table__total-price">{props.totalPrice}</span>
                </div>
            </div>
            <div>
                { props.order.isPaid
                        ? ''
                        : <PayPalCheckoutButton  hideDetail={props.hideDetail} updateOrder={updateOrder} order={props.order} products={props.products} orderID={props.orderID} total={props.totalPrice}/>}
            </div>
        </div>
    </React.Fragment>

}
export default Details;
