import { FieldValues, Path, UseFormRegister } from "react-hook-form"

type InputProps<T extends FieldValues> = {
  label: string
  placeholder?: string
  path: Path<T>
  register: UseFormRegister<T>
  required?: boolean
}

export const Checkbox = <T extends FieldValues>({ label, path, register, required }: InputProps<T>) => (
  <>
    <label className="block mb-2 text-md text-gray-900">{label}</label>
    <input type="checkbox" {...register(path, { required })} className="w-5 h-5 text-astronaut-900 bg-gray-100 border-astronaut-500 rounded focus:ring-blue-500 dark:focus:ring-astronaut-900 dark:ring-offset-astronaut-800 focus:ring-2 dark:bg-gray-700 dark:border-astronaut-600" />
  </>
)

