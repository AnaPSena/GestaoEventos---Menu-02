import Head from "next/head";

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
            <nav>
              <a href="/">
                <img
                  src="/img/logobetim.png"
                  alt="Solicitação de Eventos"
                  className="logo"
                />
              </a>
              <div className="menu-btn" onClick={menuShow}>
                <i className="fa fa-bars fa-2x"></i>
              </div>
              <ul>
                <li>
                  <a href="/" className="active">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/entrar">Entrar</a>
                </li>
                <li>
                  <a href="/cadastrar">Cadastrar</a>
                </li>
              </ul>
            </nav>
          </div>

          {/* Banner Principal */}
          <main>
            <div className="main-banner">
              <h1>SOLICITAÇÃO DE EVENTOS</h1>
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
        <footer className="site-footer">
          <p>&copy; 2024</p>
          <p>
            Criado por grupo de alunos do Curso de Sistemas de Informação da PUC
            Minas Virtual
          </p>
        </footer>
      </div>
    </>
  );
}
