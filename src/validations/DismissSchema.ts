import { IOption } from '@/interfaces/OptionType';
import * as yup from 'yup';

export type IDismissForm = yup.InferType<typeof DismissSchema>;

export const DismissSchema = yup.object({
  documentId: yup.string().required('Campo obrigatório'),
  observation: yup.string().required('Campo obrigatório'),
  type_of_termination: yup.mixed<IOption>().required('Campo obrigatório'),
});
