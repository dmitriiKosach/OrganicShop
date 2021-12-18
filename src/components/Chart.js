import React from 'react';
import { Bar } from 'react-chartjs-2';
import { COLORS } from '../config/config_chart';

const Chart = (props) => {

    const data = {
        labels: props.database.labels,
        datasets: [{
            label: props.database.label,
            data: props.database.data,
            backgroundColor: [...COLORS]
        }]
    };

    return <React.Fragment>
        <div className="chart__content-wrapper">
            <Bar
                className="chart"
                data={data}
                width={100}
                height={50}
                options={{ maintainAspectRatio: true, }}
            />
        </div>
    </React.Fragment>
}

export default Chart;