import { z } from "zod"
import { api, ArrayResponse } from "./axios"
import { fetcher } from "./fetcher"
import useSWR from "swr"

export type Local = {
  id: number
  nome: string
  prazoMinimo: number
}

export const localSchema = z.object({
  nome: z.string().min(1, { message: "O campo nome é obrigatório" }),
  prazoMinimo: z.number().min(1, { message: "O campo prazo mínimo é obrigatório" }),
})

export type LocalSchema = z.infer<typeof localSchema>

export const createLocal = async (data: LocalSchema) => {
  const URL = "Locais";
  const response = await api.post(URL, data);

  return response;
};

export function useLocais() {
  const URL = "Locais"
  const { data, error, isLoading } = useSWR<ArrayResponse<Local>>(URL, fetcher)

  return {
    data: data?.items.$values,
    error: error,
    isLoading
  }
}

export function useLocal(id: string) {
  const URL = `Locais/${id}`
  const { data, error, isLoading } = useSWR<Local>(URL, fetcher)

  return {
    data: data,
    error: error,
    isLoading
  }
}
