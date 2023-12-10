import {useEffect, useState} from "react";
import apis, {ApiResponse, PokeBaseInfoResponse} from "../libs/Apis";

const PokemonBaseInfo = () => {
    const [baseInfo, setBaseInfo] = useState<PokeBaseInfoResponse>();
    useEffect(() => {
        const fetchBaseInfo = async () => {
            setBaseInfo(await apis.getPokemonBasicInfo(1));
        }
        fetchBaseInfo();
    }, []);

    console.log(baseInfo)

    return (
        <div className="container hidden lg:flex">
            <div className="box-content h-60 w-60 p-4 m-10 border-4 rounded-md border-indigo-500">
                <img src={baseInfo?.data.front_img} className="w-60"  alt="icon" />
            </div>
            <div className="box-content p-4 m-5 mr-auto">
                <p className="text-lg font-bold">{ baseInfo?.data.name }</p>
            </div>
        </div>
    );
}

export default PokemonBaseInfo;
