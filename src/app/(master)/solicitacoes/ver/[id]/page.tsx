'use client';

import { formData, formData2 } from './data';
import { useParams } from 'next/navigation';
import SolicitationForm from '@/components/Forms/SolicitationForm/SolicitationForm';
<<<<<<< HEAD
import protectedRoute from '@/hooks/protectedRoute';
=======
>>>>>>> b4a91cc7aa32a3da5c98084b8fcce3be2af10c3c

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

<<<<<<< HEAD
export default protectedRoute(ViewSolicitationPage);
=======
export default ViewSolicitationPage;
>>>>>>> b4a91cc7aa32a3da5c98084b8fcce3be2af10c3c
