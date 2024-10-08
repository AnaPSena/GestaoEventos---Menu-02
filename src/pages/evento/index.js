// pages/events.js

import Head from 'next/head';
import Image from 'next/image';
import localFont from "next/font/local";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Events() {
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
          <div className="navbar-container">
            <nav>
              <a href="#">
                <Image
                  src="/img/logobetim.png" // Coloque a imagem na pasta 'public/img'
                  alt="Solicitação de Eventos"
                  className="logo"
                  width={100} // Defina a largura desejada
                  height={50} // Defina a altura desejada
                />
              </a>
              <ul className="navbar-items">
                <li>
                  <a href="index" className="btn-menu">Home</a>
                </li>
              </ul>
            </nav>
            <main>
              <div className="main-banner">
                <h1>Solicitação de Eventos</h1>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}