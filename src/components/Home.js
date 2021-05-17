import React from 'react';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import { NavLink } from 'react-router-dom';


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
        <div className="home ">
            <div className="home__content">

                    <span className="home__content-title">Welcome to Rabbit Fresh Market</span>


                    <span className="home__content-subtitle">Local Foods at Good Price</span>

                    <div className="home__input-wrapper"  >
                        <input className="home__input" onChange={handleChange} type="text" name="name" id='name' placeholder="Search products..." />
                        <NavLink className="home__link" to='/search'>
                            <i className="fas fa-search" />
                        </NavLink>
                    </div>

            </div>
        </div>
    </React.Fragment>
}

export default Shop;

