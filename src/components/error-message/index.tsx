import { FC } from 'react';

import './styles.css';

type ErrorMessageProps = {
  text: string;
};

export const ErrorMessage: FC<ErrorMessageProps> = ({ text }) => {
  return <span className='text text_type_main-default error-message mb-6'>{text}</span>;
};
