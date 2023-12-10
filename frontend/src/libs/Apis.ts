import axios, { AxiosRequestConfig } from "axios";
import PokemonBaseInfo from "../components/PokemonBaseInfo";

const baseUrl = 'http://localhost:8080'

class Apis {
    async getPokemonBasicInfo(pokedexID: number, axiosconfig?: AxiosRequestConfig) {
        const { data } = await axios.get<PokeBaseInfoResponse>(
            `${baseUrl}/api/v1/pokemon/${pokedexID}`,
            axiosconfig
        );

        return data;
    }

    async getPokemonBaseStats(pokedexID: number, axiosconfig?: AxiosRequestConfig) {
        const { data } = await axios.get(`${baseUrl}/api/v1/pokemon/base_stats/${pokedexID}`, axiosconfig);

        return data;
    }
}

const apis = new Apis();
export default apis;

export interface ApiResponse {
    message: string
    data: any[]
}

export interface PokeBaseInfoResponse {
    message: string
    data: PokeBaseInfo
}

export interface PokeBaseInfo {
    pokedex_id: number
    front_img: string
    name: string
    types: string[]
    height: number
    weight: number
}

