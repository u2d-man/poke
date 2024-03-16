import {DetailedHTMLProps, InputHTMLAttributes, useEffect, useState} from "react";
import apis, {ApiResponse} from "../libs/Apis";
import {useQuery, UseQueryResult} from "@tanstack/react-query";

type InputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

interface Props {
    placeholder: string
    value: string
    setValue: (newValue: string) => void
    type: string
    label: string
    inputProps?: InputProps
    pokedexID: number
}

const AbilityTextField = ({
    placeholder,
    value,
    setValue,
    type,
    label,
    inputProps,
    pokedexID
 }: Props & InputProps) => {
    const [onFocus, setOnFocus] = useState(false);

    const { data }: UseQueryResult<ApiResponse> = useQuery({
        queryKey: ["getPokemonAbility"],
        async queryFn() {
            const response = await apis.getPokemonAbility(pokedexID);
            if (response) {
                return response;
            } else {
                console.log('fetch error get pokemon ability.');
            }
        },
    });

    if (!data) return null;

    const handleInputFocus = () => {
        setOnFocus(true);
    }

    const handleInputBlur = () => {
        setOnFocus(false);
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
                onFocus={ handleInputFocus }
                onBlur={ handleInputBlur }
            />

            <div className="relative overflow-x-auto w-full text-left border-solid" >
                {data.data.map((ability) => (
                    <p key={ ability } onClick={ () => handleMoveClick(ability) }>{ability}</p>
                ))}
            </div>
        </div>
    );
}

export default AbilityTextField;
