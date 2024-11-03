import { Evento, useEventosPorUsuario } from "@/api/eventos"
import { useUserInfo } from "@/hooks/user"
import { simpleDate } from "@/utils/string"
import Link from "next/link"

const EmptyCard = () => {
  return (
    <div className="flex justify-center mx-auto items-center">
      <div className="max-w-lg p-6 bg-white border border-astrounaut-200 rounded-lg shadow">
        <svg className="w-8 h-8 text-astronaut-900 mx-auto" viewBox="0 0 312 312" xmlns="http://www.w3.org/2000/svg">
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            <g id="empty_inbox" data-name="empty inbox" transform="translate(-2956.982 -3048.416)">
              <path id="Path_26" data-name="Path 26" d="M3268.982,3078.286a29.869,29.869,0,0,0-29.869-29.87H2986.851a29.869,29.869,0,0,0-29.869,29.87v252.259a29.87,29.87,0,0,0,29.869,29.871h252.262a29.87,29.87,0,0,0,29.869-29.871Zm-281.9-4.87H3239.3a5.378,5.378,0,0,1,5.684,5.268v141.732h-73.54a12.038,12.038,0,0,0-12.114,12.025,47.854,47.854,0,0,1-95.668,1.918,11.273,11.273,0,0,0,.162-1.906,12.049,12.049,0,0,0-12.116-12.037h-70.724V3078.684C2980.982,3075.574,2983.97,3073.416,2987.08,3073.416Zm252.218,263H2987.08c-3.11,0-6.1-2.4-6.1-5.514v-86.486h59.426a72.092,72.092,0,0,0,142.13,0h62.444V3330.9A5.577,5.577,0,0,1,3239.3,3336.416Z" fill="currentColor"></path>
            </g>
          </g>
        </svg>
        <h5 className="my-2 text-xl font-semibold tracking-tight text-astronaut-900 text-center">Você ainda não possui nenhuma solicitação de evento!</h5>
        <p className="mb-3 font-normal text-gray-500 dark:text-gray-700">Para abrir uma nova solicitação, acesse o formulário através do botão "Solicitar novo evento" abaixo.</p>
      </div>
    </div>
  )
}

type RowProps = {
  data: Evento
}

const Row = ({ data }: RowProps) => (
  <tr className="bg-white border-b hover:bg-gray-50">
    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
      {data.titulo}
    </th>
    <td className="px-6 py-4">
      {data.tipoEvento === 0 ? "Graduação" : "Institucional"}
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
      {isLoading &&

        <div className="flex items-center justify-center w-56 h-56 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
          <div role="status">
            <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
            <span className="sr-only">Carregando...</span>
          </div>
        </div>
      }
      {data && data.$values.length ? <Table data={data.$values} /> : <EmptyCard />}
      <div className="flex items-center justify-center p-4">
        <div className="mt-10 mx-2">
          <Link className="py-2 px-3 text-white text-center rounded bg-astronaut-900 hover:bg-pizazz-600 md:border-0 md:p-2" href={`/eventos/solicitar`}>
            Solicitar novo evento
          </Link>
        </div>
        <div className="mt-10 mx-2">
          <Link className="py-2 px-3 text-white text-center rounded bg-astronaut-900 hover:bg-pizazz-600 md:border-0 md:p-2" href={`/alterar-senha`}>
            Alterar senha
          </Link>
        </div>
      </div>
    </>
  )
}
