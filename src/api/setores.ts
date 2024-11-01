import { z } from "zod"
import { api, ArrayResponse } from "./axios"
import { fetcher } from "./fetcher"
import useSWR from "swr"

export type Setor = {
  id: number
  nome: string
}

export const setorSchema = z.object({
  nome: z.string().min(1, { message: "O campo nome é obrigatório" }),
})

export type SetorSchema = z.infer<typeof setorSchema>

export const createSetor = async (data: SetorSchema) => {
  const URL = "Setores/";
  const response = await api.post(URL, data);

  return response;
};

export function useSetores() {
  const URL = "/Setores"
  const { data, error, isLoading } = useSWR<ArrayResponse<Setor>>(URL, fetcher)

  return {
    data: data?.items.$values,
    error: error,
    isLoading
  }
}
