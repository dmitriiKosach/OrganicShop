import React, { useEffect, useState } from 'react';
import { getInputElementBig, getInputElementSmall, getSelection } from '../utility/input_element';
import { CATEGORIES, UNITS } from '../config/config_categories';

const ProductForm = (props) => {

    const [product, setProduct] = useState({
        category: '',
        article: 0,
        name: '',
        photoURL: '',
        description: '',
        price: 0,
        unit: '',
        reserve: 0,
        quantity: 0
    });

    const [isInvalid, setIsInvalid] = useState(true);

    const handleChangeCategory = (event) => {
        event.preventDefault();
        const category = event.target.value;
        setProduct({ ...product, category: category });
    };

    const handleChangeArticle = (event) => {
        event.preventDefault();
        const article = (Number)(event.target.value);
        setProduct({ ...product, article: article });
    };

    const handleChangeName = (event) => {
        event.preventDefault();
        const name = event.target.value;
        setProduct({ ...product, name: name });
    };

    const handleChangePhoto = (event) => {
        event.preventDefault();
        const photoURL = event.target.value;
        setProduct({ ...product, photoURL: photoURL });
    };

    const handleChangeDescription = (event) => {
        event.preventDefault();
        const description = event.target.value;
        setProduct({ ...product, description: description });
    };

    const handleChangePrice = (event) => {
        event.preventDefault();
        const price = event.target.value;
        setProduct({ ...product, price: (Number(price)).toFixed(2) });
    };

    const handleChangeUnit = (event) => {
        event.preventDefault();
        const unit = event.target.value;
        setProduct({ ...product, unit: unit });
    };

    const handleChangeReserve = (event) => {
        event.preventDefault();
        const reserve = (Number(event.target.value)).toFixed(2);
        setProduct({ ...product, reserve: reserve });
    };

    const onSubmit = (event) => {
        event.preventDefault();
        if (!props.fnAddProduct(product)) {
            alert(`Product #${product.article} already exists`);
        }
    };

    useEffect(() => {
        const isValidate = () => {
            return !(product.category !== '' && product.article !== 0 && product.name !== '' && product.description !== '' && product.price !== 0 &&
                product.unit !== '' && product.reserve !== 0)
        };
        setIsInvalid(isValidate())
    }, [product])

    return <React.Fragment>
        <div className="content">
            <div className="container">
                <div className="content__header">
                    <span className="content__header-title">- Product Addition Form -</span>
                </div>
                <div className="content__body">
                    <div className="form__product">
                        <form className="form" onSubmit={onSubmit} noValidate>
                            <div className="form__group-wrapper">
                                <div className="form__group">
                                    {getSelection('input input__selection', 'input__category', 'Product category', handleChangeCategory, 'category', 'input-category', [' ', ...CATEGORIES])}
                                </div>
                                <div className="form__group">
                                    {getInputElementSmall('input input__selection', 'input__article', 'Product article', 'number', 'article', 'input-article', handleChangeArticle, 'Please enter product article')}
                                </div>
                                <div className="form__group">
                                    {getInputElementSmall('input input__selection', 'input__name', 'Product name', 'text', 'name', 'input-name', handleChangeName, 'Please enter product name')}
                                </div>
                            </div>

                            <div className="form__group">
                                {getInputElementBig('input input__element', 'input__photoURL', 'Product photo', 'url', 'photoURL', 'input-photoURL', handleChangePhoto, 'Please enter url address product photo', 'https://.*')}
                            </div>
                            <div className="form__group">
                                {getInputElementBig('input input__element', 'input__description', 'Product description', 'text', 'description', 'input-description', handleChangeDescription, 'Please enter product description')}
                            </div>
                            <div className="form__group-wrapper">
                                <div className="form__group">
                                    {getInputElementSmall('input input__selection', 'input__price', 'Product price', 'number', 'price', 'input-price', handleChangePrice, 'Please enter product price')}
                                </div>
                                <div className="form__group">
                                    {getSelection('input input__selection', 'input__unit', 'Product unit', handleChangeUnit, 'unit', 'input-unit', [' ', ...UNITS])}
                                </div>
                                <div className="form__group">
                                    {getInputElementSmall('input input__selection', 'input__reserve', 'Product reserve', 'number', 'reserve', 'input-reserve', handleChangeReserve, 'Please enter product reserve')}
                                </div>
                            </div>

                            <div className="button__group">
                                <div className="button__group-wrapper">
                                    <button className="button__submit" disabled={isInvalid} id="submit" type="submit">
                                        Confirm
                                    </button>
                                    <button className="button__close" type="button" onClick={() => props.changeFlagFn(0)} >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </React.Fragment>
}

export default ProductForm;
