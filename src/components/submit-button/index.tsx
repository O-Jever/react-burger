import { Button } from '@ya.praktikum/react-developer-burger-ui-components';

import './styles.css';
import PropTypes from 'prop-types';

type SubmitButtonProps = {
    children: string;
    isLoading: boolean;
    disabled?: boolean
};

export const SubmitButton = (props: SubmitButtonProps) => {
    const { children, isLoading, disabled = false } = props;

    return (
        <Button htmlType={'submit'} type="primary" disabled={disabled}>
            {isLoading ? <div className='loader-wrapper'><div className='loader'></div></div> : null}
            <span className={isLoading ? 'hide-text' : ''}>{ children }</span>
        </Button>
    );
};

SubmitButton.propTypes = {
    children: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired,
    disabled: PropTypes.bool,
};
