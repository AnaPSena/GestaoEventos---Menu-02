import useSWR from "swr";
import { fetcher } from "./fetcher";

//const BASE_URL = `${process.env.API_URL}/Eventos`
const BASE_URL = `https://localhost:7260/api/Eventos`

export type Evento = {
    Id: number,
    Titulo: string
}

export function useEventos() {
    const { data, error, isLoading } = useSWR(BASE_URL, fetcher)

    return {
        data: data,
        error: error,
        isLoading
    }
}
