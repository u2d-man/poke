import React from "react";
import { Chart as ChartJS, RadarController, LineElement, PointElement, RadialLinearScale } from "chart.js";
import {Radar} from "react-chartjs-2";
import apis, {ApiResponse} from "../libs/Apis";
import {useQuery, UseQueryResult} from "@tanstack/react-query";

ChartJS.register(RadarController, LineElement, PointElement, RadialLinearScale);

type Props = {
    pokedexID: number
}

export function RadarChart({pokedexID}: Props) {
    const {data}: UseQueryResult<ApiResponse> = useQuery({
        queryKey: ["getPokemonBaseStats"],
        async queryFn() {
            const response = apis.getPokemonBaseStats(pokedexID);
            if (response) {
                return response;
            } else {
                console.log('fetch error get pokemon base stats.');
            }
        }
    });

    if (!data) return null;

    const chartData = {
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
                data: data.data,
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
        <Radar data={ chartData } options={ options } className="p-4 m-5" />
    );
}
