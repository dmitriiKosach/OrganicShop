import axios from 'axios';
import React from 'react';

const Account = () => {
    const CURRENCY_CODE = {
        USD: 'USD',
        ILS: 'ILS',
        EUR: 'EUR',
        RUB: 'RUB'
    }
    const getDateToday = () => {
        const date = new Date;
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    }

    const renderContent = (response) => {
        const { data } = response;
        let content = document.getElementById('data').innerHTML;
        Object
            .keys(data.rates)
            .map((currencyCode) => {
                content += `
                    <tr>
                        <td>${currencyCode}</td>
                        <td>${data.rates[currencyCode]}</td>
                    </tr>
                 `;
            });

        document.getElementById('data').innerHTML = content;
    }

    axios.get(`https://api.ratesapi.io/api/${getDateToday()}?base=${CURRENCY_CODE.USD}&symbols=${CURRENCY_CODE.ILS},${CURRENCY_CODE.RUB}`)
        .then(renderContent);





    return <React.Fragment>
        <div className="content" >
            <div className="container">
                <div className="content__header">
                    <span className="content__header-title">- My account -</span>
                </div>
                <div className="content__body">
                   <tbody id="data"></tbody>
                </div>
            </div>
        </div>
    </React.Fragment>
}

export default Account;