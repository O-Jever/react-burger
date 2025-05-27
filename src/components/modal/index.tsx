import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { ReactElement, useEffect } from 'react';
import { createPortal } from 'react-dom';

import { ModalOverlay } from '../modal-overlay';

import './styles.css';

type ModalProps = {
    title?: string;
    children: ReactElement;
    onClose: () => void;
};

export const Modal = ({ title, children, onClose }: ModalProps) => {
    const modalRoot = document.getElementById('react-modals');

    useEffect(() => {
        const onEscape: (this: Window, ev: WindowEventMap['keydown']) => void = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', onEscape);

        return () => {
            window.removeEventListener('keydown', onEscape);
        }
    }, [onClose]);

    const modalContent = () => {
        return (
            <>
                <ModalOverlay onClick={onClose}/>
                <div className='modal'>
                    <div className='modal-header ml-10 mt-10 mr-10'>
                        <h3 className='text text_type_main-large'>{title}</h3>
                        <CloseIcon className='modal-close' type="primary" onClick={onClose} />
                    </div>
                    { children }
                </div>
            </>
        );
    };

    return modalRoot ? createPortal(modalContent(), modalRoot) : null;
};

Modal.propTypes = {
    title: PropTypes.string,
    children: PropTypes.element.isRequired,
    onClose: PropTypes.func.isRequired
};
