import { useRouter } from 'next/router';
import { useForm, SubmitHandler } from 'react-hook-form';
import { login, LoginSchema } from '@/api/usuarios';
import Title from '@/components/title';
import { Input } from '@/components/input';

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>();

  const router = useRouter();

  const onSubmit: SubmitHandler<LoginSchema> = async (data) => {
    try {

      const response = await login(data)
      // Salvar o token no LocalStorage
      localStorage.setItem('token', response.data.token);

      // Redirecionar após login
      router.push('/eventos');
    } catch (error) {
      console.error('Erro no login:', error);
    }
  };

  return (
    <>
      <Title>Fazer login</Title>
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
