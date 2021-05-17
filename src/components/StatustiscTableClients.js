import React from 'react';
import { CURRENCY } from '../config/config_paypal';
import { getStatistics } from '../utility/function';

const StatisticsTableClients = (props) => {
    let arrayEntriesClients = [];
    let count = 1;

    const maxVisitedOfClient = getStatistics(props.orders, "", "statClients");

    for (let entry of maxVisitedOfClient) {
        arrayEntriesClients.push(entry);
    }

    let itemProduct = arrayEntriesClients.map(entry => {
        return <React.Fragment key={entry[0]}>
            <tr key={entry[0]}>
                <td>{count++}</td>
                <td>{entry[0]}</td>
                <td>{entry[1].count}</td>
                <td>{CURRENCY + ' ' + (Number(entry[1].totalPurchases)).toFixed(2)}</td>
            </tr>
        </React.Fragment>
    })

    return <React.Fragment>
        <div className="table__content">
            <div className="table__title">
                <span>Most visited customers:</span>
            </div>
            <table>
                <thead >
                    <tr>
                        <th>#</th>
                        <th>Customer name</th>
                        <th>Number of purchases</th>
                        <th>Total purchases</th>
                    </tr>
                </thead>
                <tbody>
                    {itemProduct}
                </tbody>
            </table>
        </div>
    </React.Fragment>
}
export default StatisticsTableClients;