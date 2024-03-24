import React, {DetailedHTMLProps, InputHTMLAttributes} from "react";
import apis, {ApiResponse} from "../libs/Apis";
import {useQuery, UseQueryResult} from "@tanstack/react-query";

type InputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type Props = {
    placeholder: string;
    value: string;
    setValue: (newValue: string) => void;
    type: string;
    label: string;
    inputProps?: InputProps;
    pokedexID: number;
}

export function MoveTextField({
    placeholder,
    value,
    setValue,
    type,
    label,
    inputProps,
    pokedexID
}: Props & InputProps) {
    const {data}: UseQueryResult<ApiResponse> = useQuery({
        queryKey: ["getPokemonMove"],
        async queryFn() {
            const response = await apis.getPokemonMove(pokedexID);
            if (response) {
                return response;
            } else {
                console.log('fetch error get pokemon move.');
            }
        }
    });

    if (!data) return null;

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    }

    const handleMoveClick = (value: string) => {
        setValue(value)
    }

    return (
        <div className="m-5">
            <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 mr-3"
                type={ type }
                { ...inputProps }
                value={ value }
                placeholder={ placeholder }
                onChange={ handleInputChange }
            />

            <div className='relative overflow-x-auto w-full text-left border-solid' >
                {data.data.map((suggestion) => (
                    <p className="text-white" key={ suggestion } onClick={ () => handleMoveClick(suggestion) }>{suggestion}</p>
                ))}
            </div>
        </div>
    );
}
