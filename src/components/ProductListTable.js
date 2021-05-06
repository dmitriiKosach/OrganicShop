import React from "react";
import { CURRENCY } from "../config/config_products";

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
                <button className="button-remove" type="button" onClick={() => removeProductFromListFn(product.article)}>
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
            <div className="table-footer">
                <span className="table-total table-total_subtext">Subtotal ({item} {productList.length}):</span>
            <span className="table-total table-total_unit">{CURRENCY}</span>
                <span className="table-total table-total_price">{totalPrice.toFixed(2)}</span>
            </div>
            <div className="button-group_table">
                <button className="button-submit" disabled={productList.length === 0}  onClick={() => createOrderFn(totalPrice)}>Create order</button>
            </div>
    </React.Fragment>
}
export default ProductListTable;