import { string } from 'prop-types';
import './styles.css';

type ErrorMessageProps = {
    text: string;
};

export const ErrorMessage = ({ text }: ErrorMessageProps) => {
    return (
        <span className="text text_type_main-default error-message mb-6">{text}</span>
    );
};

ErrorMessage.propTypes = {
    text: string.isRequired,
};
