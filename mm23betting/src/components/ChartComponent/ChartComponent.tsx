import React, { useRef } from 'react';
import './ChartComponent.css';
import { Chart, Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);
const ChartComponent = () => {
    const chartRef = useRef(null);
    return (
        <div id="ChartComponent">
            <button onClick={() => { console.log(chartRef.current) }}>Hello world</button>
            <Line
                datasetIdKey='id'
                ref={chartRef}
                data={{
                    labels: Array.from({ length: 3 }, (_, i) => `game${i + 1}`),
                    datasets: [
                        {
                            id: 1,
                            label: 'Dataset 1',
                            data: [5, 6, 7],
                            borderColor: 'rgb(255, 99, 132)',
                            backgroundColor: 'rgba(255, 99, 132, 0.5)',
                        },
                        {
                            id: 2,
                            label: 'Dataset 2',
                            data: [3, 2, 1],
                            borderColor: 'rgb(53, 162, 235)',
                            backgroundColor: 'rgba(53, 162, 235, 0.5)',
                        },
                    ],
                }}
                options={{
                    scales: {
                        x: {
                        }
                    }
                }}
            />
        </div>
    );
}

export default ChartComponent;
