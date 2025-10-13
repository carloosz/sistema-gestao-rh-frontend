import api from '@/services/api';
import { ITermsForm } from '@/validations/TermsSchema';
import { useMutation } from '@tanstack/react-query';

const updateTerms = async (form: ITermsForm) => {
  await api.put(`terms`, {
    terms: form?.terms_of_use,
    policy: form?.privacy_policies,
  });
};

interface IRequest {
  onSuccess?: () => void;
  onError?: (error: any) => void;
}

export const useUpdateTerms = ({ onSuccess, onError }: IRequest) => {
  return useMutation({
    mutationKey: ['update-terms'],
    mutationFn: updateTerms,
    onSuccess,
    onError,
  });
};
