import React, {useEffect, useState} from 'react';
import {getRandomNumber} from '../utility/random';
import ProductListTable from './ProductListTable';
import {DIGITS_ID} from '../config/config_order';
import {NavLink} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { PATH_ORDERS } from '../config/config_header';
import $ from 'jquery';
import _ from 'lodash';

const ProductList = (props) => {

    const user = useSelector(state => state.userData);
    // const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date();
    const productList = [...props.productList];
    let [orderID, setOrderID] = useState(0);
    const list = [];

    useEffect(() => {
        if (!user.uid) {
            props.actionUpdateProductList(list)
        }
    },[user.uid])

    const createOrder = (totalPrice) => {
        const number = getRandomNumber(10 ** (DIGITS_ID - 1), 10 ** DIGITS_ID);
        setOrderID(number);
        let order = { orderID: number, userID: user.uid, username: user.displayName, email: user.email, products: productList, date: date.toLocaleDateString("en-US"), totalPrice: Number(totalPrice), isPaid: false};
        props.addOrder(order);
        props.actionUpdateProductList(list);
        showDetails();
    }

    const updateReserveProduct = (product) => {
        product.reserve += product.quantity;
        props.productsService.updateReserve(product)
            .then(()=>{})
            .catch (error => {alert(JSON.stringify(error))});
    }

    const removeProductFromList = (article) => {
        if (window.confirm(`You are going to delete product with article number ${article}?`)) {
            productList.map(p => {
                return p.article === article ? updateReserveProduct(p) : '';
            })
            _.remove(productList, product => product.article === article);
            props.actionUpdateProductList([...productList]);
        }
    }

    const showDetails = () => {
        $(".mod").addClass("show");
        $("body").addClass("no-scroll");

        setTimeout(function() {
            $(".mod__dialog")
                .css({
                    transform: "rotateX(0)"
                });}, 300);
    }

    const hideDetail = () => {
        console.log('hide')
        $(".mod__dialog").css({
            transform: "rotateX(90deg)"
        });

        setTimeout(function() {
            $(".mod").removeClass("show");
            $("body").removeClass("no-scroll");}, 400);
    }

    return <React.Fragment>
        <ProductListTable productList={productList} removeProductFromList={removeProductFromList} createOrder={createOrder}/>
        <div className="mod" onClick={() => hideDetail()}>
            <div className="mod__dialog"  >
                <div className="mod__content">
                    <h2 className="mod__content-title">Order #{orderID}
                        <br/>was created successfully!!!
                        <br />To payment for the order click <NavLink className="mod__content-link" to={PATH_ORDERS}>{user.isAdmin ? "Orders" : "My Orders"}</NavLink>!
                    </h2>
                </div>
            </div>
        </div>
    </React.Fragment>

}
export default ProductList;