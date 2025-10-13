import { IStrapiArray } from '@/interfaces/StrapiData';
import { IWeekDays } from '@/interfaces/WeekDays';
import api from '@/services/api';
import { useQuery } from '@tanstack/react-query';

export const useWeekDaysOptions = () => {
  return useQuery({
    queryKey: ['week-days-options'],
    queryFn: async () => {
      const { data } = await api.get<IStrapiArray<IWeekDays>>('day-of-works');

      return data?.data?.map(item => ({
        label: item?.name,
        value: item?.documentId,
      }));
    },
    initialData: [],
  });
};
