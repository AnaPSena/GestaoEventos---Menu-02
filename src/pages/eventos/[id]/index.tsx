import { useEvento } from "@/api/eventos";
import Title from "@/components/title";
import { useParams } from "next/navigation"

export default function Evento() {
  const params = useParams<{ id: string }>();
  const { data, error, isLoading } = useEvento(params.id)

  return (
    <>
      {error && <div>Falha ao carregar eventos, por favor, tente novamente mais tarde.</div>}
      {isLoading && <div>Carregando dados...</div>}
      {data &&
        <>
          <Title>{`Evento: ${data?.titulo}`}</Title>
        </>
      }
    </>
  )
}
