import {DetailedHTMLProps, InputHTMLAttributes} from "react";

type InputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

interface Props {
    placeholder: string
    value: string
    setValue: (newValue: string) => void
    type: string
    label: string
    inputProps?: InputProps
}

const MoveTextField = ({
    placeholder,
    value,
    setValue,
    type,
    label,
    inputProps
}: Props & InputProps) => {
    return (
        <div className="m-5">
            <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 mr-3"
                type={ type }
                { ...inputProps }
                value={ value }
                placeholder={ placeholder }
                onChange={ e => setValue(e.target.value) }
            />
        </div>
    );
}

export default MoveTextField;
