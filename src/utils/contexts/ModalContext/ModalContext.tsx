import { createContext, ReactNode, useState } from 'react';

import BaseModal from '@/utils/modals/BaseModal';

type ModalContextType = {
  isOpenWelcome: boolean;
  setIsOpenWelcome: (open: boolean) => void;
  isOpenModal: boolean;
  setIsOpenModal: (open: boolean) => void;
  openModal: (modalClass: BaseModal) => void;
  closeModal: () => void;
  modal: BaseModal | null;
};

export const ModalContext = createContext<ModalContextType>({
  isOpenWelcome: false,
  setIsOpenWelcome: (value: boolean) => {},
  isOpenModal: false,
  setIsOpenModal: (value: boolean) => {},
  openModal: (modalClass: BaseModal) => {},
  closeModal: () => {},
  modal: null,
});

export function ModalContextProvider({ children }: { children: ReactNode }) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenWelcome, setIsOpenWelcomeFunction] = useState(false);
  const [modal, setModal] = useState<BaseModal | null>(null);

  const openModal = (modalClass: BaseModal) => {
    setIsOpenModal(true);
    setModal(modalClass);
  };

  const closeModal = () => {
    setIsOpenModal(false);
    setModal(null);
  };

  const setIsOpenWelcome = (value: boolean) => {
    setIsOpenWelcomeFunction(value);
  };

  return (
    <ModalContext.Provider
      value={{
        isOpenWelcome,
        setIsOpenWelcome,
        isOpenModal,
        setIsOpenModal,
        openModal,
        closeModal,
        modal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}
