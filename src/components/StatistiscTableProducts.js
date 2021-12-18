import React from 'react';
import { getStatistics } from '../utility/function';

const StatisticsTableProducts = (props) => {

    let arrayEntriesProducts = [];
    let count = 1;
    const maxSalesOfProduct = getStatistics(props.orders, props.categoriesStatus, "statProducts");

    for (let entry of maxSalesOfProduct) {
        arrayEntriesProducts.push(entry);
    }

    let itemProduct = arrayEntriesProducts.map(entry => {
        return <React.Fragment key={entry[0]}>
            <tr key={entry[0]}>
                <td>{count++}</td>
                <td>{entry[0]}</td>
                <td>{entry[1].count}</td>
                <td>{entry[1].quantity}</td>
                <td>{entry[1].unit}</td>
            </tr>
        </React.Fragment>
    })

    return <React.Fragment>
        <div className="table__content">
            <div className="table__title">
                <span>{"Most popular " + props.label + ":"}</span>
            </div>
            <table>
                <thead >
                    <tr>
                        <th>#</th>
                        <th>{props.categoriesStatus === "yes" ? "Name Category" : "Name Product"}</th>
                        <th>Number of times selected</th>
                        <th>Quantity</th>
                        <th>Unit</th>
                    </tr>
                </thead>
                <tbody>
                    {itemProduct}
                </tbody>
            </table>
        </div>
    </React.Fragment>
}
export default StatisticsTableProducts;