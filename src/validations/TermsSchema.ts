import * as yup from 'yup';

export type ITermsForm = yup.InferType<typeof TermsSchema>;

export const TermsSchema = yup.object({
  documentId: yup.string().optional(),
  terms_of_use: yup.string().required('Campo obrigatório'),
  privacy_policies: yup.string().required('Campo obrigatório'),
});
