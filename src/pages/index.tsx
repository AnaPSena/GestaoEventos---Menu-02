import Head from "next/head";
import Title from "@/components/title";


export default function Home() {
  const menuShow = () => {
    // Função para lidar com a exibição do menu, você pode adicionar sua lógica aqui
    console.log("Menu button clicked");
  };

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Gestão de Eventos</title>

        {/* Estilos */}
        <link rel="stylesheet" href="/styles.css" />

        {/* Ícones */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"
          integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </Head>
      <div className="page-container">
        <div className="content">
          {/* Navbar */}
          <div className="navbar-container">
          </div>

          {/* Banner Principal */}
          <main>
        <div className="main-banner">
        <Title>Sistema agendamento eventos</Title>
        </div>
      </main>
          {/* Conteúdo Principal */}
          <div className="shrink">
            <div className="box">
              <img src="/img/puc 03.jpg" alt="PUC Minas Betim - Imagem 03" />
            </div>
            <div className="box small">
              <div className="central-banner">
                <h3>Contato do Setor de Eventos</h3>
                <h3>PUC Minas Betim</h3>
                <p>Telefone: (31) 3539-6863</p>
                <p>E-mail: betimeventos@pucminas.br</p>
                <p className="bold-text">
                  Solicitação de Eventos somente para alunos, professores e
                  funcionários da PUC Minas.
                </p>
              </div>
            </div>
            <div className="box">
              <img src="/img/puc 04.jpg" alt="PUC Minas Betim - Imagem 04" />
            </div>
          </div>
        </div>

        {/* Rodapé */}
      </div>
    </>
  );
}