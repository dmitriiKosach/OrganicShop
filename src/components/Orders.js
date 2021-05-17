import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import OrdersTable from './OrdersTable';
import Preloader from './Preloader';
import { getInputElementDate } from '../utility/input_element';
import _ from 'lodash';

const Orders = (props) => {

    let formRef = null;
    const isAdmin = useSelector(state => state.userData.isAdmin);
    const [isLoader, setIsLoader] = useState(false);
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [isInvalid, setIsInvalid] = useState(true);
    const ordersState = useSelector(state => state.orders).sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
    const [ordersFilter, setOrdersFilter] = useState([]);

    const removeOrder = (orderID) => {
        if (window.confirm(`You are going to delete order ${orderID}`)) {
            setIsLoader(true);
            props.ordersService.removeOrder(orderID)
                .then(() => {
                    setIsLoader(false);
                })
                .catch(error => {
                    setIsLoader(false);
                    alert(JSON.stringify(error))
                });
        }
    };

    const handleChangeDate = (event) => {
        event.preventDefault();
        switch (event.target.name) {
            case 'date-from':
                setDateFrom(event.target.value);
                break;
            case 'date-to':
                setDateTo(event.target.value);
                break;
            default:
                break;
        }
    }

    const resetFilter = () => {
        setOrdersFilter([]);
        formRef.reset();
        setDateFrom('');
        setDateTo('');
    }

    const onSubmit = (event) => {
        event.preventDefault();
        const temp = _.filter(ordersState, order => {
            return (new Date(order.date).valueOf() >= new Date(dateFrom).valueOf() - 86400000  && new Date(order.date).valueOf() <= new Date(dateTo).valueOf());
        })
        setOrdersFilter(temp);
        setDateFrom('');
        setDateTo('');
        formRef.reset();
    }

    useEffect(() => {
        const isValidate = () => {
            return dateFrom === '' || dateTo === '';
        };
        setIsInvalid(isValidate());
    }, [dateFrom, dateTo])

    return <React.Fragment>
        <div className="content">
            <div className="container">
                <div className="content__header">
                    <span className="content__header-title">{isAdmin ? '- Orders -' : '- My orders -'}</span>
                </div>
                <div className="content__body">
                    <div className="form__search-date">
                        <form className="search__date" ref={(ref) => formRef = ref} onSubmit={onSubmit} noValidate>
                            <div className="search__date-title">
                                <span>Filter of Date:</span>
                            </div>
                            {getInputElementDate('input input__date', 'input__date-from', 'date', 'date-from', 'date-from', handleChangeDate, 'yyyy-mm-dd')}
                            <span>-</span>
                            {getInputElementDate('input input__date', 'input__date-to', 'date', 'date-to', 'date-to', handleChangeDate, 'yyyy-mm-dd')}
                            <button disabled={isInvalid} className="button__submit button__submit-small " id="submit" type="submit">
                                Search
                            </button>
                        </form>
                        <button className="button__close button__close-small" onClick={resetFilter} id="submit" type="submit">
                            Reset
                        </button>
                    </div>
                    <OrdersTable ordersService={props.ordersService} orders={ordersFilter.length > 0 ? ordersFilter : ordersState} removeOrder={removeOrder} />
                    {isLoader ? <Preloader /> : ''}
                </div>
            </div>
        </div>
    </React.Fragment>
}

export default Orders;