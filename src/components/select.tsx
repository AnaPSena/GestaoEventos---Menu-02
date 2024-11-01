import { forwardRef } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

export type Option = {
  value: string;
  key: string;
};

export type SelectProps = {
  label: string;
  options: Option[];
} & UseFormRegisterReturn;

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  function Select({ onChange, onBlur, name, label, options }, ref) {
    return (
      <>
        <label className="block mb-2 text-md font-medium text-gray-900">{label}</label>
        <select
          ref={ref}
          name={name}
          onChange={onChange}
          onBlur={onBlur}
          className="bg-astronaut-50 border border-astronaut-300 text-gray-900 text-sm rounded-lg focus:ring-astronaut-500 focus:border-astronaut-500 block w-full p-2.5"
        >
          {options.map((opt: Option) => (
            <option key={opt.value} value={opt.value}>
              {opt.key}
            </option>
          ))}
        </select>
      </>
    );
  }
);
