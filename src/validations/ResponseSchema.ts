import * as yup from 'yup';

export type IResponseForm = yup.InferType<typeof ResponseSchema>;

export const ResponseSchema = yup.object({
  response: yup.string().required('Campo obrigatório'),
});
