import { forwardRef, useEffect, useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';


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

type ControlledSelectProps = {
  name: string;
  label: string;
  options: Option[];
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};
export const ControlledSelect = forwardRef<HTMLSelectElement, ControlledSelectProps>(
  function Select({ name, label, options, value, onChange }, ref) {
    // Internal state to manage controlled value
    const [internalValue, setInternalValue] = useState(value || '');
    // Sync internal state with external value
    useEffect(() => {
      if (value !== undefined) {
        setInternalValue(value);
      }
    }, [value]);
    // Handle changes and call onChange prop
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setInternalValue(event.target.value);
      if (onChange) {
        onChange(event);
      }
    };
    return (
      <>
        <label className="block mb-2 text-md font-medium text-gray-900">{label}</label>
        <select
          ref={ref}
          name={name}
          value={internalValue}
          onChange={handleChange}
          className="bg-astronaut-50 border border-astronaut-300 text-gray-900 text-sm rounded-lg focus:ring-astronaut-500 focus:border-astronaut-500 block w-full p-2.5"
        >
          {options.map((opt) => (
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