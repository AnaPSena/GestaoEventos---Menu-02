import { z } from "zod"
import { api, ArrayResponse } from "./axios"
import { fetcher } from "./fetcher"
import useSWR from "swr"

export type Palestra = {
  id: number
  nome: string
  local: number
  vagas: number
  dataInicio: Date
  dataFim: Date
}

export const palestraSchema = z.object({
  nome: z.string().min(1, { message: "O campo nome é obrigatório" }),
  local: z.number().min(1, { message: "O campo local é obrigatório" }),
  vagas: z.number().min(1, { message: "O campo vagas é obrigatório" }),
  dataInicio: z.date({ message: "O campo data de início é obrigatório" }),
  dataFim: z.date({ message: "O campo data de fim é obrigatório" }),
})

export type PalestraSchema = z.infer<typeof palestraSchema>

export const createPalestra = async (data: PalestraSchema) => {
  const URL = "Palestras/";
  const response = await api.post(URL, data);

  return response;
};

export function usePalestras() {
  const URL = "/Palestras"
  const { data, error, isLoading } = useSWR<ArrayResponse<Palestra>>(URL, fetcher)

  return {
    data: data?.items.$values,
    error: error,
    isLoading
  }
}
