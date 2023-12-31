import {DetailedHTMLProps, InputHTMLAttributes, useState} from "react";
import {useDebounce} from "react-use";
import apis, {ApiResponse} from "../libs/Apis";

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

const MoveTextField = ({
    placeholder,
    value,
    setValue,
    type,
    label,
    inputProps,
    pokedexID
}: Props & InputProps) => {
    const [onFocus, setOnFocus] = useState(false);
    const [suggestions, setSuggestions] = useState<ApiResponse>();
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    const handleInputFocus = () => {
        setOnFocus(true);
    };

    const handleInputBlur = () => {
        setOnFocus(false);
    };

    useDebounce(
        () => {
            const fetchSuggestions = async () => {
                setSuggestions(await apis.getPokemonMove(pokedexID));
            };
            fetchSuggestions();
        },
        500,
        [value]
    );

    return (
        <div className="m-5">
            <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 mr-3"
                type={ type }
                { ...inputProps }
                value={ value }
                placeholder={ placeholder }
                onChange={ handleInputChange }
                onFocus={ handleInputFocus }
                onBlur={ handleInputBlur }
            />

            <div className={` ${onFocus ? '' : 'hidden' } relative overflow-x-auto` }>
                <table className="w-full text-sm text-left">
                    <tbody>
                    {suggestions?.data.map((suggestion) => (
                        <p key={ suggestion }>{suggestion}</p>
                    ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
}

export default MoveTextField;
