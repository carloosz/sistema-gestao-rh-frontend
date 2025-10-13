import Textarea2 from '@/components/Inputs/Textarea2/Textarea2';
import Modal from '@/components/Modals/Modal/Modal';
import { useDismissUser } from '@/services/requests/collaborators/dismissUser';
import handleError from '@/utils/handleToast';
import { DismissSchema, IDismissForm } from '@/validations/DismissSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { typeOfTerminationOptions } from './data';
import SelectCustom2 from '@/components/Inputs/Select2/Select2';
import { useQueryClient } from '@tanstack/react-query';
import Modal2 from '@/components/Modals/Modal2/Modal2';

interface Props {
  documentId: string;
  onClose: () => void;
}

const DimissForm = ({ documentId, onClose }: Props) => {
  const queryClient = useQueryClient();
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<IDismissForm>({
    mode: 'onChange',
    resolver: yupResolver(DismissSchema),
    defaultValues: {
      documentId,
    },
  });

  const { mutate } = useDismissUser({
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['collaborators'] });
      await queryClient.invalidateQueries({ queryKey: ['collaborator'] });
      setOpenSuccessModal(true);
    },
    onError: error => handleError(error),
  });

  const onSubmit = (form: IDismissForm) => {
    mutate(form);
  };

  return (
    <form
      className="w-full flex flex-col gap-[14px]"
      onSubmit={handleSubmit(onSubmit, errorGroup => console.log(errorGroup))}
    >
      {openSuccessModal && (
        <Modal2
          message="Demissão realizada!"
          img="/img/icons/check_circle.svg"
          buttons={[
            {
              onClick: onClose,
              text: 'Voltar',
            },
          ]}
        />
      )}
      <div className="w-full flex flex-col justify-center">
        <span className="text-center text-secondary text-[36px] font-normal">
          Demitir colaborador
        </span>
        <span className="text-center text-secondary text-[18px] font-normal">
          (Esta ação não poderá ser desfeita)
        </span>
      </div>
      <SelectCustom2
        id={'type'}
        options={typeOfTerminationOptions}
        control={control}
        placeholder="Escolha o tipo da rescisão"
        {...register('type_of_termination')}
        error={errors?.type_of_termination?.message}
      />
      <Textarea2
        rows={5}
        wrap="hard"
        placeholder="Insira a observação"
        {...register('observation')}
        error={errors?.observation?.message}
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
          Demitir
        </button>
      </div>
    </form>
  );
};

export default DimissForm;
