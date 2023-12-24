import React, {useEffect, useState} from "react";
import apis, {PokeBaseInfoResponse} from "../libs/Apis";
import TypeCard from "./TypeCard";
import {Chart as ChartJS, LineElement, PointElement, RadarController, RadialLinearScale} from "chart.js";

ChartJS.register(RadarController, LineElement, PointElement, RadialLinearScale);

interface Props {
    pokedexID: number
}

const PokemonBaseInfo = ({ pokedexID }: Props) => {
    const [baseInfo, setBaseInfo] = useState<PokeBaseInfoResponse>();
    useEffect(() => {
        const fetchBaseInfo = async () => {
            setBaseInfo(await apis.getPokemonBasicInfo(pokedexID));
        }
        fetchBaseInfo();
    }, []);

    return (
        <div className="flex border-4 m-5 w-3/6 absolute">
            <div className="box-content w-60 p-4 m-10 border-4 rounded-md border-indigo-500">
                <img src={baseInfo?.data.front_img} className="w-60" alt="icon"/>
            </div>
            <div className="box-content p-4 m-5 text-left">
                <p className="text-lg font-bold">{baseInfo?.data.name}</p>
                <div className="pt-6">
                    <p>全国No. {baseInfo?.data.pokedex_id}</p>
                    <p>高さ {baseInfo?.data.height}m</p>
                    <p className="pb-6">重さ {baseInfo?.data.weight}kg</p>
                    <TypeCard types={baseInfo?.data.types}/>
                </div>
            </div>
        </div>
    );
}

export default PokemonBaseInfo;
