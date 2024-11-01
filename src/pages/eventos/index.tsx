import { Evento, useEventosPorUsuario } from "@/api/eventos"
import { useUserInfo } from "@/hooks/user"
import { simpleDate } from "@/utils/string"
import Link from "next/link"

type RowProps = {
  data: Evento
}

const Row = ({ data }: RowProps) => (
  <tr className="bg-white border-b hover:bg-gray-50">
    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
      {data.titulo}
    </th>
    <td className="px-6 py-4">
      {data.tipoEvento === 1 ? "Graduação" : "Institucional"}
    </td>
    <td className="px-6 py-4">
      {`De ${simpleDate(data.dataInicio.toString())} até ${simpleDate(data.dataFim.toString())}`}
    </td>

    <td className="px-6 py-4">
      <div className="justify-between">
        <Link className="w-8 h-8 block rounded border-astronaut-500 hover:bg-pizazz-600 md:border-0 md:p-2" href={`/eventos/${data.id}`} type="button">
          <svg className="w-5 h-5 text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z" />
          </svg>
        </Link>
      </div>
    </td>
  </tr>
)

type TableProps = {
  data: Evento[]
}

const Table = ({ data }: TableProps) => {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-white uppercase bg-astronaut-900">
          <tr>
            <th scope="col" className="px-6 py-3">
              Título
            </th>
            <th scope="col" className="px-6 py-3">
              Tipo de evento
            </th>
            <th scope="col" className="px-6 py-3">
              Data
            </th>
            <th scope="col" className="px-6 py-3">
              Ações
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => <Row key={item.id} data={item} />)}
        </tbody>
      </table>
    </div>
  )
}

export default function Eventos() {
  const { user } = useUserInfo()
  const { data, error, isLoading } = useEventosPorUsuario(user?.nameid)
  console.log(user)

  return (
    <>
      <h1 className="text-center m-4 text-xl uppercase font-bold text-astronaut-900">Minhas solicitações de evento</h1>
      {error && <div>Falha ao carregar eventos, por favor, tente novamente mais tarde.</div>}
      {isLoading && <div>Carregando dados...</div>}
      {data && <Table data={data.$values || []} />}
      <div className="mt-10">
        <Link className="py-2 px-3 text-white text-center rounded bg-astronaut-900 hover:bg-pizazz-600 md:border-0 md:p-2" href={`/eventos/solicitar`}>
          Solicitar novo evento
        </Link>
      </div>
      <div className="mt-10">
        <Link className="py-2 px-3 text-white text-center rounded bg-astronaut-900 hover:bg-pizazz-600 md:border-0 md:p-2" href={`/alterar-senha`}>
          Alterar Senha
        </Link>
      </div>
    </>
  )
}
