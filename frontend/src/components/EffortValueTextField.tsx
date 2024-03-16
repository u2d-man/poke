import {DetailedHTMLProps, InputHTMLAttributes} from "react";

type InputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type Props = {
    placeholder: string;
    value: string;
    setValue: (newValue: string) => void;
    type: string;
    label: string;
    inputProps?: InputProps;
}

const EffortValueTextField = ({
    placeholder,
    value,
    setValue,
    type,
    label,
    inputProps
}: Props & InputProps) => {
    return (
        <div className="m-5 flex">
            <label className="mt-5 mb-2 text-sm font-medium text-gray-900 mr-3">{ label }</label>
            <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 mr-3"
                type={ type }
                { ...inputProps }
                value={ value }
                placeholder={ placeholder }
                onChange={ e => setValue(e.target.value) }
            />
            <input className="cursor-pointer" id="effort-range-input" value={ value } min="0" max="252" type="range" />
        </div>
    );
}

export default EffortValueTextField;
