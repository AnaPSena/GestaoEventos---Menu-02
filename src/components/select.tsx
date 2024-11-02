import { forwardRef } from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';

export type Option = {
  value: string;
  key: string;
};

export type SelectProps = {
  label: string;
  options: Option[];
} & ReturnType<UseFormRegister<T>>;


export const Select = forwardRef<HTMLSelectElement, SelectProps<any>>(
  function Select({ onChange, onBlur, label, options }, ref) {
    return (
      <>
        <label className="block mb-2 text-md font-medium text-gray-900">{label}</label>
        <select
          ref={ref}
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

Select.displayName = 'Select';