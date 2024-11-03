import { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm, SubmitHandler } from 'react-hook-form';
import { login, LoginSchema } from '@/api/usuarios';
import Title from '@/components/title';
import { Input } from '@/components/input';

type ModalProps = {
  toggleModal: () => void,
  isOpen: boolean
}

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
                <svg className="w-14 h-14 text-red-500 mx-auto mb-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 13V8m0 8h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                <p className="mb-4">Login e/ou senha incorretos, por favor tente novamente.</p>
                <button className="bg-astronaut-800 text-white rounded-md hover:bg-pizazz-500 p-2" type="button"
                  onClick={() => {
                    toggleModal()
                    router.push("/entrar")
                  }}
                >Fechar</button>
              </div>
            </div>
          </div>
        </div>
      )
      }
    </div >
  );
};
export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>();
  
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen)
  }

  const onSubmit: SubmitHandler<LoginSchema> = async (data) => {
    try {
      const response = await login(data);

      localStorage.setItem('token', response.data.token);

      router.push('/eventos');
    } catch (error) {
      setIsOpen(true);
    }
  };

  return (
    <>
      <Title>Fazer login</Title>
      <Modal toggleModal={toggleModal} isOpen={isOpen} />
      <div className='w-80 mx-auto'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-10">
            <Input label="E-mail" path="Email" register={register} required type="email" />
            {errors.Email && <span className="text-red-500 ml-2">O campo é obrigatório</span>}
          </div>
          <div className="mb-10">
            <Input label="Senha" path="Senha" register={register} required type="password" />
            {errors.Senha && <span className="text-red-500 ml-2">O campo é obrigatório</span>}
          </div>

          <div className="p-2 m-10 text-center">
            <button className="bg-astronaut-800 text-white rounded-md hover:bg-pizazz-500 p-2" type="submit">
              Entrar
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
