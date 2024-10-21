import { RegisterSchema, registerSchema, registerUser } from "@/api/usuarios";
import { Input } from "@/components/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { forwardRef, useState } from "react"
import { useForm, SubmitHandler, UseFormRegister } from "react-hook-form"


type ModalProps = {
  toggleModal: () => void,
  isOpen: boolean
}

//TODO: Consertar o Modal
const Modal = ({ toggleModal, isOpen }: ModalProps) => {
  const router = useRouter()

  return (
    <div>
      {isOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
        >
          <div className="relative p-8 w-full max-w-md max-h-full">
            <div className="relative p-4 bg-white rounded-lg shadow">
              <button type="button" onClick={() => toggleModal()} className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center">
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
                <span className="sr-only">Fechar modal</span>
              </button>
              <div className="p-4 text-center">
                <svg viewBox="0 0 24 24" className="mx-auto mb-4 w-14 h-14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M16 3.93552C14.795 3.33671 13.4368 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 11.662 20.9814 11.3283 20.9451 11M21 5L12 14L9 11" stroke="#26a269" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g>
                </svg>
                <p className="mb-4">Cadastro realizado com sucesso!</p>
                <button className="bg-astronaut-800 text-white rounded-md hover:bg-pizazz-500 p-2" type="button"
                  onClick={() => {
                    toggleModal()
                    router.push("/entrar")
                  }}
                >Entrar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

type Option = {
  value: string
  key: string
}
// you can use React.forwardRef to pass the ref too
const Select = forwardRef<
  HTMLSelectElement,
  { label: string, options: Option[] } & ReturnType<UseFormRegister<RegisterSchema>>
>(({ onChange, onBlur, name, label, options }, ref) => (
  <>
    <label className="block mb-2 text-md font-medium text-gray-900">{label}</label>
    <select name={name} ref={ref} onChange={onChange} onBlur={onBlur} className="bg-astronaut-50 border border-astronaut-300 text-gray-900 text-sm rounded-lg focus:ring-astronaut-500 focus:border-astronaut-500 block w-full p-2.5">
      {options.map(opt => (
        <option key={opt.value} value={opt.value}>
          {opt.key}
        </option>
      ))}
    </select>
  </>
))

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema)
  })

  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  //A função onSubmit chama a API
  const onSubmit: SubmitHandler<RegisterSchema> = async (data) => {
    console.log(data)

    try {
       await registerUser(data)
       setIsOpen(true)
    } catch (e) {
    }
  }

  const opts: Option[] = [
    { key: "Professor", value: "1" },
    { key: "Aluno", value: "2" },
    { key: "Funcionário", value: "3" },
  ]

  return (
    <>
      <div className="p-2 m-2">
        <h1 className="text-2xl text-center">CADASTRO DE USUÁRIO</h1>
      </div>
      <button onClick={toggleModal}>Modal</button>
      <Modal toggleModal={toggleModal} isOpen={isOpen} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <Input label="Nome" path="Nome" placeholder="Ex: João" register={register} required />
          {errors.Nome && <span className="text-red-500 text-sm">{errors.Nome.message}</span>}
        </div>
        <div className="mb-4">
          <Input label="E-mail" path="Email" placeholder="Ex: joao@pucminas.br" register={register} required type="email" />
          {errors.Email && <span className="text-red-500 text-sm">{errors.Email.message}</span>}
        </div>
        <div className="mb-4">
          <Input label="Senha" path="Senha" register={register} required type="password" />
          {errors.Senha && <span className="text-red-500 text-sm">{errors.Senha.message}</span>}
        </div>
        <div className="mb-4">
          <Input label="Confirmar a senha" path="ConfirmarSenha" register={register} type="password" />
          {errors.ConfirmarSenha && <span className="text-red-500 text-sm">{errors.ConfirmarSenha.message}</span>}
        </div>
        <div className="mb-4">
          <Select label="Tipo de usuário" {...register("Perfil", { required: true })} options={opts} />
          {errors.Perfil && <span className="text-red-500 text-sm">{errors.Perfil.message}</span>}
        </div>
        <div className="p-2 m-10 text-center">
          <button className="bg-astronaut-800 text-white rounded-md hover:bg-pizazz-500 p-2" type="submit">Cadastrar</button>
        </div>
      </form>
    </>
  );
}
