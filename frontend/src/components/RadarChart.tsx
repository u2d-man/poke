import React, {useEffect, useState} from "react";
import { Chart as ChartJS, RadarController, LineElement, PointElement, RadialLinearScale } from "chart.js";
import {Radar} from "react-chartjs-2";
import apis, {ApiResponse} from "../libs/Apis";

ChartJS.register(RadarController, LineElement, PointElement, RadialLinearScale);

const RadarChart = () => {
    const [baseStats, setBaseStats] = useState<ApiResponse>();
    useEffect(() => {
        const fetchBaseStats = async () => {
            setBaseStats(await apis.getPokemonBaseStats(1001));
        }
        fetchBaseStats();
    }, []);

    const data = {
        labels: [
            'HP',
            'こうげき',
            'ぼうぎょ',
            'すばやさ',
            'とくぼう',
            'とくこう',
        ],
        datasets: [
            {
                label: "base stats",
                data: baseStats?.data,
                backgroundColor: "#C3C7F3",
                borderColor: "#C3C7F3",
                pointBackgroundColor: "#C3C7F3",
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: "#C3C7F3"
            },
        ],
    }

    const options = {
        scales: {
            r: {
                angleLines: {
                    display: true
                },
                suggestedMin: 0,
                suggestedMax: 350
            }
        }
    }

    return (
        <Radar data={ data } options={ options } className="p-4 m-5" />
    );
}

export default RadarChart;
