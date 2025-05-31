import PropTypes from 'prop-types';

import './styles.css';

type BurgerConstructorEmptyElementProps = {
    text: string;
    type?: 'top' | 'bottom';
};

export const BurgerConstructorEmptyElement = ({ text, type }: BurgerConstructorEmptyElementProps) => {
    const additionalClass = type
        ? type === 'top' ? 'constructor-element_pos_top' : 'constructor-element_pos_bottom'
        : '';

    return (
        <div className={`constructor-element ml-8 ${additionalClass}`}>
            <span className='empty-constructor-element'>{text}</span>
        </div>
    );
};

BurgerConstructorEmptyElement.propTypes = {
    text: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['top' , 'bottom']),
};
