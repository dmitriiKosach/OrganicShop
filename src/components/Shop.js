import React from 'react';
import {useSelector} from "react-redux";
import _ from "lodash";
import {NavLink} from "react-router-dom";

const Shop = (props) => {

    const products = useSelector(state => state.products);

    const handleChange = (event) => {
        event.preventDefault();
        const value = event.target.value;
        props.updateProductFilter(_.filter(products, product => {
            let isContains = product.name.toLowerCase().includes(value.toLowerCase())
            return isContains === true ? product : ''
        }));
    }

    return <React.Fragment>
        <div className="shop shop-banner">
            <div className="shop-content">
                <div>
                    <span className="shop-content_title">Welcome to Rabbit Fresh Market</span>
                </div>
                <div>
                    <span className="shop-content_subtitle">Local Foods at Good Price</span>
                </div>
                <div >
                    <div className="shop-input_wrapper"  >
                        <input className="shop-input" onChange={handleChange} type="text" name="name" id='name' placeholder="Search products..." />
                        <NavLink className="shop-link"  to='/search'>
                            <i className="fas fa-search"/>
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    </React.Fragment>
}

export default Shop;

