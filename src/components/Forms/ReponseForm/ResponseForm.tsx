import Textarea2 from '@/components/Inputs/Textarea2/Textarea2';
import Modal from '@/components/Modals/Modal/Modal';
import { IResponseForm, ResponseSchema } from '@/validations/ResponseSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

interface Props {
  onClose: () => void;
}

const ResponseForm = ({ onClose }: Props) => {
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IResponseForm>({
    mode: 'onChange',
    resolver: yupResolver(ResponseSchema),
  });

  const onSubmit = (form: IResponseForm) => {
    console.log(form);
    setOpenSuccessModal(true);
  };

  return (
    <form
      className="w-full flex flex-col gap-[14px]"
      onSubmit={handleSubmit(onSubmit)}
    >
      {openSuccessModal && (
        <Modal
          message1="Sucesso!"
          message2="Resposta enviada com sucesso!"
          buttons={[
            {
              onClick: onClose,
              text: 'Voltar',
            },
          ]}
        />
      )}
      <div className="flex items-center gap-[10px]">
        <span className="text-secondary text-[24px] font-normal">
          Responder
        </span>
        <img src="/img/icons/response_active.svg" alt="Resposta" />
      </div>
      <Textarea2
        rows={5}
        wrap="hard"
        placeholder="Insira a resposta"
        {...register('response')}
        error={errors?.response?.message}
      />
      <div className=" w-full flex items-center justify-center gap-[20px]">
        <button
          onClick={onClose}
          type="button"
          className={`rounded-[10px] flex items-center justify-center w-full h-[59px] border-1 border-primary2 bg-primary2 font-normal text-[24px] text-white`}
        >
          Cancelar
        </button>
        <button
          type="submit"
          className={`rounded-[10px] flex items-center justify-center w-full h-[59px] border-1 bg-secondary font-normal text-[24px] text-primary2`}
        >
          Responder
        </button>
      </div>
    </form>
  );
};

export default ResponseForm;
