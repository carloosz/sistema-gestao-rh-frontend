import { ICollaboratorForm } from '@/validations/CollaboratorSchema';

export const formData = {
  id: '1',
  name: 'teste',
  cpf: '111.111.111-11',
  phone: '(11) 11111-1111',
  email: 'teste@teste.com',
  birthdate: '23/12/1997',
  gender: {
    label: 'Masculino',
    value: 'Masculino',
  },
  password: 'Teste@123',
  cep: '08770-020',
  street: 'Rua Teste',
  state: 'SP',
  city: 'Mogi das Cruzes',
  neighborhood: 'Centro',
  number: '222',
  admission_date: '20/02/2024',
  role: {
    label: 'Diretor Financeiro (CFO)',
    value: 'cfo',
  },
  sector: 'Financeiro',
  cbo: '123',
  salary: 'R$ 20.000,00',
  payment_method: {
    label: 'TED',
    value: 'ted',
  },
  working_days: [
    {
      label: 'Segunda-feira',
      value: 'segunda',
    },
    {
      label: 'Terça-feira',
      value: 'terca',
    },
    {
      label: 'Quarta-feira',
      value: 'quarta',
    },
    {
      label: 'Quinta-feira',
      value: 'quinta',
    },
    {
      label: 'Sexta-feira',
      value: 'sexta',
    },
    {
      label: 'Sábado',
      value: 'sabado',
    },
  ],
  work_schedule: '09:00 - 18:00',
  meal_time: '12:00 - 13:00',
} as ICollaboratorForm;
