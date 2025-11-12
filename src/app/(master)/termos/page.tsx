'use client';

import CollaboratorForm from '@/components/Forms/CollaboratorForm/CollaboratorForm';
import { useParams } from 'next/navigation';
import protectedRoute from '@/hooks/protectedRoute';
import { useCollaborator } from '@/services/requests/collaborators/getCollaborators';
import TermsForm from '@/components/Forms/TermsForm/TermsForm';
import { useTerms } from '@/services/requests/terms/getTerms';
import Loading from '@/components/Loading/Loading';

const ViewTermsPage = () => {
  const { data } = useTerms();

  if (!data) {
    return <Loading />;
  }

  return (
    <TermsForm
      type="view"
      formData={{ terms_of_use: data?.terms, privacy_policies: data?.policy }}
    />
  );
};

export default protectedRoute(ViewTermsPage);
