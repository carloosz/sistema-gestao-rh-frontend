'use client';

import CollaboratorForm from '@/components/Forms/CollaboratorForm/CollaboratorForm';
import { useParams } from 'next/navigation';
import protectedRoute from '@/hooks/protectedRoute';
import { useCollaborator } from '@/services/requests/collaborators/getCollaborators';

const EditCollaboratorPage = () => {
  const params = useParams();
  const { id } = params;

  const { data } = useCollaborator(id as string);

  if (!data) {
    return null;
  }

  return <CollaboratorForm type="edit" formData={data} />;
};

export default protectedRoute(EditCollaboratorPage);
