import React from 'react';
import { CURRENCY } from '../config/config_paypal';

const ProductListTable = (props) => {

    let count = 1;
    let totalPrice = 0;
    const productList = [...props.productList];
    const item = productList.length <= 1 ? "item" : "items";

    const removeProductFromListFn = (article) => {
        props.removeProductFromList(article);
    };

    const createOrderFn = (totalPrice) => {
        props.createOrder(totalPrice.toFixed(2));
    };

    const productItem = productList.map(product => {
        totalPrice += product.price  * (product.unit === "gram" ? product.quantity/100 : product.quantity);
        return <tr key={product.article}>
            <td>{count++}</td>
            <td>{product.article}</td>
            <td>{product.name}</td>
            <td>{CURRENCY + ' ' + product.price}</td>
            <td>{product.quantity + ' ' + product.unit}</td>
            <td>{CURRENCY + ' ' + (product.price * (product.unit === "gram" ? product.quantity / 100 : product.quantity)).toFixed(2)}</td>
            <td>
                <button className="button__remove" type="button" onClick={() => removeProductFromListFn(product.article)}>
                    <i className="far fa-trash-alt"/>
                </button>
            </td>
         </tr>
    });

    return <React.Fragment>
            <table>
                <thead >
                <tr>
                    <th>#</th>
                    <th>Product Article</th>
                    <th>Product Name</th>
                    <th>Product Price</th>
                    <th>Product Quantity </th>
                    <th>Product Total</th>
                    <th>Product Remove</th>
                </tr>
                </thead>
                <tbody>
                {productItem}
                </tbody>
            </table>
            <div className="table__footer">
                <span className="table__total table__total-subtext">Subtotal ({item} {productList.length}):</span>
            <span className="table__total table__total-unit">{CURRENCY}</span>
                <span className="table__total table__total-price">{totalPrice.toFixed(2)}</span>
            </div>
            <div className="button__group-table">
                <button className="button__submit" disabled={productList.length === 0}  onClick={() => createOrderFn(totalPrice)}>Create order</button>
            </div>
    </React.Fragment>
}
export default ProductListTable;