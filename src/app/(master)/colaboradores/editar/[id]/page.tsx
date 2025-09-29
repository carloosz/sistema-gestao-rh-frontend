'use client';

import CollaboratorForm from '@/components/Forms/CollaboratorForm/CollaboratorForm';
import { formData } from './data';
import { useParams } from 'next/navigation';
<<<<<<< HEAD
import protectedRoute from '@/hooks/protectedRoute';
=======
>>>>>>> b4a91cc7aa32a3da5c98084b8fcce3be2af10c3c

const EditCollaboratorPage = () => {
  const params = useParams();
  const { id } = params;
  return (
    <CollaboratorForm
      type="edit"
      formData={{ ...formData, id: id as string }}
    />
  );
};

<<<<<<< HEAD
export default protectedRoute(EditCollaboratorPage);
=======
export default EditCollaboratorPage;
>>>>>>> b4a91cc7aa32a3da5c98084b8fcce3be2af10c3c
