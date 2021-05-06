import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import StatisticsTableProducts from './StatistiscTableProducts';
import StatisticTableClients from './StatustiscTableClients';
import {getInputElementDate, getOptions} from '../utility/input_element';
import {UNITS} from '../config/config_statistics';
import _ from 'lodash';
import { CURRENCY } from '../config/config_paypal';
import Chart from './Chart';
import { getDataBase, getStatistics } from '../utility/function';

const Statistics = (props) => {
    const orders = useSelector(state => state.orders);
    const [ordersFilter, setOrderFilter] = useState([]);
    const [orderStatus, setOrderStatus] = useState("all orders");
    const [categoriesStatus, setCategoriesStatus] = useState("no");
    const [isInvalidFilterDates, setIsInvalidFilterDates] = useState(true);
    const [totalPriceAllOrders, setTotalPriceAllOrders] = useState(0);
    const [numberOfSales, setNumberOfSales] = useState(0);
    const [averageCheck, setAverageCheck] = useState(0);
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    let label = categoriesStatus === "no" ? "products" : "categories";
    let formRef = null;

    const resetFilter = () => {
        setOrderFilter([]);
        setOrderStatus("all orders");
        setCategoriesStatus("no");
        setDateFrom('');
        setDateTo('');
        setTotalPriceAllOrders(0);
        setNumberOfSales(0);
        setAverageCheck(0);
        formRef.reset();
    }

    const handleChangeStatistics = (event) => {
        event.preventDefault();
        switch (event.target.name) {
            case "orderStatus":
                setOrderStatus(event.target.value);
                break;
            case "categories":
                setCategoriesStatus(event.target.value);
                break;
            default:
                break;
        }
    };

    const handleChangeDate = (event) => {
        event.preventDefault();
        console.log(event.target.value)
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

    const onSubmit = (event) => {
        event.preventDefault();
        let tempTotalPrice = 0;
        let tempNumberOfSales = 0;
        let tempAverageCheck = 0;

        let temp = [...orders];
        if(!isInvalidFilterDates){
            tempTotalPrice = 0;
            tempNumberOfSales = 0;
            tempAverageCheck = 0;
            temp = _.filter(temp, order => {
                if(new Date(order.date).valueOf() >= new Date(dateFrom).valueOf() - 86400000  && new Date(order.date).valueOf() <= new Date(dateTo).valueOf()){
                    tempTotalPrice += order.totalPrice;
                    tempNumberOfSales++;
                    tempAverageCheck = tempTotalPrice/tempNumberOfSales;
                    return order;
                }
            })
        }
        if(orderStatus === "only paid"){
            tempTotalPrice = 0;
            tempNumberOfSales = 0;
            tempAverageCheck = 0;
            temp =  _.filter(temp, order => {
                if (order.isPaid) {
                    tempTotalPrice += order.totalPrice;
                    tempNumberOfSales++;
                    tempAverageCheck = tempTotalPrice/tempNumberOfSales;
                    return order;
                }
            })
        }
        if(orderStatus === "only not paid"){
            tempTotalPrice = 0;
            tempNumberOfSales = 0;
            tempAverageCheck = 0;
            temp =  _.filter(temp, order => {
                if (!order.isPaid) {
                    console.log(order.totalPrice)
                    tempTotalPrice += order.totalPrice;
                    tempNumberOfSales++;
                    tempAverageCheck = tempTotalPrice/tempNumberOfSales;
                    return order;
                }
            })
        }
        if(orderStatus === "all orders"){
            tempTotalPrice = 0;
            tempNumberOfSales = 0;
            tempAverageCheck = 0;
            temp.map(order => {
                tempTotalPrice += order.totalPrice;
                tempNumberOfSales++;
                tempAverageCheck = tempTotalPrice/tempNumberOfSales;
            });
        }
        setTotalPriceAllOrders(tempTotalPrice.toFixed(2));
        setNumberOfSales(tempNumberOfSales);
        setAverageCheck(tempAverageCheck.toFixed(2));
        setOrderFilter(temp);
    }

    useEffect(() => {
        const isValidateFilterDates = () => {
            return dateFrom === '' || dateTo === '';
        };
        setIsInvalidFilterDates(isValidateFilterDates());
    }, [orderStatus, ordersFilter, dateFrom, dateTo])

    return <React.Fragment>
        <div className="content" >
            <div className="container">
                <div className="content-header">
                    <span className="title">- Statistics -</span>
                </div>
                <div className="content-body">
                    <div className="statistics-header">
                        <form  ref={(ref) => formRef = ref} onSubmit={onSubmit} noValidate>
                            <div className="properties-filter">
                                <div className="properties-filter_title">
                                    <span>Statistics by product category:</span>
                                </div>
                                <select className="filter-category" onChange={handleChangeStatistics} name="categories">
                                    {getOptions(["no", "yes"])}
                                </select>
                            </div>
                            <div className="properties-filter">
                                <div className="properties-filter_title">
                                    <span>Statistics by status orders:</span>
                                </div>
                                <select required className="filter-order" onChange={handleChangeStatistics} name="orderStatus">
                                    {getOptions([...UNITS])}
                                </select>
                            </div>
                            <div className="properties-filter">
                                <div>
                                    <span>Statistics by date:</span>
                                </div>
                                {getInputElementDate('input input-date', 'input-date_from', 'date', 'date-from', 'date-from', handleChangeDate, 'yyyy-mm-dd')}
                                <span>-</span>
                                {getInputElementDate('input input-date', 'input-date_to', 'date', 'date-to', 'date-to', handleChangeDate, 'yyyy-mm-dd')}
                                <button  className="button-submit button-submit_small " id="submit" type="submit">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="statistic-body">
                        <div className="statistics-properties">
                            <div className="properties-wrapper">
                                <span>Total orders:</span>
                                <div className="properties-content">{numberOfSales}</div>
                            </div>
                            <div className="properties-wrapper">
                                <span>Orders amount: {CURRENCY}</span>
                                <div className="properties-content">{totalPriceAllOrders}</div>
                            </div>
                            <div className="properties-wrapper">
                                <span>Average check: {CURRENCY}</span>
                                <div className="properties-content">{averageCheck}</div>
                            </div>
                        </div>
                        <div className="statistics-table">
                            <StatisticsTableProducts orders={ordersFilter} categoriesStatus={categoriesStatus} label={label}/>
                            <StatisticTableClients orders={ordersFilter}/>
                        </div>
                        <div className="statistics-charts">

                                <Chart database={getDataBase(getStatistics(ordersFilter, categoriesStatus, "statProducts"), label) }/>


                                <Chart database={getDataBase(getStatistics(ordersFilter, categoriesStatus, ""), "")} />

                        </div>
                        <div className="statistics-footer">
                            <button className="button-close button-close_small" onClick={resetFilter} id="submit" type="submit">
                                Reset
                        </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </React.Fragment>
}

export default Statistics;