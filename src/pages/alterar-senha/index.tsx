import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUsuario() {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('Token de autenticação não encontrado.');

        const response = await fetch('https://localhost:44374/api/Usuarios/19', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Erro ao buscar dados do usuário: ${errorText}`);
        }
        
        const data = await response.json();
        setUsuario({
          ...data,
          senha: '', 
        });
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError('Erro ao carregar dados do usuário. Verifique se o token de autenticação está correto.');
        setLoading(false);
      }
    }

    fetchUsuario();
  }, []);

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
      router.push('/evento');
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  if (loading) return <p>Carregando dados...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Alterar Senha</h1>
      <form onSubmit={handleSubmit} style={{ maxWidth: '300px', margin: '0 auto' }}>
        <div>
          <label>Nome:</label>
          <input type="text" value={usuario.nome} disabled style={{ display: 'block', width: '100%', marginBottom: '10px', padding: '8px' }} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={usuario.email} disabled style={{ display: 'block', width: '100%', marginBottom: '10px', padding: '8px' }} />
        </div>
        <div>
          <label>Perfil:</label>
          <input type="text" value={usuario.perfilDescricao} disabled style={{ display: 'block', width: '100%', marginBottom: '10px', padding: '8px' }} />
        </div>
        <div>
          <label>Nova Senha:</label>
          <input
            type="password"
            value={usuario.senha}
            onChange={handleSenhaChange}
            required
            style={{
              display: 'block',
              width: '100%',
              marginBottom: '15px',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            backgroundColor: '#0070f3',
            color: '#fff',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Alterar Senha
        </button>
      </form>
    </div>
  );
}
