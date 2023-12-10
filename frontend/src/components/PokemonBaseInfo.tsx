import {useEffect, useState} from "react";
import apis, {ApiResponse, PokeBaseInfoResponse} from "../libs/Apis";

const PokemonBaseInfo = () => {
    const [baseInfo, setBaseInfo] = useState<PokeBaseInfoResponse>();
    useEffect(() => {
        const fetchBaseInfo = async () => {
            setBaseInfo(await apis.getPokemonBasicInfo(1000));
        }
        fetchBaseInfo();
    }, []);

    console.log(baseInfo)

    return (
        <div className="container hidden lg:flex">
            <div className="box-content h-60 w-60 p-4 m-10 border-4 rounded-md border-indigo-500">
                <img src={baseInfo?.data.front_img} className="w-60"  alt="icon" />
            </div>
            <div className="box-content p-4 m-5 mr-auto text-left">
                <p className="text-lg font-bold">{ baseInfo?.data.name }</p>
                <div className="pt-6">
                    <p>全国No. { baseInfo?.data.pokedex_id }</p>
                    <p>高さ { baseInfo?.data.height }m</p>
                    <p>重さ { baseInfo?.data.weight }kg</p>
                </div>
            </div>
        </div>
    );
}

export default PokemonBaseInfo;
