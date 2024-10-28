import { z } from "zod"
import { api } from "./axios"

export type Usuario = {
  Id: number
  Nome: string
  Email: string
  Senha: string
  Perfil: number
}

export const registerSchema = z.object({
  Nome: z.string().min(1, { message: "O campo nome é obrigatório" }),
  Email: z.string().email({ message: "O campo e-mail deve ser um e-mail válido" }).regex(/.*@sga\.pucminas\.br$|.*@pucminas\.br$/, "O e-mail deve ser um e-mail institucional"),
  Senha: z.string().min(8, { message: "A senha deve conter no mínimo 8 caractéres" }),
  ConfirmarSenha: z.string().min(8, { message: "A confirmação de senha deve conter no mínimo 8 caractéres" }),
  Perfil: z.coerce.number().positive({ message: "O campo perfil é obrigatório" })
}).refine((data) => data.Senha === data.ConfirmarSenha, {
  message: "A confirmação de senha deve ser igual a senha",
  path: ['ConfirmarSenha']
})

export type RegisterSchema = z.infer<typeof registerSchema>

export const registerUser = async (data: RegisterSchema) => {
  const URL = "Usuarios/register/";
  const response = await api.post(URL, data);

  return response;
};

export const loginSchema = z.object({
  Email: z.string().email({ message: "O campo e-mail é obrigatório" }).regex(/.*@sga\.pucminas\.br$|.*@pucminas\.br$/, "O e-mail deve ser um e-mail institucional"),
  Senha: z.string().min(1, { message: "O campo senha é obrigatório" }),
})

export type LoginSchema = z.infer<typeof loginSchema>
type LoginResponse = {
  token: string
}

export const login = async (data: LoginSchema) => {
  const URL = "Usuarios/login"
  const response = await api.post<LoginResponse>(URL, {
    Email: data.Email,
    Senha: data.Senha,
  });

  return response;
}
