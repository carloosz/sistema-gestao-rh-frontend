import Button from '@/components/Buttons/Button/Button';
import Header from '@/components/Header/Header';
import Input from '@/components/Inputs/Input/Input';
import SelectCustom from '@/components/Inputs/Select/Select';
import {
  maskCEP,
  maskCPF,
  maskDate,
  maskHourInterval,
  maskMoney,
  maskPhone,
  unMask,
} from '@/utils/masks';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { genderOptions, paymentMethodOptions, roleOptions } from './data';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  CollaboratorEditSchema,
  CollaboratorSchema,
  ICollaboratorForm,
} from '@/validations/CollaboratorSchema';
import MultiSelect from '@/components/Inputs/MultiSelect/MultiSelect';
import { useRouter } from 'next/navigation';
import Textarea from '@/components/Inputs/Textarea/Textarea';
import { useCreateClient } from '@/services/requests/collaborators/createClient';
import handleError, { handleSuccess } from '@/utils/handleToast';
import { useUpdateClient } from '@/services/requests/collaborators/updateClient';
import api from '@/services/api';
import { exportUserPDF } from '@/services/requests/collaborators/exportUserPDF';
import ModalDimiss from '@/components/Modals/ModalDimiss/ModalDimiss';
import { useWeekDaysOptions } from '@/services/requests/collaborators/getWeekDays';
import { useQueryClient } from '@tanstack/react-query';

interface Props {
  type?: 'register' | 'edit' | 'view';
  formData?: ICollaboratorForm;
}

function hiddenCPF(cpf: string) {
  if (!cpf) return '';

  const numbers = cpf.replace(/\D/g, '');

  const masked = numbers.replace(
    /(\d{3})(\d{3})(\d{3})(\d{2})/,
    '$1.•••.•••-$4',
  );

  return masked;
}

// Função para mascarar Email com bullet points (domínio parcial)
function hiddenkEmail(email: string) {
  if (!email) return '';

  const [username, domain] = email.split('@');

  const maskedUsername = username[0] + '•'.repeat(username.length - 1);

  const domainParts = domain.split('.');
  const maskedDomainName =
    domainParts[0][0] + '•'.repeat(domainParts[0].length - 1);
  const extension = domainParts.slice(1).join('.');

  return `${maskedUsername}@${maskedDomainName}.${extension}`;
}

