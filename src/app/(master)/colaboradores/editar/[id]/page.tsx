'use client';

import CollaboratorForm from '@/components/Forms/CollaboratorForm/CollaboratorForm';
import { formData } from './data';
import { useParams } from 'next/navigation';

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

export default EditCollaboratorPage;
