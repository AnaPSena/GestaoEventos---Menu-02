import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useUserInfo } from '@/hooks/user';
import Title from '@/components/title';
import { solicitarEvento, solicitarEventoSchema, SolicitarEventoSchema } from '@/api/eventos';
import { Input } from '@/components/input';
import { useSetores } from '@/api/setores';
import { useCursos } from '@/api/cursos';
import { useLocais } from '@/api/locais';
import { Option, Select } from '@/components/select';
import { TextArea } from '@/components/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { Checkbox } from '@/components/checkbox';
import { PalestraSchema } from '@/api/palestras';


//function Palestra() {
//  const [] = useState<PalestraSchema[]>([{
//    nome: "",
//    local: 0,
//    vagas: 0,
//    dataInicio: null,
//    dataFim: null,
//  }]);
//  return (
//    <div>
//    </div>
//  )
//}

export default function Evento() {

  const router = useRouter();

  const { user } = useUserInfo();
  //if (!user) {
  //  router.push('/entrar');
  //  return;
  //}

  const { data: cursoData, isLoading: cursoIsLoading, error: cursoError } = useCursos();
  const { data: localData, isLoading: localIsLoading, error: localError } = useLocais();
  const { data: setorData, isLoading: setorIsLoading, error: setorError } = useSetores();
  const tiposDeEvento: Option[] = [
    { key: "Graduação", value: "0" },
    { key: "Institucional", value: "1" },
  ]

  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
    watch
  } = useForm<SolicitarEventoSchema>({
    resolver: zodResolver(solicitarEventoSchema)
  });

  const tipoEvento = watch("tipoEvento")
  const outrosCursosParticipantes = watch("outrosCursosParticipantes")
  const emissaoCertificadoSGA = watch("emissaoCertificadoSGA")

  useEffect(() => {
    resetField("setor");
    resetField("curso");
    resetField("outrosCursosParticipantes");
    resetField("emissaoCertificadoSGA");
  }, [tipoEvento, resetField]);

  console.log(tipoEvento);

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
          </>
        }
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