const CollaboratorForm = ({ type = 'register', formData }: Props) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const {
    register,
    setValue,
    watch,
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ICollaboratorForm>({
    mode: 'onChange',
    resolver: yupResolver(
      type === 'edit' ? CollaboratorEditSchema : CollaboratorSchema,
    ),
  });

  const [openModalDimiss, setOpenModalDimiss] = useState(false);

  const passwordValue = watch('password');
  const cpfValue = watch('cpf');
  const emailValue = watch('email');

  const { data: weekDayOptions } = useWeekDaysOptions();

  const { mutate: mutateCreate } = useCreateClient({
    onSuccess: () => {
      handleSuccess('Colaborador cadastrado com sucesso!');
      queryClient.invalidateQueries({
        queryKey: ['collaborators'],
      });
      queryClient.invalidateQueries({
        queryKey: ['collaborator'],
      });
      router.push('/colaboradores');
    },
    onError: error => handleError(error),
  });
  const { mutate: mutateUpdate } = useUpdateClient({
    onSuccess: () => {
      handleSuccess('Colaborador atualizado com sucesso!');
      queryClient.invalidateQueries({
        queryKey: ['collaborators'],
      });
      queryClient.invalidateQueries({
        queryKey: ['collaborator'],
      });
      router.push('/colaboradores');
    },
    onError: error => handleError(error),
  });

  const buscarCep = async (cep: string) => {
    try {
      const cepFormatted = cep.replace('-', '');
      if (cepFormatted.length >= 8) {
        const { data } = await api.get(
          `https://viacep.com.br/ws/${cepFormatted}/json/`,
        );
        setValue('street', data.logradouro);
        setValue('neighborhood', data.bairro);
        setValue('city', data.localidade);
        setValue('state', data.uf);
      }
    } catch (error) {
      handleError(error);
    }
  };

  const onSubmit = (form: ICollaboratorForm) => {
    if (type === 'register') {
      mutateCreate(form);
    } else {
      mutateUpdate(form);
    }
  };

  useEffect(() => {
    reset(type === 'view' ? {...formData, birthdate: formData?.birthdate?.length === 10 ? formData?.birthdate : '-' } : formData);
  }, [formData]);

  return (
    <>
      {openModalDimiss && (
        <ModalDimiss
          documentId={formData?.documentId as string}
          onClose={() => setOpenModalDimiss(false)}
        />
      )}
      <form
        onSubmit={handleSubmit(onSubmit, errorGroup => console.log(errorGroup))}
      >
        <Header
          title={
            type === 'register'
              ? 'Novo Colaborador'
              : type === 'edit'
              ? 'Editar Colaborador'
              : 'Detalhes do colaborador'
          }
          id={formData?.id}
          buttons={
            type !== 'view' ? (
              <Button type="submit">
                Salvar
                <img src="/img/icons/save.svg" alt="Salvar" />
              </Button>
            ) : formData?.termination_date ? (
              <Button
                type="button"
                onClick={async () => {
                  const url = await exportUserPDF(
                    formData?.documentId as string,
                  );
                  open(url, '_blank');
                }}
              >
                Imprimir
                <img src="/img/icons/print.svg" alt="Imprimir" />
              </Button>
            ) : (
              <>
                <Button
                  buttonStyle="warning"
                  type="button"
                  onClick={() => setOpenModalDimiss(true)}
                >
                  Demitir
                  <img src="/img/icons/fired.svg" alt="Salvar" />
                </Button>
                <Button
                  type="button"
                  onClick={async () => {
                    const url = await exportUserPDF(
                      formData?.documentId as string,
                    );
                    open(url, '_blank');
                  }}
                >
                  Imprimir
                  <img src="/img/icons/print.svg" alt="Imprimir" />
                </Button>
                <Button
                  type="button"
                  onClick={() =>
                    router.push(`/colaboradores/editar/${formData?.documentId}`)
                  }
                >
                  Editar
                  <img src="/img/icons/edit.svg" alt="Editar" />
                </Button>
              </>
            )
          }
        />
        <div className="mt-[60px]! mb-[30px]! flex flex-col gap-[30px] items-center ">
          <fieldset className="max-w-[983px] w-full rounded-[10px] bg-primary pt-[11px]! pb-[40px]! px-[25px]!">
            <span
              role="legend"
              className="block text-[20px] text-secondary font-bold mb-[25px]!"
            >
              Dados pessoais
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-[37px] gap-y-[30px]">
              <Input
                customClassNames="max-w-[286px]"
                readOnly={type === 'view'}
                label="Nome"
                placeholder="Insira o nome"
                {...register('name')}
                error={errors?.name?.message}
              />
              <Input
                customClassNames="max-w-[286px]"
                readOnly={type === 'view'}
                hideMode={type === 'view'}
                label="CPF"
                value={cpfValue}
                maskFunction={maskCPF}
                hiddenFunction={type === 'view' ? hiddenCPF : undefined}
                placeholder="Insira o CPF"
                {...register('cpf')}
                error={errors?.cpf?.message}
              />
              <Input
                customClassNames="max-w-[286px]"
                readOnly={type === 'view'}
                type="phone"
                label="Telefone"
                maskFunction={maskPhone}
                placeholder="Insira o Telefone"
                {...register('phone')}
                error={errors?.phone?.message}
              />
              <Input
                customClassNames="max-w-[286px]"
                readOnly={type === 'view'}
                hideMode={type === 'view'}
                type="email"
                label="E-mail"
                value={emailValue}
                hiddenFunction={type === 'view' ? hiddenkEmail : undefined}
                placeholder="Insira o E-mail"
                {...register('email')}
                error={errors?.email?.message}
              />
              <Input
                customClassNames="max-w-[286px]"
                readOnly={type === 'view'}
                label="Data de nascimento"
                maskFunction={maskDate}
                placeholder="Insira a data de nascimento"
                {...register('birthdate')}
                error={errors?.birthdate?.message}
              />
              <SelectCustom
                readOnly={type === 'view'}
                id={'gender'}
                options={genderOptions}
                control={control}
                label="Sexo"
                placeholder="Selecione"
                {...register('gender')}
                error={errors?.gender?.message}
              />
              {type !== 'view' && (
                <Input
                  customClassNames="max-w-[286px]"
                  type="password"
                  showPasswordButton={
                    !!passwordValue && passwordValue?.length > 0
                  }
                  label="Senha"
                  placeholder="Insira a senha"
                  {...register('password')}
                  error={errors?.password?.message}
                />
              )}
            </div>
          </fieldset>
          <fieldset className="max-w-[983px] w-full rounded-[10px] bg-primary pt-[11px]! pb-[40px]! px-[25px]!">
            <span
              role="legend"
              className="block text-[20px] text-secondary font-bold mb-[25px]!"
            >
              Endereço
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-[37px] gap-y-[30px]">
              <Input
                customClassNames="max-w-[286px]"
                readOnly={type === 'view'}
                label="CEP"
                maskFunction={maskCEP}
                placeholder="Insira o CEP"
                {...register('cep')}
                onBlur={e => buscarCep(e.target.value)}
                error={errors?.cep?.message}
              />
              <Input
                customClassNames="max-w-[286px]"
                readOnly={type === 'view'}
                label="Logradouro"
                placeholder="Insira o logradouro"
                {...register('street')}
                error={errors?.street?.message}
              />
              <Input
                customClassNames="max-w-[286px]"
                readOnly={type === 'view'}
                label="Estado"
                placeholder="Insira o estado"
                {...register('state')}
                error={errors?.state?.message}
              />
              <Input
                customClassNames="max-w-[286px]"
                readOnly={type === 'view'}
                label="Cidade"
                placeholder="Insira a cidade"
                {...register('city')}
                error={errors?.city?.message}
              />
              <Input
                customClassNames="max-w-[286px]"
                readOnly={type === 'view'}
                label="Bairro"
                placeholder="Insira o bairro"
                {...register('neighborhood')}
                error={errors?.neighborhood?.message}
              />
              <Input
                customClassNames="max-w-[286px]"
                readOnly={type === 'view'}
                label="Número"
                maskFunction={unMask}
                placeholder="Insira o número"
                {...register('number')}
                error={errors?.number?.message}
              />
            </div>
          </fieldset>
          <fieldset className="max-w-[983px] w-full rounded-[10px] bg-primary pt-[11px]! pb-[40px]! px-[25px]!">
            <span
              role="legend"
              className="block text-[20px] text-secondary font-bold mb-[25px]!"
            >
              Dados profissionais
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-[37px] gap-y-[30px]">
              <Input
                customClassNames="max-w-[286px]"
                readOnly={type === 'view'}
                label="Data da admissão"
                maskFunction={maskDate}
                placeholder="Insira a data de admissão"
                {...register('admission_date')}
                error={errors?.admission_date?.message}
              />
              <SelectCustom
                readOnly={type === 'view'}
                id={'role'}
                options={roleOptions}
                control={control}
                label="Natureza do cargo"
                placeholder="Selecione"
                {...register('role')}
                error={errors?.role?.message}
              />
              <Input
                customClassNames="max-w-[286px]"
                readOnly={type === 'view'}
                label="Setor"
                placeholder="Insira o Setor"
                {...register('sector')}
                error={errors?.sector?.message}
              />
              <Input
                customClassNames="max-w-[286px]"
                readOnly={type === 'view'}
                label="CBO"
                placeholder="Insira o número"
                {...register('cbo')}
                error={errors?.cbo?.message}
              />
              <Input
                customClassNames="max-w-[286px]"
                readOnly={type === 'view'}
                label="Salário inicial"
                maskFunction={maskMoney}
                placeholder="Insira o valor"
                {...register('salary')}
                error={errors?.salary?.message}
              />
              <SelectCustom
                readOnly={type === 'view'}
                id={'payment_method'}
                options={paymentMethodOptions}
                control={control}
                label="Forma de pagamento"
                placeholder="Selecione"
                {...register('payment_method')}
                error={errors?.payment_method?.message}
              />
              {type === 'view' && formData?.termination_date && (
                <>
                  <Input
                    customClassNames="max-w-[286px]"
                    readOnly={type === 'view'}
                    label="Data de desligamento"
                    maskFunction={maskDate}
                    placeholder="Insira a data de desligamento"
                    {...register('termination_date')}
                    error={errors?.termination_date?.message}
                  />
                  <Input
                    customClassNames="max-w-[286px]"
                    readOnly={type === 'view'}
                    label="Tipo de rescisão"
                    placeholder="Insira a tipo de rescisão"
                    {...register('contractual_rescission')}
                    error={errors?.contractual_rescission?.message}
                  />
                  <Textarea
                    rows={5}
                    wrap="hard"
                    maxwidth="max-w-[286px]"
                    readOnly={type === 'view'}
                    label="Observações"
                    placeholder="Insira as observações"
                    {...register('observation')}
                    error={errors?.observation?.message}
                  />
                </>
              )}
            </div>
          </fieldset>
          <fieldset className="max-w-[983px] w-full rounded-[10px] bg-primary pt-[11px]! pb-[40px]! px-[25px]!">
            <span
              role="legend"
              className="block text-[20px] text-secondary font-bold mb-[25px]!"
            >
              Horário de trabalho
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-[37px] gap-y-[30px]">
              <MultiSelect
                readOnly={type === 'view'}
                id={'working_days'}
                options={weekDayOptions}
                control={control}
                label="Dias de trabalho"
                placeholder="Selecione"
                {...register('working_days')}
                error={errors?.working_days?.message}
              />
              <Input
                customClassNames="max-w-[286px]"
                readOnly={type === 'view'}
                label="Horario de trabalho"
                placeholder="Insira o horario"
                maskFunction={maskHourInterval}
                {...register('work_schedule')}
                error={errors?.work_schedule?.message}
              />
              <Input
                customClassNames="max-w-[286px]"
                readOnly={type === 'view'}
                label="Horario de refeicao"
                placeholder="Insira o horario"
                maskFunction={maskHourInterval}
                {...register('meal_time')}
                error={errors?.meal_time?.message}
              />
            </div>
          </fieldset>
        </div>
      </form>
    </>
  );
};

export default CollaboratorForm;
