import {
  DetailedHTMLProps,
  InputHTMLAttributes,
  useEffect,
  useState,
} from 'react';
import apis, {ApiResponse} from '../libs/Apis';
import {useQuery} from '@tanstack/react-query';
import {UseQueryResult} from '@tanstack/react-query/build/modern';

type InputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

type Props = {
  placeholder: string;
  value: string;
  setValue: (newValue: string) => void;
  type: string;
  label: string;
  inputProps?: InputProps;
};

export function ItemTextField({
  placeholder,
  value,
  setValue,
  type,
  label,
  inputProps,
}: Props & InputProps) {
  const {data}: UseQueryResult<ApiResponse> = useQuery({
    queryKey: ['getItems'],
    async queryFn() {
      const response = await apis.getItems();
      if (response) {
        return response;
      } else {
        console.log('fetch error get pokemon items.');
      }
    },
  });

  if (!data) return null;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleItemClick = (value: string) => {
    setValue(value);
  };

  return (
    <div className="m-5">
      <input
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 mr-3"
        type={type}
        {...inputProps}
        value={value}
        placeholder={placeholder}
        onChange={handleInputChange}
      />

      <div className="relative overflow-x-auto w-full text-left border-solid">
        {data.data.map((item, index) => (
          <div className="flex" key={index}>
            <img src={item.sprite} alt="icon" />
            <p
              className="text-white"
              key={item.id}
              onClick={() => handleItemClick(item.name)}
            >
              {item.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
