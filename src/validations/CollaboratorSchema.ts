import { IOption } from '@/interfaces/OptionType';
import * as yup from 'yup';

export type ICollaboratorForm = yup.InferType<typeof CollaboratorSchema>;

export const CollaboratorSchema = yup.object({
  id: yup.string().optional(),
  name: yup.string().required('Campo obrigatório'),
  cpf: yup.string().required('Campo obrigatório'),
  phone: yup.string().required('Campo obrigatório'),
  email: yup
    .string()
    .required('E-mail é obrigatório')
    .email('Insira um e-mail válido'),
  birthdate: yup.string().required('Campo obrigatório'),
  gender: yup.mixed<IOption>().required('Campo obrigatório'),
  password: yup.string().required('Senha é obrigatória'),
  cep: yup.string().required('Campo obrigatório'),
  street: yup.string().required('Campo obrigatório'),
  state: yup.string().required('Campo obrigatório'),
  city: yup.string().required('Campo obrigatório'),
  neighborhood: yup.string().required('Campo obrigatório'),
  number: yup.string().required('Campo obrigatório'),
  admission_date: yup.string().required('Campo obrigatório'),
  role: yup.mixed<IOption>().required('Campo obrigatório'),
  sector: yup.string().required('Campo obrigatório'),
  cbo: yup.string().required('Campo obrigatório'),
  salary: yup.string().required('Campo obrigatório'),
  payment_method: yup.mixed<IOption>().required('Campo obrigatório'),
  working_days: yup.mixed<IOption[]>().required('Campo obrigatório'),
  work_schedule: yup.string().required('Campo obrigatório'),
  meal_time: yup.string().required('Campo obrigatório'),
  termination_date: yup.string().optional(),
  contractual_rescission: yup.string().optional(),
  observation: yup.string().optional(),
});
