import { IClient, IClientList } from '@/interfaces/Client';
import api from '@/services/api';
import { currencyMask, maskCPF, maskPhone } from '@/utils/masks';
import { ICollaboratorForm } from '@/validations/CollaboratorSchema';
import { useQuery } from '@tanstack/react-query';

export const useCollaborators = (params?: any, enabled?: boolean) => {
  return useQuery({
    queryKey: ['collaborators', params],
    queryFn: async () => {
      const { data } = await api.get<IClientList>('clients', {
        params,
      });

      return data;
    },
    initialData: {
      users: [],
      page: 1,
      pageSize: 1,
      totalPages: 1,
      totalItems: 1,
      totalThisPage: 1,
    },
    enabled,
  });
};

export const useCollaborator = (documentId: string) => {
  return useQuery({
    queryKey: ['collaborator', documentId],
    queryFn: async () => {
      const { data } = await api.get<IClient>(`clients/${documentId}`);
      return DataToForm(data);
    },
  });
};

const DataToForm = (data: IClient) => {
  return {
    id: data?.id?.toString(),
    documentId: data?.documentId,
    name: data?.name,
    cpf: maskCPF(data?.cpf),
    phone: maskPhone(data?.phone),
    email: data?.email,
    birthdate: data?.dateOfBirth?.slice(0, 10)?.split('-')?.reverse().join('/'),
    gender: {
      label: data?.gender,
      value: data?.gender,
    },
    cep: data?.zipCode,
    street: data?.address,
    state: data?.state,
    city: data?.city,
    neighborhood: data?.neighborhood,
    number: data?.number,
    admission_date: data?.admissionDate
      ?.slice(0, 10)
      ?.split('-')
      ?.reverse()
      .join('/'),
    role: {
      label: data?.natureOfThePosition,
      value: data?.natureOfThePosition,
    },
    sector: data?.sector,
    cbo: data?.Cbo,
    salary: currencyMask(data?.startingSalary),
    payment_method: { label: data?.paymentMethod, value: data?.paymentMethod },
    working_days: data?.daysOfwork?.map(item => ({
      label: item?.name,
      value: item?.documentId,
    })),
    work_schedule: `${data?.initialHour?.slice(
      0,
      5,
    )} às ${data?.finalHour?.slice(0, 5)}`,
    meal_time: `${data?.lunchInitialHour?.slice(
      0,
      5,
    )} às ${data?.lunchFinalHour?.slice(0, 5)}`,
    termination_date: data?.dismissalDate
      ?.slice(0, 10)
      ?.split('-')
      ?.reverse()
      .join('/'),
    contractual_rescission: data?.typeOfTermination,
    observation: data?.dismissalObservation,
  } as ICollaboratorForm;
};
