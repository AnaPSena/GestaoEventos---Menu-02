// pages/cadastro.js

import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';

export default function Cadastro() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Função para mostrar/ocultar o menu
  const menuShow = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Gestão de Eventos</title>
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
              <a href="index">
                <Image
                  src="/img/logobetim.png" // Coloque a imagem na pasta 'public/img'
                  alt="Solicitação de Eventos"
                  className="logo"
                  width={100} // Defina a largura desejada
                  height={50} // Defina a altura desejada
                />
              </a>
              <div className="menu-btn">
                <i className="fa fa-bars fa-2x" onClick={menuShow}></i>
              </div>
              <ul className={isMenuOpen ? 'open' : ''}>
                <li><a href="index" className="active">Home</a></li>
                <li><a href="entrar">Entrar</a></li>
                <li><a href="cadastrar">Cadastrar</a></li>
              </ul>
            </nav>
            <main>
              <div className="main-banner">
                <h1>CADASTRO DE USUÁRIO</h1>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}