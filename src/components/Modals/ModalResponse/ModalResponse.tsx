import ResponseForm from '@/components/Forms/ReponseForm/ResponseForm';
import React from 'react';

interface Props {
  onClose: () => void;
}

const ModalResponse = ({ onClose }: Props) => {
  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 flex items-center justify-center bg-[rgba(40,40,40,.3)] z-[999]">
      <div
        className={`rounded-[12px] shadow-[0px_0px_10px_0px_rgba(0, 0, 0, 0.25)] max-w-[521px] w-full py-[15px]! px-[25px]! bg-primary flex flex-col items-center justify-center`}
      >
        <ResponseForm onClose={onClose} />
      </div>
    </div>
  );
};

export default ModalResponse;
