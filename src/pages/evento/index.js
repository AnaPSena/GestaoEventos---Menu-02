import Image from 'next/image';
import styles from '../../styles/evento.module.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Evento() {
  const [showSetor, setShowSetor] = useState(false);
  const [showCurso, setShowCurso] = useState(false);
  const [showOutroCurso, setShowOutroCurso] = useState(false);
  const [showCertificados, setShowCertificados] = useState(false);
  const router = useRouter();

  // Função para buscar dados da rota protegida
  const fetchData = async () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      // Se não houver token, redireciona para a página de login
      router.push('/entrar');
      return;
    }

    try {
      const response = await axios.get('http://localhost:3000/evento', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log('Dados protegidos:', response.data);
    } catch (error) {
      console.error('Erro ao buscar dados protegidos:', error);
      // Em caso de erro, redireciona para a página de login
      router.push('/entrar');
    }
  };

  // useEffect para executar a função de busca de dados protegidos ao carregar a página
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.content}>
        <div className={styles.navbarContainer}>
          <nav>
            <a href="/">
              <Image
                src="/img/logobetim.png"
                alt="Solicitação de Eventos"
                width={150}
                height={50}
                className={styles.logo}
              />
            </a>
            <div className={styles.menuBtn}>
              <i className="fa fa-bars fa-2x" onClick={() => {}}></i>
            </div>
            <ul>
              <li><a href="/" className={styles.active}>Home</a></li>
              <li><a href="/entrar">Entrar</a></li>
              <li><a href="/cadastrar">Cadastrar</a></li>
            </ul>
          </nav>
        </div>

        <div className={styles.containerForm}>
          <form className={styles.eventoForm}>
            {/* Nome e descrição do evento */}
            <p>
              Nome do Evento:
              <input type="text" name="nomeEvento" id="nomeEvento" />
            </p>
            <p>Descrição: <input type="text" name="descricao" id="desc" /></p>

            {/* Detalhes do evento */}
            <div className={styles.eventDetails}>
              <p>
                Data de Início:
                <input type="date" name="dataInicio" id="dataInicio" />
              </p>
              <p>
                Data de Fim: <input type="date" name="dataFim" id="dataFim" />
              </p>
              <p>
                Tipo de Evento:
                <select id="tipoEvento" name="tipoEvento" onChange={() => {}}>
                  <option value="" disabled selected>Selecione o tipo de evento</option>
                  <option value="institucional">Institucional (Setores PUC Betim)</option>
                  <option value="graduacao">Graduação (Cursos PUC Betim)</option>
                </select>
              </p>
            </div>

            {/* Campos adicionais como seleção de curso/setor serão controlados por useState */}
            {showCurso && (
              <p id="cursoResponsavel">
                Curso Responsável:
                <select id="curso" name="curso">
                  <option value="" disabled selected>Selecione o curso</option>
                  <option value="curso01">Administração</option>
                  <option value="curso02">Biomedicina</option>
                  <option value="curso03">Direito manhã</option>
                </select>
              </p>
            )}

            <div className={styles.btnEnviarContainer}>
              <button type="submit" className={styles.btnEnviar}>Enviar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}