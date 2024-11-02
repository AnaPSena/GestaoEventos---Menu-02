import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUserInfo } from "@/hooks/user";
import { useUsuario } from '@/api/usuarios';
import Link from "next/link";
import Title from "@/components/title";
import { Input } from "@/components/input";

export default function EditarSenha() {
  const router = useRouter();
  const [usuario, setUsuario] = useState({
    nome: '',
    email: '',
    perfil: 0,
    perfilDescricao: '',
    id: null,
    senha: '',
  });

  const { user } = useUserInfo();
  const { data, isLoading, error } = useUsuario(user?.nameid);

  useEffect(() => {
    if (data) {
      setUsuario({
        ...data,
        senha: '',
      });
    }
  }, [data]);

  console.log(data);

  const handleSenhaChange = (e) => {
    setUsuario({ ...usuario, senha: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!usuario.id) {
      alert('ID do usuário não encontrado.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Token de autenticação não encontrado.');

      const response = await fetch(`https://localhost:44374/api/Usuarios/${usuario.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(usuario),
      });

      if (!response.ok) {
        throw new Error('Erro ao alterar senha.');
      }

      alert('Senha alterada com sucesso!');
      router.push('/eventos');
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  if (isLoading) return <p>Carregando dados...</p>;
  if (error) return <p>{error.message || 'Erro desconhecido'}</p>; // Extraindo a mensagem de erro

  return (
    <div className="mt-10">
      <Title>Alterar senha</Title>
      <form onSubmit={handleSubmit} style={{ maxWidth: '300px', margin: '0 auto' }}>
        <div className="mb-4">
          <label>Nome:</label>
          <input
            type="text"
            value={usuario.nome}
            disabled
            style={{ display: 'block', width: '100%', marginBottom: '10px', padding: '8px' }}
            className="bg-astronaut-50 border border-astronaut-300 text-gray-900 text-sm rounded-lg focus:ring-astronaut-500 focus:border-astronaut-500 block w-full p-2.5"
          />
        </div>
        <div className="mb-4">
          <label>Email:</label>
          <input
            type="email"
            value={usuario.email}
            disabled
            style={{ display: 'block', width: '100%', marginBottom: '10px', padding: '8px' }}
            className="bg-astronaut-50 border border-astronaut-300 text-gray-900 text-sm rounded-lg focus:ring-astronaut-500 focus:border-astronaut-500 block w-full p-2.5"
          />
        </div>
        <div className="mb-4">
          <label>Perfil:</label>
          <input
            type="text"
            value={usuario.perfilDescricao}
            disabled
            style={{ display: 'block', width: '100%', marginBottom: '10px', padding: '8px' }}
            className="bg-astronaut-50 border border-astronaut-300 text-gray-900 text-sm rounded-lg focus:ring-astronaut-500 focus:border-astronaut-500 block w-full p-2.5"
          />
        </div>
        <div>
          <label>Nova Senha:</label>
          <input
            type="password"
            name="ConfirmarSenha"
            value={usuario.senha}
            onChange={handleSenhaChange}
            required
            className="bg-astronaut-50 border border-astronaut-300 text-gray-900 text-sm rounded-lg focus:ring-astronaut-500 focus:border-astronaut-500 block w-full p-2.5"
          />
        </div>
        <div className="p-2 m-8 text-center">
        <button className="bg-astronaut-800 text-white rounded-md hover:bg-pizazz-500 p-2" type="submit">Alterar senha</button>
        </div>        
      </form>
    </div>
  );
}