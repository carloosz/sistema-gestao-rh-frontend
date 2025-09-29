import Button from '@/components/Buttons/Button/Button';
import Header from '@/components/Header/Header';
import Input from '@/components/Inputs/Input/Input';
import SelectCustom from '@/components/Inputs/Select/Select';
import {
  maskCEP,
  maskCPF,
  maskDate,
  maskMoney,
  maskPhone,
  unMask,
} from '@/utils/masks';
import React from 'react';
import { useForm } from 'react-hook-form';
import {
  genderOptions,
  paymentMethodOptions,
  roleOptions,
  weekDayOptions,
} from './data';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  CollaboratorSchema,
  ICollaboratorForm,
} from '@/validations/CollaboratorSchema';
import MultiSelect from '@/components/Inputs/MultiSelect/MultiSelect';
import { useRouter } from 'next/navigation';
import Textarea from '@/components/Inputs/Textarea/Textarea';

interface Props {
  type?: 'register' | 'edit' | 'view';
  formData?: ICollaboratorForm;
}

const CollaboratorForm = ({ type = 'register', formData }: Props) => {
  const router = useRouter();
  const {
    register,
    watch,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ICollaboratorForm>({
    mode: 'onChange',
    resolver: yupResolver(CollaboratorSchema),
    defaultValues: formData,
  });

  const passwordValue = watch('password');

  const onSubmit = (form: ICollaboratorForm) => {
    console.log(form);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
            <Button type="button">
              Imprimir
              <img src="/img/icons/print.svg" alt="Imprimir" />
            </Button>
          ) : (
            <>
              <Button buttonStyle="warning" type="button">
                Demitir
                <img src="/img/icons/fired.svg" alt="Salvar" />
              </Button>
              <Button type="button">
                Imprimir
                <img src="/img/icons/print.svg" alt="Imprimir" />
              </Button>
              <Button
                type="button"
                onClick={() =>
                  router.push(`/colaboradores/editar/${formData?.id}`)
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
          <div className="grid grid-cols-3 gap-x-[37px] gap-y-[30px]">
            <Input
              maxwidth="286px"
              readOnly={type === 'view'}
              label="Nome"
              placeholder="Insira o nome"
              {...register('name')}
              error={errors?.name?.message}
            />
            <Input
              maxwidth="286px"
              readOnly={type === 'view'}
              label="CPF"
              maskFunction={maskCPF}
              placeholder="Insira o CPF"
              {...register('cpf')}
              error={errors?.cpf?.message}
            />
            <Input
              maxwidth="286px"
              readOnly={type === 'view'}
              type="phone"
              label="Telefone"
              maskFunction={maskPhone}
              placeholder="Insira o Telefone"
              {...register('phone')}
              error={errors?.phone?.message}
            />
            <Input
              maxwidth="286px"
              readOnly={type === 'view'}
              type="email"
              label="E-mail"
              placeholder="Insira o E-mail"
              {...register('email')}
              error={errors?.email?.message}
            />
            <Input
              maxwidth="286px"
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
                maxwidth="286px"
                type="password"
                showPasswordButton={passwordValue?.length > 0}
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
          <div className="grid grid-cols-3 gap-x-[37px] gap-y-[30px]">
            <Input
              maxwidth="286px"
              readOnly={type === 'view'}
              label="CEP"
              maskFunction={maskCEP}
              placeholder="Insira o CEP"
              {...register('cep')}
              error={errors?.cep?.message}
            />
            <Input
              maxwidth="286px"
              readOnly={type === 'view'}
              label="Logradouro"
              placeholder="Insira o logradouro"
              {...register('street')}
              error={errors?.street?.message}
            />
            <Input
              maxwidth="286px"
              readOnly={type === 'view'}
              label="Estado"
              placeholder="Insira o estado"
              {...register('state')}
              error={errors?.state?.message}
            />
            <Input
              maxwidth="286px"
              readOnly={type === 'view'}
              label="Cidade"
              placeholder="Insira a cidade"
              {...register('city')}
              error={errors?.city?.message}
            />
            <Input
              maxwidth="286px"
              readOnly={type === 'view'}
              label="Bairro"
              placeholder="Insira o bairro"
              {...register('neighborhood')}
              error={errors?.neighborhood?.message}
            />
            <Input
              maxwidth="286px"
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
          <div className="grid grid-cols-3 gap-x-[37px] gap-y-[30px]">
            <Input
              maxwidth="286px"
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
              maxwidth="286px"
              readOnly={type === 'view'}
              label="Setor"
              placeholder="Insira o Setor"
              {...register('sector')}
              error={errors?.sector?.message}
            />
            <Input
              maxwidth="286px"
              readOnly={type === 'view'}
              label="CBO"
              placeholder="Insira o número"
              {...register('cbo')}
              error={errors?.cbo?.message}
            />
            <Input
              maxwidth="286px"
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
                  maxwidth="286px"
                  readOnly={type === 'view'}
                  label="Data de desligamento"
                  maskFunction={maskDate}
                  placeholder="Insira a data de desligamento"
                  {...register('termination_date')}
                  error={errors?.termination_date?.message}
                />
                <Input
                  maxwidth="286px"
                  readOnly={type === 'view'}
                  label="Tipo de rescisão"
                  placeholder="Insira a tipo de rescisão"
                  {...register('contractual_rescission')}
                  error={errors?.contractual_rescission?.message}
                />
                <Textarea
                  rows={5}
                  wrap="hard"
                  maxwidth="286px"
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
          <div className="grid grid-cols-3 gap-x-[37px] gap-y-[30px]">
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
              maxwidth="286px"
              readOnly={type === 'view'}
              label="Horario de trabalho"
              placeholder="Insira o horario"
              {...register('work_schedule')}
              error={errors?.work_schedule?.message}
            />
            <Input
              maxwidth="286px"
              readOnly={type === 'view'}
              label="Horario de refeicao"
              placeholder="Insira o horario"
              {...register('meal_time')}
              error={errors?.meal_time?.message}
            />
          </div>
        </fieldset>
      </div>
    </form>
  );
};

export default CollaboratorForm;
