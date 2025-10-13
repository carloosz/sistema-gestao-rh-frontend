import Button from '@/components/Buttons/Button/Button';
import Header from '@/components/Header/Header';
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useRouter } from 'next/navigation';
import handleError, { handleSuccess } from '@/utils/handleToast';
import { useQueryClient } from '@tanstack/react-query';
import { ITermsForm, TermsSchema } from '@/validations/TermsSchema';
import { useUpdateTerms } from '@/services/requests/terms/updateTerms';
import Textarea2 from '@/components/Inputs/Textarea2/Textarea2';

interface Props {
  type?: 'edit' | 'view';
  formData: ITermsForm;
}

const TermsForm = ({ type = 'view', formData }: Props) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ITermsForm>({
    mode: 'onChange',
    resolver: yupResolver(TermsSchema),
    defaultValues: formData,
  });

  const { mutate } = useUpdateTerms({
    onSuccess: async () => {
      handleSuccess('Termos atualizado com sucesso!');
      await queryClient.invalidateQueries({
        queryKey: ['terms'],
      });
      router.push('/termos');
    },
    onError: error => handleError(error),
  });

  const onSubmit = (form: ITermsForm) => {
    mutate(form);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit, errorGroup => console.log(errorGroup))}
    >
      <Header
        title="Termos de uso e Política de privacidade"
        onBack={() =>
          type === 'view'
            ? router.push('/solicitacoes')
            : router.push('/termos')
        }
        buttons={
          type !== 'view' ? (
            <Button type="submit">
              Salvar
              <img src="/img/icons/save.svg" alt="Salvar" />
            </Button>
          ) : (
            <Button type="button" onClick={() => router.push(`/termos/editar`)}>
              Editar
              <img src="/img/icons/edit.svg" alt="Editar" />
            </Button>
          )
        }
      />
      <div className="my-[15px]! ml-[60px]! mr-[30px]! flex flex-col gap-[15px] items-center">
        <div className="w-full flex flex-col">
          <span className="font-normal text-secondary text-[24px]">
            Termos de uso
          </span>
          <Textarea2
            disabled={type === 'view'}
            rows={8}
            wrap="hard"
            placeholder="Digite os termos de uso"
            {...register('terms_of_use')}
            error={errors?.terms_of_use?.message}
          />
        </div>
        <div className="w-full flex flex-col">
          <span className="font-normal text-secondary text-[24px]">
            Política de privacidade
          </span>
          <Textarea2
            disabled={type === 'view'}
            rows={8}
            wrap="hard"
            placeholder="Digite a política de privacidade"
            {...register('privacy_policies')}
            error={errors?.privacy_policies?.message}
          />
        </div>
      </div>
    </form>
  );
};

export default TermsForm;
