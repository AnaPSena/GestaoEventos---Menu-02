// import { Evento, useEventos } from "@/api/eventos";
import Head from "next/head";

export default function Home() {
  //const { data, error, isLoading } = useEventos()
  //
  //if (error) return <div>failed to load</div>
  //if (isLoading) return <div>loading...</div>
  //console.log(data);

  return (
    <>
      <Head>
        <title>Home - Gestão de Eventos PUCMinas Betim</title>
        <meta name="description" content="Home" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="">
        <h1 className="text-2xl font-bold uppercase">Solicitação de Eventos</h1>
      </div>
    </>
  );
}
