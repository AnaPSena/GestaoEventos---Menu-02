import Link from "next/link";
import Image from "next/image";
import { useRouter } from 'next/router';

type ItemProps = {
  href: string,
  display: string
}

function Item(props: ItemProps) {
  return (
    <li><Link className="block py-2 px-3 text-white rounded hover:bg-pizazz-600 md:border-0 md:p-2" href={props.href}>{props.display}</Link></li>
  );
}

export function Navbar() {
  const router = useRouter();

  // Função de Sair
  const handleLogout = () => {
    // Remover o token do localStorage ou cookies
    localStorage.removeItem('token');
    // Redirecionar para a página de login
    router.push('/entrar');
  };

  return (
    <>
      <div className="w-full items-center justify-between pb-2">
        <Image className="mx-auto" src="/img/logo.png" width={150} height={150} alt="Logo PUCMinas Betim"></Image>
      </div>
      <div>
        <nav className="bg-astronaut-900">
          <div className="max-w-screen-xl flex flex-wrap items-center justify-end mx-auto p-4">
            <div className="hidden w-full md:block md:w-auto" id="navbar-default">
              <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-astronaut-900">
                <Item href="/" display="Home" />
                <Item href="/cadastrar" display="Cadastro" />
                <Item href="/entrar" display="Entrar" />
                {/* Botão de Sair */}
                <li>
                  <button onClick={handleLogout} className="block py-2 px-3 text-white rounded hover:bg-pizazz-600 md:border-0 md:p-2">
                    Sair
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}

