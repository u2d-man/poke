import React from "react";
import { Chart as ChartJS, RadarController, LineElement, PointElement, RadialLinearScale } from "chart.js";
import {Radar} from "react-chartjs-2";

ChartJS.register(RadarController, LineElement, PointElement, RadialLinearScale);

const RadarChart = () => {
    return (
        <Radar data={
            data
        }
        />
    );
}

const data = {
    labels: [
        'HP',
        'こうげき',
        'ぼうぎょ',
        'とくこう',
        'とくぼう',
        'すばやさ',
    ],
    datasets: [
        {
            label: "Dataset 1",
            data: [12, 11, 14, 52, 14, 32],
            backgroundColor: "rgba(255, 99, 132, 0.5)"
        },
        {
            label: "Dataset 1",
            data: [12, 11, 14, 52, 14, 32],
            backgroundColor: "rgba(255, 99, 132, 0.5)"
        },
        {
            label: "Dataset 1", // 凡例
            data: [12, 11, 14, 52, 14, 32],
            backgroundColor: "rgba(255, 99, 132, 0.5)"
        }
    ]
}

export default RadarChart;
