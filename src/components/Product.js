import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import ProductForm from './ProductForm';
import Preloader from './Preloader';

const Product = (props) => {

    const products = useSelector(state => state.products);
    const [isLoader, setIsLoader] = useState(false);

    const addProduct = (product) => {
        const ind = products.findIndex(p => +p.article === +product.article);//проверяем совпадение
        if(ind >= 0) {
            return false;
        }
        setIsLoader(true);
        props.productsService.addProduct(product)
            .then(()=>{
                setIsLoader(false);
                props.changeFlagFn(0);
            })
            .catch (error => {
                setIsLoader(false);
                alert(JSON.stringify(error))
            });
        return  true;
    };

    return <React.Fragment>
        <ProductForm fnAddProduct={addProduct} changeFlagFn={props.changeFlagFn} />
        {isLoader ? <Preloader/> : ''}
    </React.Fragment>
};

export default Product;