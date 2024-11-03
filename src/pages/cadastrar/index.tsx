import { RegisterSchema, registerSchema, registerUser } from "@/api/usuarios";
import { Input } from "@/components/input";
import { Option, Select } from "@/components/select";
import Title from "@/components/title";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"


type ModalProps = {
  toggleModal: () => void,
  isOpen: boolean
  condition: "success" | "error" | undefined
}

const Modal = ({ toggleModal, isOpen, condition }: ModalProps) => {
  const router = useRouter()

  if (!condition) {
    return
  }

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
                {condition === "success" &&
                  <>
                    <svg viewBox="0 0 24 24" className="mx-auto mb-4 w-14 h-14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                      <g id="SVGRepo_iconCarrier">
                        <path d="M16 3.93552C14.795 3.33671 13.4368 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 11.662 20.9814 11.3283 20.9451 11M21 5L12 14L9 11" stroke="#26a269" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                      </g>
                    </svg>
                    <p className="mb-4">Cadastro realizado com sucesso!</p>
                    <button className="bg-astronaut-800 text-white rounded-md hover:bg-pizazz-500 p-2" type="button"
                      onClick={() => {
                        toggleModal()
                        router.push("/entrar")
                      }}
                    >Entrar</button>
                  </>
                }
                {condition === "error" &&
                  <>
                    <svg viewBox="0 0 24 24" className="mx-auto mb-4 w-14 h-14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                      <g id="SVGRepo_iconCarrier">
                        <path d="M16 3.93552C14.795 3.33671 13.4368 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 11.662 20.9814 11.3283 20.9451 11M21 5L12 14L9 11" stroke="#26a269" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                      </g>
                    </svg>
                    <p className="mb-4">Algo deu errado!</p>
                    <button className="bg-astronaut-800 text-white rounded-md hover:bg-pizazz-500 p-2" type="button"
                      onClick={() => {
                        toggleModal()
                      }}
                    >Fechar</button>
                  </>
                }
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema)
  })

  const [isOpen, setIsOpen] = useState(false);
  const [condition, setCondition] = useState<"success" | "error">();

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const onSubmit: SubmitHandler<RegisterSchema> = async (data) => {
    try {
      await registerUser(data)
      setCondition("success");
      setIsOpen(true)
    } catch (e) {
      setCondition("error");
      setIsOpen(true)
    }
  }

  const opts: Option[] = [
    { key: "Professor", value: "1" },
    { key: "Aluno", value: "2" },
    { key: "Funcionário", value: "3" },
  ]

  return (
    <>
      <Title>Cadastro de usuário</Title>
      <Modal toggleModal={toggleModal} isOpen={isOpen} condition={condition} />
      <div className="p-4 mx-10">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
              <Input label="Nome" path="Nome" placeholder="Ex: João" register={register} required />
              {errors.Nome && <span className="text-red-500 text-sm">{errors.Nome.message}</span>}
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <Input label="E-mail" path="Email" placeholder="Ex: joao@pucminas.br" register={register} required type="email" />
              {errors.Email && <span className="text-red-500 text-sm">{errors.Email.message}</span>}
            </div>
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
              <Input label="Senha" path="Senha" register={register} required type="password" />
              {errors.Senha && <span className="text-red-500 text-sm">{errors.Senha.message}</span>}
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <Input label="Confirmar a senha" path="ConfirmarSenha" register={register} type="password" />
              {errors.ConfirmarSenha && <span className="text-red-500 text-sm">{errors.ConfirmarSenha.message}</span>}
            </div>
          </div>
          <div className="mb-5">
            <Select label="Tipo de usuário" {...register("Perfil", { required: true })} options={opts} />
            {errors.Perfil && <span className="text-red-500 text-sm">{errors.Perfil.message}</span>}
          </div>
          <div className="p-2 m-10 text-center">
            <button className="bg-astronaut-800 text-white rounded-md hover:bg-pizazz-500 p-2" type="submit">Cadastrar</button>
          </div>
        </form>
      </div>
    </>
  );
}
