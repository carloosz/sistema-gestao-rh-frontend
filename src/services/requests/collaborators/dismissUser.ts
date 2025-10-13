import api from '@/services/api';
import { IDismissForm } from '@/validations/DismissSchema';
import { useMutation } from '@tanstack/react-query';

const dismissUser = async (form: IDismissForm) => {
  await api.put(`dismissUser/${form?.documentId}`, {
    date: new Date()?.toISOString()?.slice(0, 10),
    observation: form?.observation,
    typeOfTermination: form?.type_of_termination?.value,
  });
};

interface IRequest {
  onSuccess?: () => void;
  onError?: (error: any) => void;
}

export const useDismissUser = ({ onSuccess, onError }: IRequest) => {
  return useMutation({
    mutationKey: ['dismiss-user'],
    mutationFn: dismissUser,
    onSuccess,
    onError,
  });
};
