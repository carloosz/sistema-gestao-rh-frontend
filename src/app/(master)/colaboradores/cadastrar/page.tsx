'use client';

import CollaboratorForm from '@/components/Forms/CollaboratorForm/CollaboratorForm';
import protectedRoute from '@/hooks/protectedRoute';

const RegisterCollaboratorPage = () => {
  return <CollaboratorForm />;
};

export default protectedRoute(RegisterCollaboratorPage);
