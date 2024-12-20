import useSWR from "swr";
import { z } from "zod";

import { api } from "./axios";
import { fetcher } from "./fetcher";

export function differenceInDays(date1: Date, date2: Date): number {
    const oneDayInMs = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
    const diffInMs = Math.abs(date1.getTime() - date2.getTime());
    return Math.floor(diffInMs / oneDayInMs);
}

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
    titulo: z.string().min(1, { message: "O título da palestra é obrigatório" }),
    palestrante: z.string().min(1, { message: "O nome do palestrante é obrigatório" }),
    local: z.string().min(1, { message: "O local é obrigatório" }),
    vagas: z.string({ message: "O número de vagas deve ser maior que zero" }),
    horarioDeInicio: z.string({ message: "O horário de início da palestra é obrigatório" }),
    horarioDeFim: z.string({ message: "O horário de fim da palestra é obrigatório" }),
    justificativa: z.string({ message: "A justificativa é obrigatória para solicitações fora do prazo mínimo de antecedência" }).optional(),
}).refine((data) => {
    const startDate = new Date(data.horarioDeInicio);
    const endDate = new Date(data.horarioDeFim);
    return endDate > startDate;
}, {
    message: "O horário de fim deve ser maior que o horário de início",
    path: ["horarioDeFim"],
}).refine((data) => {
    const value = Number(data.vagas)
    return value > 0;
}, {
    message: "O número de vagas deve ser maior que zero",
    path: ["vagas"],
})

export const infraestruturaSchema = z.object({
    temAdaptadorHDMI: z.boolean().optional(),
    qtdSuporteBanner: z.string(),
    temAguaPalestrante: z.boolean().optional(),
    temCoffeBreak: z.boolean().optional(),
    qtdMesaPlastico: z.string().optional(),
    qtdForro: z.string().optional(),
    qtdCesto: z.string().optional(),
    temEstacionamentoPalestrante: z.boolean().optional(),
    dadosPalestrante: z.string().optional(),
    outrosEquipamentos: z.string().optional(),
}).refine((data) => !(data.temEstacionamentoPalestrante && data.dadosPalestrante === ""), {
    message: "Obrigatório informar os dados do palestrante para o estacionamento",
    path: ["dadosPalestrante"]
})

export type InfraestruturaSchema = z.infer<typeof infraestruturaSchema>

export const solicitarEventoSchema = z.object({
    titulo: z.string().min(1, { message: "O título é obrigatório" }),
    //solicitante: z.string().min(1, { message: "O solicitante é obrigatório" }),
    tipoEvento: z.string({ message: "O tipo de evento é obrigatório" }),
    descricao: z.string().min(1, { message: "A descrição do evento é obrigatória" }),
    dataInicio: z.string({ message: "A data de início é obrigatória" }),
    dataFim: z.string({ message: "A data de fim é obrigatória" }),
    setor: z.string({ message: "O setor é obrigatório" }).optional(),
    curso: z.string({ message: "O curso é obrigatório" }).optional(),
    outrosCursosParticipantes: z.boolean().optional(),
    outrosCursos: z.string({ message: "Outro(s) curso(s)/unidade(s) é obrigatório" }).optional(),
    palestras: z.array(palestraSchema).min(1, { message: "É necessário adicionar no mínimo uma palestra" }),
    atividadePratica: z.boolean().optional(),
    materiais: z.string().optional(),
    emissaoCertificadoSGA: z.boolean().optional(),
    inicioInscricaoSGA: z.string().optional(),
    fimInscricaoSGA: z.string().optional(),
    infraestrutura: infraestruturaSchema,
}).refine((data) => !(data.outrosCursosParticipantes && data.outrosCursos === ""), {
    message: "Obrigatório informar curso/unidade participante",
    path: ["outrosCursos"]
}).refine((data) => !(data.emissaoCertificadoSGA && data.inicioInscricaoSGA === ""), {
    message: "Obrigatório informar o início do prazo de inscrição do SGA",
    path: ["inicioInscricaoSGA"]
}).refine((data) => !(data.emissaoCertificadoSGA && data.fimInscricaoSGA === ""), {
    message: "Obrigatório informar o fim do prazo de inscrição do SGA",
    path: ["fimInscricaoSGA"]
}).refine((data) => !(data.atividadePratica && data.materiais === ""), {
    message: "Obrigatório preencher o campo de materiais necessários para a atvidade prática",
    path: ["materiais"]
}).refine((data) => {
    const startDate = new Date(data.dataInicio);
    const endDate = new Date(data.dataFim);
    return endDate >= startDate;
}, {
    message: "A data de fim deve ser maior que a data de início",
    path: ["dataFim"],
}).refine((data) => !(data.tipoEvento === "0" && !data.curso), {
    message: "O curso é obrigatório",
    path: ["curso"]
}).refine((data) => !(data.tipoEvento === "1" && !data.setor), {
    message: "O setor é obrigatório",
    path: ["setor"]
}).refine((data) => !(data.tipoEvento === "1" && !data.setor), {
    message: "O setor é obrigatório",
    path: ["setor"]
})

export type SolicitarEventoSchema = z.infer<typeof solicitarEventoSchema>

export async function solicitarEvento(data: any) {
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
