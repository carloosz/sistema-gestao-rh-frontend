import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ILoginForm, LoginSchema } from '@/validations/LoginSchema';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Input from '@/components/Inputs/Input/Input';
import Modal from '@/components/Modals/Modal/Modal';
import Checkbox from '@/components/Inputs/Checkbox/Checkbox';
import Link from 'next/link';
import handleError from '@/utils/handleToast';

const LoginForm = () => {
  // const { login } = useAuth();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [openWarningModal, setOpenWarningModal] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ILoginForm>({
    mode: 'onChange',
    resolver: yupResolver(LoginSchema),
    // defaultValues: {
    //   email: 'master@tedesafio.com',
    //   password: '12345678',
    // },
  });
  const passwordValue = watch('password');

  const onSubmit: SubmitHandler<ILoginForm> = async (form: ILoginForm) => {
    try {
      if (isSubmitting) {
        return;
      }

      setIsSubmitting(true);
      // await login(form);
      router.push('/colaboradores');
    } catch (error) {
      handleError(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      className="w-full flex flex-col gap-[40px]"
      onSubmit={handleSubmit(onSubmit)}
    >
      {openWarningModal && (
        <Modal
          //modalType="warning"
          message1="E-mail ou senha incorretos"
          message2="Não conseguimos encontrar uma conta com essas credenciais. Verifique se digitou seu e-mail e senha corretamente."
          buttons={[
            {
              text: 'Tente novamente',
              onClick: () => setOpenWarningModal(false),
            },
          ]}
        />
      )}
      <fieldset className="flex flex-col gap-6 mb-[68px]!">
        <Input
          type="email"
          label="E-mail"
          autoComplete="on"
          placeholder="Digite seu e-mail"
          {...register('email')}
          error={errors?.email?.message}
        />

        <div className="flex flex-col gap-[16px]">
          <Input
            type="password"
            showPasswordButton={passwordValue?.length > 0}
            label="Senha"
            placeholder="Digite sua senha"
            autoComplete="on"
            {...register('password')}
            error={errors?.password?.message}
          />
        </div>
      </fieldset>
      <button
        className="w-full h-[44px] text-primary bg-secondary font-bold text-[16px] rounded-[8px]"
        type="submit"
        disabled={isSubmitting}
      >
        Entrar
      </button>
    </form>
  );
};

export default LoginForm;
