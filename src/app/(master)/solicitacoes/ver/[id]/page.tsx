'use client';

import { formData, formData2 } from './data';
import { useParams } from 'next/navigation';
import SolicitationForm from '@/components/Forms/SolicitationForm/SolicitationForm';

const ViewSolicitationPage = () => {
  const params = useParams();
  const { id } = params;
  return (
    <SolicitationForm
      type="view"
      formData={
        id === '0'
          ? { ...formData2, id: id as string }
          : { ...formData, id: id as string }
      }
    />
  );
};

export default ViewSolicitationPage;
