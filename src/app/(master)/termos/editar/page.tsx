'use client';

import protectedRoute from '@/hooks/protectedRoute';
import { useTerms } from '@/services/requests/terms/getTerms';
import TermsForm from '@/components/Forms/TermsForm/TermsForm';

const EditTermsPage = () => {
  const { data } = useTerms();

  if (!data) {
    return null;
  }

  return (
    <TermsForm
      type="edit"
      formData={{ terms_of_use: data?.terms, privacy_policies: data?.policy }}
    />
  );
};

export default protectedRoute(EditTermsPage);
