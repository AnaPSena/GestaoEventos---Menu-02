import { HTMLInputTypeAttribute } from "react"
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
    <input type={type} placeholder={placeholder} {...register(path, { required, pattern, maxLength })} className="bg-astronaut-50 border border-astronaut-300 text-gray-900 text-sm rounded-lg focus:ring-astronaut-500 focus:border-astronaut-500 block w-full p-2.5" />
  </>
)

