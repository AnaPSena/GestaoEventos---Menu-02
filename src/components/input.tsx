import { forwardRef, HTMLInputTypeAttribute } from "react"
import { FieldValues, Path, UseFormRegister, ValidationRule } from "react-hook-form"

type InputProps<T extends FieldValues> = {
  label: string
  placeholder?: string
  path: Path<T>
  register: UseFormRegister<T>
  required?: boolean
  type?: HTMLInputTypeAttribute
  pattern?: ValidationRule<RegExp>
  maxLength?: number
}

export const Input = <T extends FieldValues>({ label, placeholder, path, register, required, type, pattern, maxLength }: InputProps<T>) => (
  <>
    <label className="block mb-2 text-md text-gray-900">{label}</label>
    <input
      type={type}
      placeholder={placeholder}
      {...register(path, { required, pattern, maxLength })}
      className="bg-astronaut-50 border border-astronaut-300 text-gray-900 text-sm rounded-lg focus:ring-astronaut-500 focus:border-astronaut-500 block w-full p-2.5" />
  </>
)



type ControlledInputProps<T extends FieldValues> = {
  label: string;
  placeholder?: string;
  name: Path<T>;
  required?: boolean;
  type?: React.HTMLInputTypeAttribute;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  maxLength?: number;
};

export const ControlledInput = forwardRef<HTMLInputElement, ControlledInputProps<any>>(
  function Input(
    { label, placeholder, required, type = 'text', value, onChange, onBlur, maxLength, name },
    ref
  ) {
    return (
      <>
        <label className="block mb-2 text-md text-gray-900">{label}</label>
        <input
          ref={ref}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value || ''}
          onChange={onChange}
          onBlur={onBlur}
          required={required}
          maxLength={maxLength}
          className="bg-astronaut-50 border border-astronaut-300 text-gray-900 text-sm rounded-lg focus:ring-astronaut-500 focus:border-astronaut-500 block w-full p-2.5"
        />
      </>
    );
  }
);
