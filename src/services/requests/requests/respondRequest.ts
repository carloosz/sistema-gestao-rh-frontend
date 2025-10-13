import api from '@/services/api';
import { IResponseForm } from '@/validations/ResponseSchema';
import { useMutation } from '@tanstack/react-query';

const respondRequest = async (form: IResponseForm) => {
  await api.put(`respondRequest/${form?.documentId}`, {
    answer: form?.response,
  });
};

interface IRequest {
  onSuccess?: () => void;
  onError?: (error: any) => void;
}

export const useRespondRequest = ({ onSuccess, onError }: IRequest) => {
  return useMutation({
    mutationKey: ['respond-request'],
    mutationFn: respondRequest,
    onSuccess,
    onError,
  });
};
