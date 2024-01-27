import {DetailedHTMLProps, InputHTMLAttributes, useEffect, useState} from "react";
import apis, {ItemsResponse} from "../libs/Apis";

type InputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

interface Props {
    placeholder: string
    value: string
    setValue: (newValue: string) => void
    type: string
    label: string
    inputProps?: InputProps
}

const ItemTextField = ({
    placeholder,
    value,
    setValue,
    type,
    label,
    inputProps,
}: Props & InputProps) => {
    const [items, setItems] = useState<ItemsResponse>();
    useEffect(() => {
        const fetchItems = async () => {
            setItems(await apis.getItems());
        }
        fetchItems();
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    }

    const handleItemClick = (value: string) => {
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

            <div className="relative overflow-x-auto w-full text-left border-solid" >
                {items?.data.map((item) => (
                    <div className="flex">
                        <img src={ item.sprite } alt="icon" />
                        <p key={ item.id } onClick={ () => handleItemClick(item.name) }>{item.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ItemTextField;
