import api from '@/services/api';
import { urlConvert } from '@/utils/urlConvert';

export const exportUserPDF = async (documentId: string) => {
  const { data } = await api.get<string>(`/exportUserPdf/${documentId}`);
  return urlConvert(data);
};
