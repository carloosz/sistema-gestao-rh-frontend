'use client';

import CollaboratorForm from '@/components/Forms/CollaboratorForm/CollaboratorForm';
import { useParams } from 'next/navigation';
import protectedRoute from '@/hooks/protectedRoute';
import { useCollaborator } from '@/services/requests/collaborators/getCollaborators';
import Loading from '@/components/Loading/Loading';

const ViewCollaboratorPage = () => {
  const params = useParams();
  const { id } = params;

  const { data } = useCollaborator(id as string);

  if (!data) {
    return <Loading />;
  }

  return <CollaboratorForm type="view" formData={data} />;
};

export default protectedRoute(ViewCollaboratorPage);
