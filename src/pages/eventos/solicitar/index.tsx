import { useRouter } from 'next/router';
import { Controller, FieldErrors, SubmitHandler, useFieldArray, useForm, UseFormRegister } from 'react-hook-form';
import { useUserInfo } from '@/hooks/user';
import Title from '@/components/title';
import { solicitarEvento, solicitarEventoSchema, SolicitarEventoSchema } from '@/api/eventos';
import { Input } from '@/components/input';
import { useSetores } from '@/api/setores';
import { useCursos } from '@/api/cursos';
import { Local, useLocais } from '@/api/locais';
import { ControlledSelect, Option, Select } from '@/components/select';
import { TextArea } from '@/components/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { Checkbox } from '@/components/checkbox';
type PalestraRowProps = {
  control: any;
  index: number;
  remove: (index: number) => void;
  errors: FieldErrors<SolicitarEventoSchema>
  register: UseFormRegister<SolicitarEventoSchema>
  locais: Local[]
};
function PalestraRow({ control, index, remove, locais, errors, register }: PalestraRowProps) {
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
                <Input label="Título" path={`palestras.${index}.titulo`} register={register} {...field} required />
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
                <Input label="Palestrante" path={`palestras.${index}.palestrante`} register={register} {...field} required />
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
            name={`entries.${index}.local`}
            render={({ field }) => (
              <>
                <ControlledSelect
                  {...field}
                  label="Local"
                  options={(locais || []).map(item => ({ key: `${item.nome} / ${item.prazoMinimo} dias mínimos de antecedência`, value: String(item.id) }))}
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
                  <Input label="Quantidade de vagas" path={`palestras.${index}.vagas`} {...field} register={register} required type="number" />
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
                <Input label="Horário de início" path={`palestras.${index}.horarioDeInicio`} {...field} register={register} required type="datetime-local" />
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
                <Input label="Horário de fim" path={`palestras.${index}.horarioDeFim`} {...field} register={register} required type="datetime-local" />
                {errors.palestras && errors.palestras[index]?.horarioDeFim && <span className="text-red-500 text-sm">{errors.palestras[index].horarioDeFim.message}</span>}
              </div>
            </>
          )
          }
        />
      </div>
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
  useEffect(() => {
    if (loading) {
      return
    }
    if (!user) {
      router.push('/entrar');
    }
  }, [user])
  const { data: cursoData } = useCursos();
  const { data: localData } = useLocais();
  const { data: setorData } = useSetores();
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
    defaultValues: { palestras: [{ titulo: "", palestrante: "" }] },
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
  useEffect(() => {
    resetField("setor");
    resetField("curso");
    resetField("outrosCursosParticipantes");
    resetField("emissaoCertificadoSGA");
  }, [tipoEvento, resetField]);
  const onSubmit: SubmitHandler<SolicitarEventoSchema> = async (data) => {
    console.log(data);
    //try {
    //  //const response = await solicitarEvento(data);
    //  //router.push('/eventos');
    //  console.log(data);
    //} catch (error) {
    //  console.error('Erro: ', error);
    //}
  };
  return (
    <>
      <Title>Formulário de solicitação de eventos</Title>
      <form className="mx-80 px-80 md:mx-10 md:px-10" onSubmit={handleSubmit(onSubmit)}>
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
            <Input label="Data de início" path="dataInicio" register={register} required type="datetime-local" />
            {errors.dataInicio && <span className="text-red-500 text-sm">{errors.dataInicio.message}</span>}
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <Input label="Data de fim" path="dataFim" register={register} required type="datetime-local" />
            {errors.dataFim && <span className="text-red-500 text-sm">{errors.dataFim.message}</span>}
          </div>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <Select label="Tipo de evento" {...register("tipoEvento", { required: true })} options={tiposDeEvento} required />
            {errors.tipoEvento && <span className="text-red-500 text-sm">{errors.tipoEvento.message}</span>}
          </div>
          <div className="relative z-0 w-full mb-5 group">
            {Number(tipoEvento) === 0 ?
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
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="relative z-0 w-full mb-5 group">
                <Checkbox label="Emissão de certificado para alunos pelo SGA?" path="emissaoCertificadoSGA" register={register} />
                {errors.emissaoCertificadoSGA && <span className="text-red-500 text-sm">{errors.emissaoCertificadoSGA.message}</span>}
              </div>
              {emissaoCertificadoSGA &&
                <div className="relative z-0 w-full mb-5 group">
                  <Input label="Informe o prazo de inscrição do SGA" path="prazoInscricaoSGA" register={register} type="date" />
                  {errors.prazoInscricaoSGA && <span className="text-red-500 text-sm">{errors.prazoInscricaoSGA.message}</span>}
                </div>
              }
            </div>
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="relative z-0 w-full mb-5 group">
                <Checkbox label="Atividade prática?" path="atividadePratica" register={register} />
                {errors.atividadePratica && <span className="text-red-500 text-sm">{errors.atividadePratica.message}</span>}
              </div>
            </div>
            {atividadePratica &&
              <div className="mb-5">
                <TextArea rows={4} label="Informe os materiais necessários para a atividade prática" path="materiais" register={register} />
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
            />
          ))}
        </div>
        <button className="bg-astronaut-800 text-white rounded-md hover:bg-pizazz-500 p-2 mx-2 my-4"
          onClick={(e) => {
            e.preventDefault();
            insert(palestras.length + 1, { titulo: "", palestrante: "", vagas: "", horarioDeInicio: "", horarioDeFim: "" })
          }}>
          <svg className="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5" />
          </svg>
        </button>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <Checkbox label="Necessita adaptador HDMI?" path="infraestrutura.temAdaptadorHDMI" register={register} />
            {errors.infraestrutura?.temAdaptadorHDMI && <span className="text-red-500 text-sm">{errors.infraestrutura.temAdaptadorHDMI.message}</span>}
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <Input label="Quantidade mesas de plástico" path="infraestrutura.qtdMesaPlastico" register={register} type="number" />
            {errors.infraestrutura?.qtdMesaPlastico && <span className="text-red-500 text-sm">{errors.infraestrutura.qtdMesaPlastico.message}</span>}
          </div>
        </div>
        <div className="p-2 m-10 text-center">
          <button className="bg-astronaut-800 text-white rounded-md hover:bg-pizazz-500 p-2 mx-2" type="submit">
            Encaminhar solicitação
          </button>
          <button className="bg-white border-astronaut-800 border text-gray-900 rounded-md hover:bg-red-800 hover:border-red-800 hover:text-white p-2 mx-2" onClick={() => router.push("/eventos")}>
            Cancelar
          </button>
        </div>
      </form>
    </>
  );
}