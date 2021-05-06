import React, {useEffect, useState} from 'react';
import {getInputElementSmall} from '../utility/input_element';
import {useSelector} from 'react-redux';
import _ from 'lodash';
import ProductSketchContainer from './ProductSketchContainer';
import $ from 'jquery';


const Search = (props) => {

    let formRef = null;
    const [name, setName] = useState('');
    const [article, setArticle] = useState(0);
    const [priceMIN, setPriceMIN] = useState(0);
    const [priceMAX, setPriceMAX] = useState(0);
    const [category, setCategory] = useState('');
    const [isInvalid, setIsInvalid] = useState(true);
    const products = useSelector(state => state.products);
    const productsFilter = [...props.productsFilter];

    const handleChange = (event) => {
        event.preventDefault();
        const value = event.target.value;
        const name = event.target.name;

        switch (name){
            case 'priceMIN':
                setPriceMIN(value);
                break;
            case 'priceMAX':
                setPriceMAX(value);
                break;
            case 'article':
                setArticle(value);
                break;
            case 'name':
                setName(value);
                break;
            case 'category':
                setCategory(value);
                break;
            default:
                break;
        }
    }

    const resetFilter = () => {
        props.updateProductFilter([])
    }

    const onSubmit = (event) => {
        event.preventDefault();

        if(name !== ''){
            props.updateProductFilter(_.filter(products, product => {
                let isContains = product.name.toLowerCase().includes(name.toLowerCase())
                return isContains === true  ? product : ''}))
        }
        else if(category !== ''){
            props.updateProductFilter(_.filter(products, product => {
                let isContains = product.category.toLowerCase().includes(category.toLowerCase())
                return isContains === true  ? product : ''}))
        }
        else if(article !== 0){
            props.updateProductFilter(_.filter(products, product => {
                return product.article === +article ? product : ''}))
        }
        else if(priceMIN !== 0 || priceMAX !== 1000){
            props.updateProductFilter(_.filter(products, product => {
                return +product.price >= +priceMIN && +product.price <= priceMAX ? product : ''}))
        }
        setName('');
        setArticle(0);
        setPriceMIN(0);
        setPriceMAX(1000);
        setCategory('');
        formRef.reset();
    };

    const productItem = productsFilter.map(product => {
        return <ProductSketchContainer key={product.article} product={product} productsService={props.productsService}/>
    })

    useEffect(() => {
        if(name !== ''){
            $('#article').attr('disabled', 'true');
            $('#category').attr('disabled', 'true');
            $('#price_min').attr('disabled', 'true');
            $('#price_max').attr('disabled', 'true');
        }
        else if(+article !== 0){
            $('#name').attr('disabled', 'true');
            $('#category').attr('disabled', 'true');
            $('#price_min').attr('disabled', 'true');
            $('#price_max').attr('disabled', 'true');
        }
        else if(category !== ''){
            $('#article').attr('disabled', 'true');
            $('#name').attr('disabled', 'true');
            $('#price_min').attr('disabled', 'true');
            $('#price_max').attr('disabled', 'true');
        }
        else if(+priceMIN !== 0){
            $('#article').attr('disabled', 'true');
            $('#name').attr('disabled', 'true');
            $('#category').attr('disabled', 'true');
        }
        else{
            $('#category').removeAttr('disabled', 'false');
            $('#article').removeAttr('disabled', 'false');
            $('#name').removeAttr('disabled', 'false');
            $('#price_min').removeAttr('disabled', 'false');
            $('#price_max').removeAttr('disabled', 'false');
        }
        const isValidate = () => {
            return name !== '' || category !== '' || +article !== 0 || +priceMIN !== 0 && +priceMAX !== 0 && +priceMIN < +priceMAX  ? false : true
        };
        setIsInvalid(isValidate());
    },[name, article, category, priceMAX, priceMIN])

    return <React.Fragment>
            <div className="content">
                <div className="container">
                    <div className="content-header">
                        <span className="title">- Search product -</span>
                    </div>
                    <div className="content-body">
                        <div className="form-product">
                            <form className="form" ref={(ref) => formRef = ref} onSubmit={onSubmit} noValidate>
                                <div className="form-group_wrapper">
                                    <div className="form-group">
                                        {getInputElementSmall('input input-selection', 'input-category', 'Search by category', 'text', 'category', 'category', handleChange, 'Please enter product category' )}
                                    </div>
                                    <div className="form-group">
                                        {getInputElementSmall('input input-selection', 'input-name', 'Search by name', 'text', 'name', 'name', handleChange, 'Please enter product name' )}
                                    </div>
                                    <div className="form-group">
                                        {getInputElementSmall('input input-selection', 'input-article', 'Search by article', 'number', 'article', 'article', handleChange, 'Please enter product article' )}
                                    </div>
                                </div>
                                <div className="form-group_wrapper form-group-wrapper_price">
                                    <div className="form-group">
                                        {getInputElementSmall('input input-selection', 'input-price_min', 'Search from price min, ₪', 'number', 'priceMIN', 'price_min', handleChange, 'Please enter price minimum' )}
                                    </div>
                                    <div className="form-group">
                                        {getInputElementSmall('input input-selection', 'input-price_max', 'Search to price max, ₪', 'number', 'priceMAX', 'price_max', handleChange, 'Please enter price maximum' )}
                                    </div>
                                </div>
                                <div className="button-group">
                                    <div className="button-group_wrapper">
                                        <button className="button-submit" disabled={isInvalid} id="submit" type="submit">
                                            Search
                                        </button>
                                        <button className="button-close" type="button" onClick={resetFilter} >
                                            Reset
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="content-body">
                        {productItem}
                    </div>
                </div>
            </div>
        </React.Fragment>

}

export default Search;