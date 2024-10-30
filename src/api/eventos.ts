import useSWR from "swr";
import { fetcher } from "./fetcher";
import { optional, z } from "zod";
import { api } from "./axios";

export type Evento = {
    id: number,
    titulo: string,
    solicitante: number,
    tipoEvento: number,
    local: number,
    descricao: string,
    dataInicio: Date,
    dataFim: Date,
    setor?: number,
    curso?: number,
    outrosCursosPariticpantes: boolean,
    atividadePratica: string,
    materiais: string,
    emissaoCertificadoSGA: boolean
}

export const palestraSchema = z.object({
    horarioDeInicio: z.date(),
    horarioDeFim: z.date(),
    titulo: z.string().min(1, { message: "O título é obrigatório" }),
    palestrante: z.string().min(1, { message: "O nome do palestrante é obrigatório" }),
    vagas: z.number().min(1, { message: "O número de vagas deve ser maior que zero" })
})

export const solicitarEventoSchema = z.object({
    titulo: z.string().min(1, { message: "O título é obrigatório" }),
    //solicitante: z.number().min(1, { message: "O solicitante é obrigatório" }),
    tipoEvento: z.string({ message: "O tipo de evento é obrigatório" }),
    //local: z.number().min(1, { message: "O local é obrigatório" }),
    descricao: z.string().min(1, { message: "A descrição do evento é obrigatória" }),
    dataInicio: z.string({ message: "A data de início é obrigatória" }),
    dataFim: z.string({ message: "A data de fim é obrigatória" }),
    setor: z.string({ message: "O setor é obrigatório" }).optional(),
    curso: z.string({ message: "O curso é obrigatório" }).optional(),
    outrosCursosParticipantes: z.boolean().optional(),
    outrosCursos: z.string({ message: "Outro(s) curso(s)/unidade(s) é obrigatório" }).optional(),
    //palestras: z.array(palestraSchema).min(1, { message: "É necessário adicionar no mínimo uma palestra" }),
    //atividadePratica: z.string(),
    //materiais: z.string(),
    emissaoCertificadoSGA: z.boolean().optional(),
    prazoInscricaoSGA: z.string().optional()
}).refine((data) => !(data.outrosCursosParticipantes && data.outrosCursos === ""), {
    message: "Obrigatório informar curso/unidade participante",
    path: ["outrosCursos"]
}).refine((data) => !(data.emissaoCertificadoSGA && data.prazoInscricaoSGA === ""), {
    message: "Obrigatório informar o prazo de inscrição do SGA",
    path: ["prazoInscricaoSGA"]
}).refine((data) => {
    const startDate = new Date(data.dataInicio);
    const endDate = new Date(data.dataFim);
    return endDate > startDate; // Ensure dataFim is after dataInicio
}, {
    message: "A data de fim deve ser maior que a data de início",
    path: ["dataFim"], // Specify the field to attach the error to
}).refine((data) => !(data.tipoEvento === "0" && !data.curso), {
    message: "O curso é obrigatório",
    path: ["curso"] // You can specify which field(s) to show the error on
}).refine((data) => !(data.tipoEvento === "1" && !data.setor), {
    message: "O setor é obrigatório",
    path: ["setor"] // You can specify which field(s) to show the error on
})


export type SolicitarEventoSchema = z.infer<typeof solicitarEventoSchema>

export async function solicitarEvento(data: SolicitarEventoSchema) {
    const URL = "Eventos/register"
    const response = await api.post(URL, data);

    return response;
}

export function useEventos() {
    const URL = "/Eventos"
    const { data, error, isLoading } = useSWR<Evento[]>(URL, fetcher)

    return {
        data: data,
        error: error,
        isLoading
    }
}

export function useEventosPorUsuario(usuario: string) {
    const URL = `/Eventos/Usuario/${usuario}`
    const { data, error, isLoading } = useSWR<{ $values: Evento[] }>(URL, fetcher)

    return {
        data: data,
        error: error,
        isLoading
    }
}

export function useEvento(id: string) {
    const URL = `/Eventos/${id}`
    const { data, error, isLoading } = useSWR<Evento>(URL, fetcher)

    return {
        data: data,
        error: error,
        isLoading
    }
}
