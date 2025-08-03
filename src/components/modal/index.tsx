import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC, ReactElement, useEffect } from 'react';
import { createPortal } from 'react-dom';

import { ModalOverlay } from '@/components/modal-overlay';

import './styles.css';

type ModalProps = {
  title?: string | ReactElement;
  children: ReactElement;
  onClose: () => void;
};

export const Modal: FC<ModalProps> = ({ title, children, onClose }) => {
  const modalRoot = document.getElementById('react-modals');

  useEffect(() => {
    const onEscape: (this: Window, ev: WindowEventMap['keydown']) => void = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', onEscape);

    return () => {
      window.removeEventListener('keydown', onEscape);
    };
  }, [onClose]);

  const modalContent = () => {
    return (
      <>
        <ModalOverlay onClick={onClose} />
        <div data-cy='modal' className='modal'>
          <div className='modal-header ml-10 mt-10 mr-10'>
            <h3 data-cy='modal-title' className='text text_type_main-large'>{title}</h3>
            <div className='modal-close' data-cy='modal-close'>
              <CloseIcon type='primary' onClick={onClose} />
            </div>
          </div>
          {children}
        </div>
      </>
    );
  };

  return modalRoot ? createPortal(modalContent(), modalRoot) : modalContent();
};
