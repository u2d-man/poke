import apis, {PokeBaseInfoResponse} from "../libs/Apis";
import {TypeCard} from "./TypeCard";
import {Chart as ChartJS, LineElement, PointElement, RadarController, RadialLinearScale} from "chart.js";
import {useQuery, UseQueryResult} from "@tanstack/react-query";

ChartJS.register(RadarController, LineElement, PointElement, RadialLinearScale);

type Props = {
    pokedexID: number;
    setSprite: (newValue: string) => void;
    setName: (newValue: string) => void;
}

export function PokemonBaseInfo({pokedexID, setSprite, setName}: Props) {
    const {data}: UseQueryResult<PokeBaseInfoResponse> = useQuery({
        queryKey: ["getPokemonBasicInfo"],
        async queryFn() {
            const response = apis.getPokemonBasicInfo(pokedexID);
            if (response) {
                return response;
            } else {
                console.log('fetch error get pokemon basic info.');
            }
        }
    });

    if (!data) return null;

    setSprite(data.data.front_img ? data.data.front_img : '');
    setName(data.data.name ? data.data.name : '');

    return (
        <div className="text-white">
            <p className="text-left pl-10 pt-7 text-2xl font-bold">{ data.data.name }</p>
            <div className="flex absolute">
                <div className="box-content w-60 p-4 m-10 border-4 rounded-md border-indigo-500">
                    <img src={ data.data.front_img } className="w-60" alt="icon"/>
                </div>
                <div className="box-content p-4 m-5 text-left">
                    <div className="pt-6">
                        <p>全国No. { data.data.pokedex_id }</p>
                        <p>高さ { data.data.height }m</p>
                        <p className="pb-6">重さ { data.data.weight }kg</p>
                        <TypeCard types={ data.data.types }/>
                    </div>
                </div>
            </div>
        </div>
    );
}
