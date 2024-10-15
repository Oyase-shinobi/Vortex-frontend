import { useContext } from 'react';

import ButtonDiv from '@/lib/ButtonDiv/ButtonDiv';

import { ModalContext } from '@/utils/contexts/ModalContext/ModalContext';

import './ModalScaffold.scss';

const ModalScaffold = () => {
  const { isOpenModal, modal, closeModal } = useContext(ModalContext);

  if (!isOpenModal) return null;

  return (
    <div className="modal-scaffold">
      <div className="modal-content">{modal?.getModalContent() ?? ''}</div>
      <ButtonDiv
        className="backdrop"
        onClick={modal?.backdropClose ? closeModal : () => {}}
      />
    </div>
  );
};

export default ModalScaffold;
