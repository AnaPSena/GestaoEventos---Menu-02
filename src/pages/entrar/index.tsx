import { useRouter } from 'next/router';
import { useForm, SubmitHandler } from 'react-hook-form';
import { login, LoginSchema } from '@/api/usuarios';
import Title from '@/components/title';
import { Input } from '@/components/input';
import { useState } from 'react';

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>();
  
  const [showError, setShowError] = useState(false); // Controla a exibição do pop-up de erro
  const router = useRouter();

  const onSubmit: SubmitHandler<LoginSchema> = async (data) => {
    try {
      const response = await login(data);
      
      // Salvar o token no LocalStorage
      localStorage.setItem('token', response.data.token);

      // Redirecionar após login
      router.push('/eventos');
    } catch (error) {
      console.error('Erro no login:', error);
      setShowError(true); // Exibe o pop-up em caso de erro
    }
  };

  return (
    <>
      <Title>Fazer login</Title>

      {/* Condicional para exibir o pop-up de erro */}
      {showError && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded shadow-lg text-center">
            <p className="text-red-500 font-semibold">Senha incorreta</p>
            <button
              className="mt-4 bg-astronaut-800 text-white rounded-md hover:bg-pizazz-500 p-2"
              onClick={() => setShowError(false)} // Fecha o pop-up
            >
              Fechar
            </button>
          </div>
        </div>
      )}

      <div className="w-80 mx-auto">
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
