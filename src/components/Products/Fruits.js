import React, {useState} from 'react';
import {useSelector} from "react-redux";
import ProductSketchContainer from "../ProductSketchContainer";
import Preloader from "../Preloader";


const Fruits = (props) => {

    const products = [];
    const [isLoader, setIsLoader] = useState(false);

    useSelector(state => state.products).map(product => {
        return product.category === "Fruits" ? products.push(product) : '';
    });

    const removeProduct = (product) => {
        if (window.confirm(`You are going to delete product "${product.name}" article #${product.article}`)) {
            setIsLoader(true);
            props.productsService.removeProduct(product.article)
                .then(()=>{
                    setIsLoader(false);
                })
                .catch(error => {
                    setIsLoader(false);
                    alert(JSON.stringify(error))
                });
        }
    };

    const productItem = products.map(product => {
        return <ProductSketchContainer key={product.article} product={product} removeProduct={removeProduct} productsService={props.productsService}/>
    })

    return <React.Fragment>
        <div className="content">
            <div className="container">
                <div className="content__header">
                    <span className="content__header-title">- Fruits -</span>
                </div>
                <div className="content__body">
                    {productItem}
                </div>
                {isLoader ? <Preloader/> : ''}
            </div>
        </div>
    </React.Fragment>
}

export default Fruits;