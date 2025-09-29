'use client';

import CollaboratorForm from '@/components/Forms/CollaboratorForm/CollaboratorForm';
import { formData, formData2 } from './data';
import { useParams } from 'next/navigation';
<<<<<<< HEAD
import protectedRoute from '@/hooks/protectedRoute';
=======
>>>>>>> b4a91cc7aa32a3da5c98084b8fcce3be2af10c3c

const ViewCollaboratorPage = () => {
  const params = useParams();
  const { id } = params;
  return (
    <CollaboratorForm
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
export default protectedRoute(ViewCollaboratorPage);
=======
export default ViewCollaboratorPage;
>>>>>>> b4a91cc7aa32a3da5c98084b8fcce3be2af10c3c
