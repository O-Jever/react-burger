import PropTypes from 'prop-types';

import './styles.css';

type ModalOverlayProps = {
    onClick: () => void;
};

export const ModalOverlay = ({onClick}: ModalOverlayProps) => {
    return (
        <div className='modal-overlay' onClick={onClick}/>
    );
};

ModalOverlay.propTypes = {
    onClick: PropTypes.func.isRequired
};