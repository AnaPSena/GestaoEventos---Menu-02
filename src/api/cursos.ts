import { z } from "zod"
import { api, ArrayResponse } from "./axios"
import { fetcher } from "./fetcher"
import useSWR from "swr"

export type Curso = {
  id: number
  nome: string
}

export const cursoSchema = z.object({
  nome: z.string().min(1, { message: "O campo nome é obrigatório" }),
})

export type CursoSchema = z.infer<typeof cursoSchema>

export const createCurso = async (data: CursoSchema) => {
  const URL = "Cursos/";
  const response = await api.post(URL, data);

  return response;
};

export function useCursos() {
  const URL = "/Cursos"
  const { data, error, isLoading } = useSWR<ArrayResponse<Curso>>(URL, fetcher)

  return {
    data: data?.items.$values,
    error: error,
    isLoading
  }
}
