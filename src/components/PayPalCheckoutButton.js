import React from 'react';
import ReactDOM from 'react-dom';
import paypal from 'paypal-checkout';
import { paypalConf } from '../config/config_paypal';
import { CURRENCY } from '../config/config_paypal';


const PayPalCheckoutButton = (props) => {

    const items = [];
    const id = props.orderID;
    const total = props.total;
    const order = {...props.order};

    const orderForPayPal = {
        id: id,
        total: total,
        items: items
    };



    const PayPalButton =  paypal.Button.driver('react', {React, ReactDOM});

    const payment = (data, actions) => {
        props.products.map(product => {
            return items.push({
                name: product.name,
                quantity: product.unit === "gram" ? product.quantity/100 : product.quantity,
                price: product.price,
                sku: product.unit === "gram" ? 'x100 ' + product.unit : product.unit ,
                currency: CURRENCY
            })
        });
        const payment = {
            transactions: [
                {
                    amount: {
                        total: orderForPayPal.total,
                        currency: CURRENCY,
                    },
                    description: 'OrganicShop | Food store',
                    custom: orderForPayPal.id || '',
                    item_list: {
                        items: items
                    }
                }
            ],
            note_to_payer: 'Contact us for any clarification'
        };

        return actions.payment.create({payment});
    };

    const onAuthorize = (data, actions) => {
        return actions.payment.execute()
            .then(response => {
                console.log(response);
                alert(`The payment was processed correctly, ID: ${response.id}`);
                order.isPaid = true;
                props.updateOrder(order);
                props.hideDetail();
        })
            .catch(error => {
                console.log(error);
                alert(`An error occurred while processing the payment with PayPal`);
            })
    };

    const onError = (error) => {
        console.log(error);
        // alert(`The payment was not made, please try again`);
        alert(error)
    };

    const onCancel = (data, actions) => {
        // alert(`Payment not made, the user canceled the process`)
        console.log('Payment not made, the user canceled the process');
    };

    return <React.Fragment>
        <PayPalButton env={paypalConf.env}
                      client={paypalConf.client}
                      payment={(data, actions) => payment(data, actions)}
                      onAuthorize={(data, actions) => onAuthorize(data, actions)}
                      onCancel={(data, actions) => onCancel(data, actions)}
                      onError={(error) => onError(error)}
                      style={paypalConf.style}
        />
    </React.Fragment>
}

export default PayPalCheckoutButton;
