import { api } from "@/api/axios";
import { HTMLInputTypeAttribute, useState } from "react"
import { useForm, SubmitHandler, Path, UseFormRegister, ValidationRule } from "react-hook-form"

//TODO: Consertar o Modal
const Modal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button
        className="block text-white bg-blue-700 hover:bg-blue-800 ..."
        type="button"
        onClick={toggleModal}
      >
        Toggle modal
      </button>

      {isOpen && (
        <div
          id="popup-modal"
          className="fixed m-auto z-50 justify-center items-center w-full h-full overflow-y-auto overflow-x-hidden"
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow">
              <button
                type="button"
                className="absolute top-3 end-2.5 ..."
                onClick={toggleModal}
              >
                {/* Close Icon */}
              </button>
              <div className="p-4 text-center">
                {/* Modal Content */}
                <button
                  type="button"
                  className="text-white bg-red-600 ..."
                  onClick={() => {
                    // Handle confirm action
                    toggleModal();
                  }}
                >
                  Yes, I'm sure
                </button>
                <button
                  type="button"
                  className="..."
                  onClick={toggleModal}
                >
                  No, cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const postData = async (data: Inputs) => {
  const url = "Usuarios/register/";

  try {
    const response = await api.post(url, data);
    //TODO: Se o login acontecer com sucesso, dar um retorno para o usuário
    console.log('Response:', response.data);
  } catch (error) {
    //TODO: Se o login não acontecer com sucesso, dar um retorno para o usuário
    console.error('Error posting data:', error);
  }
};

type Inputs = {
  Nome: string
  Email: string
  Senha: string
  Perfil: number
}

//TODO: Usar o componente de Input
type InputProps = {
  label: Path<Inputs>
  register: UseFormRegister<Inputs>
  required: boolean
  type?: HTMLInputTypeAttribute
  pattern?: ValidationRule<RegExp>
  maxLength?: number
}

const Input = ({ label, register, required, type, pattern, maxLength }: InputProps) => (
  <>
    <div className="mb-10">
      <label className="block mb-2 text-sm text-gray-900">{label}</label>
      <input type={type} {...register(label, { required, pattern, maxLength })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-astronaut-500 focus:border-astronaut-500 block w-full p-2.5" />
    </div>
  </>
)

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()

  //A função onSubmit chama a API
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const user = {
      ...data,
      Perfil: Number(data.Perfil)
    }
    await postData(user)
  }

  //TODO: Verificar porque a RegExp não está funcionando
  const emailRegExp = RegExp(/[*@sga\.pucminas\.br$|.*@pucminas\.br$]/)

  //TODO: Verificar como colocar os erros do backend na lista de erros
  return (
    <>
      <div className="p-2 m-2">
        <h1>CADASTRO DE USUÁRIO</h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input label="Nome" register={register} required maxLength={30} />
        {errors.Nome && <span className="text-red-500 ml-2">O campo é obrigatório</span>}
        <Input label="Email" register={register} required type="email" pattern={emailRegExp} />
        {errors.Email && <span className="text-red-500 ml-2">O campo é obrigatório</span>}
        <Input label="Senha" register={register} required type="password" />
        {errors.Senha && <span className="text-red-500 ml-2">O campo é obrigatório</span>}
        <label htmlFor="Perfil" className="block mb-2 text-sm text-gray-900">Tipo de usuário</label>
        <select {...register("Perfil", { required: true })} id="userType" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-astronaut-500 focus:border-astronaut-500 block w-full p-2.5">
          <option value="select" disabled>Selecione o tipo de usuário</option>
          <option value="1">Professor</option>
          <option value="2">Aluno</option>
          <option value="3">Funcionário</option>
        </select>
        <div className="p-2 m-10 text-center">
          <button className="bg-astronaut-800 text-white rounded-md hover:bg-pizazz-500 p-2" type="submit">Cadastrar</button>
        </div>
      </form>
    </>
  );
}
