import api from '@/services/api';
import { unformatCurrency } from '@/utils/masks';
import { ICollaboratorForm } from '@/validations/CollaboratorSchema';
import { useMutation } from '@tanstack/react-query';

const createClient = async (form: ICollaboratorForm) => {
  await api.post(`clients`, {
    email: form?.email,
    password: form?.password,
    name: form?.name,
    cpf: form?.cpf,
    phone: form?.phone,
    dateOfBirth: form?.birthdate?.split('/')?.reverse()?.join('-'),
    gender: form?.gender?.value,
    zipCode: form?.cep,
    address: form?.street,
    number: form?.number,
    neighborhood: form?.neighborhood,
    city: form?.city,
    state: form?.state,
    admissionDate: form?.admission_date?.split('/')?.reverse()?.join('-'),
    Cbo: form?.cbo,
    natureOfThePosition: form?.role?.value,
    sector: form?.sector,
    startingSalary: unformatCurrency(form?.salary),
    paymentMethod: form?.payment_method?.value,
    initialHour: form?.work_schedule?.slice(0, 5),
    finalHour: form?.work_schedule?.slice(10, 15),
    lunchInitialHour: form?.meal_time?.slice(0, 5),
    lunchFinalHour: form?.meal_time?.slice(10, 15),
    daysOfWork: form?.working_days?.map(item => item?.value),
  });
};

interface IRequest {
  onSuccess?: () => void;
  onError?: (error: any) => void;
}

export const useCreateClient = ({ onSuccess, onError }: IRequest) => {
  return useMutation({
    mutationKey: ['create-client'],
    mutationFn: createClient,
    onSuccess,
    onError,
  });
};
