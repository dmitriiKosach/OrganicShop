import React from 'react';
import Order from './Order';

const Basket = (props) => {

    return <React.Fragment>
        <div className="content">
            <div className="container">
                <div className="content-header">
                    <span className="title">- Basket -</span>
                </div>
                <div className="content-body">
                    <Order ordersService={props.ordersService} productsService={props.productsService}/>
                </div>
            </div>
        </div>
    </React.Fragment>
}

export default Basket;