import { FC, MouseEventHandler } from 'react';

import './styles.css';

type ModalOverlayProps = {
  onClick: MouseEventHandler;
};

export const ModalOverlay: FC<ModalOverlayProps> = ({ onClick }) => {
  return <div className='modal-overlay' onClick={onClick} />;
};
