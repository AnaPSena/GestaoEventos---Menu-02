import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useForm, SubmitHandler } from 'react-hook-form';

type Inputs = {
  Email: string;
  Senha: string;
}

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const router = useRouter();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = await axios.post('https://localhost:44374/api/Usuarios/login', {
        email: data.Email,
        senha: data.Senha,
      });

      // Salvar o token no LocalStorage
      localStorage.setItem('token', response.data.token);

      // Redirecionar após login
      router.push('/evento');
    } catch (error) {
      console.error('Erro no login:', error);
    }
  };

  return (
    <div className="page-container">
      <h1>Gestão de Eventos</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3>Login</h3>
        <div className="mb-10">
          <label className="block mb-2 text-sm text-gray-900">Email</label>
          <input
            type="email"
            {...register('Email', { required: true })}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-astronaut-500 focus:border-astronaut-500 block w-full p-2.5"
          />
          {errors.Email && <span className="text-red-500 ml-2">O campo é obrigatório</span>}
        </div>

        <div className="mb-10">
          <label className="block mb-2 text-sm text-gray-900">Senha</label>
          <input
            type="password"
            {...register('Senha', { required: true })}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-astronaut-500 focus:border-astronaut-500 block w-full p-2.5"
          />
          {errors.Senha && <span className="text-red-500 ml-2">O campo é obrigatório</span>}
        </div>

        <div className="p-2 m-10 text-center">
          <button className="bg-astronaut-800 text-white rounded-md hover:bg-pizazz-500 p-2" type="submit">
            Entrar
          </button>
        </div>
      </form>
    </div>
  );
}