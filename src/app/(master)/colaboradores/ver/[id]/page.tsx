'use client';

import CollaboratorForm from '@/components/Forms/CollaboratorForm/CollaboratorForm';
import { formData, formData2 } from './data';
import { useParams } from 'next/navigation';

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

export default ViewCollaboratorPage;
