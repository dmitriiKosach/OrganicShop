import React, {useEffect, useState} from 'react';
import buttonClose from '../images/button-close.svg';
import {useSelector} from 'react-redux';
import { CURRENCY } from '../config/config_paypal';

const ProductSketch = (props) => {

    const userData = useSelector(state => state.userData);
    const product = {...props.product};
    const [count, setCount] = useState(0);
    const [isInvalid, setIsInvalid] = useState(true);
    const addStep = () => {

        if (userData.email) {
            let countUp = product.unit === "gram" ? count + 100 : count + 1;
            setCount(countUp);
        }else{
            alert("Attention! Log in to your account or register in the application");
        }
    };

    const deleteStep = () => {
        let countDown = product.unit === "gram" ? count - 100 : count - 1;
        setCount(countDown);
    };

    const updateReserveProduct = (p) => {
        product.unit === "gram" ? (product.reserve -= p.quantity / 1000).toFixed(2) : product.reserve -= p.quantity;
        props.productsService.updateReserve(product)
            .then(()=>{})
            .catch (error => {alert(JSON.stringify(error))});
    };

    const productHandler = () => {
        product.quantity = count;
        updateReserveProduct(product);

        addProductToList(product);
        setCount(0);
    };

    const addProductToList = (product) => {
        const ind = props.productList.findIndex(p => p.article === product.article);
        const list = [...props.productList];
        if(ind >= 0) {
            list.map(p => {
                if(p.article === product.article){
                    p.quantity += product.quantity;
                }
                return {...p, quantity: p.quantity}
            })
            props.actionUpdateProductList([...list]);
        }else{
            list.push(product);
            props.actionUpdateProductList([...list]);
        }
    };

    const removeProductFn = (product) => {
        props.removeProduct(product)
    };

    useEffect(() => {
        const isValidate = () =>{
            return count === 0;
        };
        setIsInvalid(isValidate());
    },[count, product]);

    return <React.Fragment>
        <div className="sketch__item">
            <div className="sketch__wrapper">
                {userData.isAdmin
                    ? props.removeProduct ? <button onClick={() => removeProductFn(product)} className="button__remove-product" type="button">
                        <img src={buttonClose} alt="close" />
                    </button> : null : null}
                <img className="sketch__photo" src={product.photoURL} alt="" />
                <div className="sketch__content">
                    <div className="sketch__content-info">
                        <span className="info__title">{product.name}</span>
                        <span className="info__subtitle">{product.description}</span>
                    </div>
                    <div className="sketch__content-property">
                        <div className="property__reserve">
                            <span>Available: {Number.parseInt(product.reserve).toFixed(2)} {product.unit === "gram" ? "kg" : product.unit }</span>
                        </div>
                        <div className="property__price">
                            <div className="price__info">
                                <span className="price__unit">{CURRENCY}</span>
                                <div className="price">{product.price}</div>
                            </div>
                            <div className="price__subtitle">price per {product.unit === "gram" ? '100 ' + product.unit : product.unit}</div>
                        </div>
                    </div>
                    <div className="sketch__content-buttons">
                        <div className="button__quantity">
                            <button className="button__count" disabled={isInvalid} onClick={deleteStep} type="button">-</button>
                            <input type="number" value={count} readOnly/>
                            <button className="button__count" disabled={product.unit === "gram" ? count / 1000 >= product.reserve : count >= product.reserve}  onClick={addStep} type="button">+</button>
                        </div>
                        <button className="button__add-product" disabled={isInvalid} onClick={productHandler}>
                            <i className="fas fa-cart-plus"/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </React.Fragment>
}

export default ProductSketch;

