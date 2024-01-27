import axios, { AxiosRequestConfig } from "axios";
import {Form} from "react-router-dom";

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

    async getPokemonMove(pokedexID: number, axiosconfig?: AxiosRequestConfig) {
        const { data } = await axios.get(`${baseUrl}/api/v1/pokemon/move/${pokedexID}`, axiosconfig);

        return data;
    }

    async getItems(axiosconfig?: AxiosRequestConfig) {
        const { data } = await axios.get(`${baseUrl}/api/v1/items/`, axiosconfig);

        return data;
    }

    async postTrainingPokemon(req: PostTrainingPokemonRequest, axiosconfig?: AxiosRequestConfig) {
        const data = new FormData();
        data.append('pokedex_id', req.pokedex_id)
        data.append('name', req.name)
        data.append('move_1', req.move_1)
        data.append('move_2', req.move_2)
        data.append('move_3', req.move_3)
        data.append('move_4', req.move_4)
        data.append('hp', req.hp)
        data.append('attack', req.attack)
        data.append('speed', req.speed)
        data.append('defense', req.defense)
        data.append('special_attack', req.special_attack)
        data.append('special_defense', req.special_defense)
        data.append('item', req.item)
        await axios.post<void>(`${baseUrl}/api/v1/training_pokemon/`, data, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            ...axiosconfig
        });
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

export interface ItemsResponse {
    message: string
    data: Items[]
}

export interface Items {
    id: number
    name: string
    sprite: string
}

export interface PostTrainingPokemonRequest {
    pokedex_id: string,
    name: string,
    move_1: string,
    move_2: string,
    move_3: string,
    move_4: string,
    hp: string,
    attack: string,
    defense: string,
    speed: string,
    special_defense: string,
    special_attack: string,
    item: string,
}

