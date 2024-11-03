import { useRouter } from 'next/router';
import { Controller, FieldErrors, SubmitHandler, useFieldArray, useForm, UseFormRegister, UseFormWatch } from 'react-hook-form';
import { useUserInfo } from '@/hooks/user';
import Title from '@/components/title';
import { differenceInDays, solicitarEvento, solicitarEventoSchema, SolicitarEventoSchema } from '@/api/eventos';
import { ControlledInput, Input } from '@/components/input';
import { useSetores } from '@/api/setores';
import { useCursos } from '@/api/cursos';
import { Local, useLocais, useLocal } from '@/api/locais';
import { ControlledSelect, Option, Select } from '@/components/select';
import { TextArea } from '@/components/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { Checkbox } from '@/components/checkbox';

type PalestraRowProps = {
  control: any;
  index: number;
  remove: (index: number) => void;
  errors: FieldErrors<SolicitarEventoSchema>
  register: UseFormRegister<SolicitarEventoSchema>
  locais: Local[]
  watch: UseFormWatch<SolicitarEventoSchema>
};

type ModalProps = {
  toggleModal: () => void,
  isOpen: boolean
}

const Modal = ({ toggleModal, isOpen }: ModalProps) => {
  const router = useRouter()

  return (
    <div>
      {isOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
        >
          <div className="relative p-8 w-full max-w-md max-h-full">
            <div className="relative p-4 bg-white rounded-lg shadow">
              <button type="button" onClick={() => toggleModal()} className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center">
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
                <span className="sr-only">Fechar modal</span>
              </button>
              <div className="p-4 text-center">
                <svg viewBox="0 0 24 24" className="mx-auto mb-4 w-14 h-14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                  <g id="SVGRepo_iconCarrier">
                    <path d="M16 3.93552C14.795 3.33671 13.4368 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 11.662 20.9814 11.3283 20.9451 11M21 5L12 14L9 11" stroke="#26a269" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                  </g>
                </svg>
                <p className="mb-4">Solicitação de evento realizada com sucesso!</p>
                <button className="bg-astronaut-800 text-white rounded-md hover:bg-pizazz-500 p-2" type="button"
                  onClick={() => {
                    toggleModal()
                    router.push("/eventos")
                  }}
                >Retornar para a página de eventos</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

function PalestraRow({ control, index, remove, locais, errors, register, watch }: PalestraRowProps) {
  const local = watch(`palestras.${index}.local`);
  const [justificativa, setJustificativa] = useState(false);
  const { data: localData } = useLocal(local && local !== "" ? local : "");
  function checkDays(date: string, data: Local) {
    const now = new Date();
    const inicio = new Date(date);
    const timeBetween = differenceInDays(inicio, now);

    return timeBetween < data.prazoMinimo;
  }

  const horarioDeInicio = watch(`palestras.${index}.horarioDeInicio`);

  useEffect(() => {
    if (local) {
      if (!horarioDeInicio) {
        return
      }

      if (!localData) {
        return;
      }

      const diff = checkDays(horarioDeInicio, localData);
      setJustificativa(diff || false);
    }
  }, [horarioDeInicio]);

  let localList = [
    { key: "Selecione um local", value: "" }
  ]

  let list = (locais || []).map(item => ({ key: `${item.nome} / ${item.prazoMinimo} dias mínimos de antecedência`, value: String(item.id) }))

  localList.push(...list)

  return (
    <div className="border-2 border-astronaut-800 rounded-lg p-4 mt-4">
      <div className="grid md:grid-cols-2 md:gap-6">
        <div className="relative z-0 w-full mb-5 group">
          <Controller
            control={control}
            name={`palestras.${index}.titulo`}
            render={({ field }) =>
            (
              <>
                <ControlledInput label="Título" {...field} />
                {errors.palestras && errors.palestras[index]?.titulo && <span className="text-red-500 text-sm">{errors.palestras[index]?.titulo.message}</span>}
              </>
            )}
          />
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <Controller
            control={control}
            name={`palestras.${index}.palestrante`}
            render={({ field }) =>
            (
              <>
                <ControlledInput label="Palestrante" {...field} />
                {errors.palestras && errors.palestras[index]?.palestrante && <span className="text-red-500 text-sm">{errors.palestras[index]?.palestrante.message}</span>}
              </>
            )}
          />
        </div>
      </div>
      <div className="grid md:grid-cols-2 md:gap-6">
        <div className="relative z-0 w-full mb-5 group">
          <Controller
            control={control}
            name={`palestras.${index}.local`}
            render={({ field }) => (
              <>
                <ControlledSelect
                  {...field}
                  label="Local"
                  options={localList}
                />
              </>
            )
            }
          />
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <Controller
            control={control}
            name={`palestras.${index}.vagas`}
            render={({ field }) => (
              <>
                <div className="relative z-0 w-full mb-5 group">
                  <ControlledInput label="Quantidade de vagas" {...field} type="number" />
                  {errors.palestras && errors.palestras[index]?.vagas && <span className="text-red-500 text-sm">{errors.palestras[index].vagas.message}</span>}
                </div>
              </>
            )
            }
          />
        </div>
      </div>
      <div className="grid md:grid-cols-2 md:gap-6">
        <Controller
          control={control}
          name={`palestras.${index}.horarioDeInicio`}
          render={({ field }) => (
            <>
              <div className="relative z-0 w-full mb-5 group">
                <ControlledInput label="Horário de início" {...field} type="datetime-local" />
                {errors.palestras && errors.palestras[index]?.horarioDeInicio && <span className="text-red-500 text-sm">{errors.palestras[index].horarioDeInicio.message}</span>}
              </div>
            </>
          )
          }
        />
        <Controller
          control={control}
          name={`palestras.${index}.horarioDeFim`}
          render={({ field }) => (
            <>
              <div className="relative z-0 w-full mb-5 group">
                <ControlledInput label="Horário de fim" {...field} type="datetime-local" />
                {errors.palestras && errors.palestras[index]?.horarioDeFim && <span className="text-red-500 text-sm">{errors.palestras[index].horarioDeFim.message}</span>}
              </div>
            </>
          )
          }
        />
      </div>
      {justificativa &&
        <div className="mb-5">
          <Controller
            control={control}
            name={`palestras.${index}.justificativa`}
            render={({ field }) => (
              <>
                <div className="mb-5">
                  <ControlledInput label="Justificativa" {...field} required />
                  {errors.palestras && errors.palestras[index]?.justificativa && <span className="text-red-500 text-sm">{errors.palestras[index].justificativa.message}</span>}
                </div>
              </>
            )
            }
          />
        </div>
      }
      <div className="text-right">
        <button className="bg-white border-astronaut-800 border text-gray-900 rounded-md hover:bg-red-800 hover:border-red-800 hover:text-white p-2 mt-4" type="button" onClick={() => remove(index)}>
          <svg className="w-6 h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default function Evento() {
  const router = useRouter();
  const { user, loading } = useUserInfo();
  const { data: cursoData } = useCursos();
  const { data: localData } = useLocais();
  const { data: setorData } = useSetores();

  useEffect(() => {
    if (loading) {
      return
    }
    if (!user) {
      router.push('/entrar');
    }

  }, [user])

  const tiposDeEvento: Option[] = [
    { key: "Graduação", value: "0" },
    { key: "Institucional", value: "1" },
  ]
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    resetField,
    watch
  } = useForm<SolicitarEventoSchema>({
    defaultValues: {
      palestras: [{ titulo: "", palestrante: "" }],
    },
    resolver: zodResolver(solicitarEventoSchema)
  });
  const { fields, insert, remove } = useFieldArray({
    control,
    name: "palestras",
  })

  const tipoEvento = watch("tipoEvento")
  const outrosCursosParticipantes = watch("outrosCursosParticipantes")
  const emissaoCertificadoSGA = watch("emissaoCertificadoSGA")
  const atividadePratica = watch("atividadePratica")
  const palestras = watch("palestras")
  const temCoffeBreak = watch("infraestrutura.temCoffeBreak")
  const temEstacionamentoPalestrante = watch("infraestrutura.temEstacionamentoPalestrante")

  useEffect(() => {
    resetField("setor");
    resetField("curso");
    resetField("outrosCursosParticipantes");
    resetField("emissaoCertificadoSGA");
  }, [tipoEvento, resetField]);

  const onSubmit: SubmitHandler<SolicitarEventoSchema> = async (data) => {
    let palestras = data.palestras.map(item => ({ ...item, localId: Number(item.local), horarioDeInicio: new Date(item.horarioDeInicio), horarioDeFim: new Date(item.horarioDeFim) }))

    try {
      const request = {
        ...data,
        //dataInicio: new Date(data.dataInicio),
        //dataFim: new Date(data.dataFim),
        setorId: data.setor && Number(data.setor),
        cursoId: data.curso && Number(data.curso),
        tipoEvento: Number(data.tipoEvento),
        solicitanteId: user && Number(user.nameid),
        inicioInscricaoSGA: data.inicioInscricaoSGA && new Date(data.inicioInscricaoSGA),
        fimInscricaoSGA: data.fimInscricaoSGA && new Date(data.fimInscricaoSGA),
        palestras: palestras,
        infraestrutura: {
          ...data.infraestrutura,
          qtdMesaPlastico: data.infraestrutura.qtdMesaPlastico && Number(data.infraestrutura.qtdMesaPlastico),
          qtdForro: data.infraestrutura.qtdForro && Number(data.infraestrutura.qtdForro),
          qtdCesto: data.infraestrutura.qtdCesto && Number(data.infraestrutura.qtdCesto),
        },
      }

      await solicitarEvento(request);
      setIsOpen(true);
    } catch (error) {
      console.error('Erro: ', error);
    }
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Title>Formulário de solicitação de eventos</Title>
      <Modal toggleModal={toggleModal} isOpen={isOpen} />
      <div className="flex justify-center items-center">
        <form className="max-w-6xl mx-auto md:mx-10 md:px-10" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid mb-5">
            <Input label="Título" path="titulo" register={register} required />
            {errors.titulo && <span className="text-red-500 text-sm">{errors.titulo.message}</span>}
          </div>
          <div className="grid mb-5">
            <TextArea label="Descrição do evento" path="descricao" register={register} required rows={4} />
            {errors.descricao && <span className="text-red-500 text-sm">{errors.descricao.message}</span>}
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
              <Input label="Data de início" path="dataInicio" register={register} type="date" />
              {errors.dataInicio && <span className="text-red-500 text-sm">{errors.dataInicio.message}</span>}
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <Input label="Data de fim" path="dataFim" register={register} type="date" />
              {errors.dataFim && <span className="text-red-500 text-sm">{errors.dataFim.message}</span>}
            </div>
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
              <Select label="Tipo de evento" {...register("tipoEvento", { required: true })} options={tiposDeEvento} required />
              {errors.tipoEvento && <span className="text-red-500 text-sm">{errors.tipoEvento.message}</span>}
            </div>
            <div className="relative z-0 w-full mb-5 group">
              {tipoEvento === "0" ?
                <>
                  <Select label="Curso" {...register("curso", { required: true })} options={(cursoData || []).map(item => ({ key: item.nome, value: String(item.id) }))} />
                  {errors.curso && <span className="text-red-500 text-sm">{errors.curso.message}</span>}
                </>
                :
                <>
                  <Select label="Setor" {...register("setor", { required: true })} options={(setorData || []).map(item => ({ key: item.nome, value: String(item.id) }))} />
                  {errors.setor && <span className="text-red-500 text-sm">{errors.setor.message}</span>}
                </>
              }
            </div>
          </div>
          {tipoEvento === "0" &&
            <>
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-5 group">
                  <Checkbox label="Outros cursos/unidades participantes?" path="outrosCursosParticipantes" register={register} />
                  {errors.outrosCursosParticipantes && <span className="text-red-500 text-sm">{errors.outrosCursosParticipantes.message}</span>}
                </div>
                {outrosCursosParticipantes &&
                  <div className="relative z-0 w-full mb-5 group">
                    <Input label="Informe o(s) curso(s)/unidade(s)" path="outrosCursos" register={register} />
                    {errors.outrosCursos && <span className="text-red-500 text-sm">{errors.outrosCursos.message}</span>}
                  </div>
                }
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <Checkbox label="Emissão de certificado para alunos pelo SGA?" path="emissaoCertificadoSGA" register={register} />
                {errors.emissaoCertificadoSGA && <span className="text-red-500 text-sm">{errors.emissaoCertificadoSGA.message}</span>}
              </div>
              {emissaoCertificadoSGA &&
                <div className="grid md:grid-cols-2 md:gap-6">
                  <div className="relative z-0 w-full mb-5 group">
                    <Input label="Informe o início do prazo de inscrição do SGA" path="inicioInscricaoSGA" register={register} type="date" />
                    {errors.inicioInscricaoSGA && <span className="text-red-500 text-sm">{errors.inicioInscricaoSGA.message}</span>}
                  </div>
                  <div className="relative z-0 w-full mb-5 group">
                    <Input label="Informe o fim do prazo de inscrição do SGA" path="fimInscricaoSGA" register={register} type="date" />
                    {errors.fimInscricaoSGA && <span className="text-red-500 text-sm">{errors.fimInscricaoSGA.message}</span>}
                  </div>
                </div>
              }
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-5 group">
                  <Checkbox label="Haverá atividade prática no evento?" path="atividadePratica" register={register} />
                  {errors.atividadePratica && <span className="text-red-500 text-sm">{errors.atividadePratica.message}</span>}
                </div>
              </div>
              {atividadePratica &&
                <div className="mb-5">
                  <TextArea rows={4} label="Descreva a atividade e os materiais necessários" path="materiais" register={register} />
                  {errors.materiais && <span className="text-red-500 text-sm">{errors.materiais.message}</span>}
                </div>
              }
            </>
          }
          <div className="grid mb-5">
            <h2 className="text-astronaut-900 font-bold text-lg uppercase">Palestras</h2>
            {fields.map((field, index) => (
              <PalestraRow
                register={register}
                errors={errors}
                key={field.id}
                control={control}
                locais={localData || []}
                index={index}
                remove={remove}
                watch={watch}
              />
            ))}
          </div>
          <button className="bg-astronaut-800 text-white rounded-md hover:bg-pizazz-500 p-2 mx-2 mb-4"
            onClick={(e) => {
              e.preventDefault();
              insert(palestras.length + 1, { titulo: "", palestrante: "", local: "", vagas: "", horarioDeInicio: "", horarioDeFim: "" })
            }}>
            <svg className="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5" />
            </svg>
          </button>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
              <Checkbox label="Necessita adaptador HDMI?" path="infraestrutura.temAdaptadorHDMI" register={register} />
              {errors.infraestrutura && errors.infraestrutura.temAdaptadorHDMI && <span className="text-red-500 text-sm">{errors.infraestrutura.temAdaptadorHDMI.message}</span>}
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <Input label="Quantidade de suportes/banners" path="infraestrutura.qtdSuporteBanner" register={register} type="number" />
              {errors.infraestrutura && errors.infraestrutura.qtdSuporteBanner && <span className="text-red-500 text-sm">{errors.infraestrutura.qtdSuporteBanner.message}</span>}
            </div>
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
              <Checkbox label="Água para palestrante?" path="infraestrutura.temAguaPalestrante" register={register} />
              {errors.infraestrutura && errors.infraestrutura.temAguaPalestrante && <span className="text-red-500 text-sm">{errors.infraestrutura.temAguaPalestrante.message}</span>}
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <Checkbox label="Será servido coffe break?" path="infraestrutura.temCoffeBreak" register={register} />
              {errors.infraestrutura && errors.infraestrutura.temCoffeBreak && <span className="text-red-500 text-sm">{errors.infraestrutura.temCoffeBreak.message}</span>}
            </div>
          </div>
          {temCoffeBreak &&
            <div className="grid md:grid-cols-3 md:gap-6">
              <div className="relative z-0 w-full mb-5 group">
                <Input label="Qtd de mesas de plástico" path="infraestrutura.qtdMesaPlastico" register={register} type="number" />
                {errors.infraestrutura && errors.infraestrutura.qtdMesaPlastico && <span className="text-red-500 text-sm">{errors.infraestrutura.qtdMesaPlastico.message}</span>}
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <Input label="Qtd de forro de mesa" path="infraestrutura.qtdForro" register={register} type="number" />
                {errors.infraestrutura && errors.infraestrutura.qtdForro && <span className="text-red-500 text-sm">{errors.infraestrutura.qtdForro.message}</span>}
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <Input label="Qtd de cestos" path="infraestrutura.qtdCesto" register={register} type="number" />
                {errors.infraestrutura && errors.infraestrutura.qtdCesto && <span className="text-red-500 text-sm">{errors.infraestrutura.qtdCesto.message}</span>}
              </div>
            </div>
          }
          <div className="mb-5">
            <Checkbox label="Uso de estacionamento para os palestrantes?" path="infraestrutura.temEstacionamentoPalestrante" register={register} />
            {errors.infraestrutura && errors.infraestrutura.temEstacionamentoPalestrante && <span className="text-red-500 text-sm">{errors.infraestrutura.temEstacionamentoPalestrante.message}</span>}
          </div>
          {temEstacionamentoPalestrante &&
            <div className="mb-5">
              <TextArea rows={4} label="Informe os dados do(s) palestrante(s)" path="infraestrutura.dadosPalestrante" register={register} />
              {errors.infraestrutura && errors.infraestrutura.dadosPalestrante && <span className="text-red-500 text-sm">{errors.infraestrutura.dadosPalestrante.message}</span>}
            </div>
          }
          <div className="p-2 m-10 text-center">
            <button className="bg-astronaut-800 text-white rounded-md hover:bg-pizazz-500 p-2 mx-2" type="submit">
              Encaminhar solicitação
            </button>
            <button className="bg-white border-astronaut-800 border text-gray-900 rounded-md hover:bg-red-800 hover:border-red-800 hover:text-white p-2 mx-2"
              onClick={(e) => {
                e.preventDefault()
                router.push("/eventos")
              }}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
