import { FC } from 'react';

import './styles.css';

type BurgerConstructorEmptyElementProps = {
  text: string;
  type?: 'top' | 'bottom';
};

export const BurgerConstructorEmptyElement: FC<BurgerConstructorEmptyElementProps> = ({ text, type }) => {
  const additionalClass = type
    ? type === 'top'
      ? 'constructor-element_pos_top'
      : 'constructor-element_pos_bottom'
    : '';

  return (
    <div className={`constructor-element ml-8 ${additionalClass}`}>
      <span className='empty-constructor-element'>{text}</span>
    </div>
  );
};
