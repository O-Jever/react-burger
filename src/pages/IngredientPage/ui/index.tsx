import { FC, useMemo } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { useGetIngredientsQuery } from '@/api/server.api';
import { IngredientDetails } from '@/components/ingredient-details';
import { Modal } from '@/components/modal';
import { LocationState } from '@/types/location';

import './styles.css';

export const IngredientPage: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const state: LocationState | undefined = useLocation().state;
  const { data: ingredients = [] } = useGetIngredientsQuery();

  const ingredient = useMemo(() => ingredients.find((item) => item._id === id), [ingredients, id]);

  return state?.modal ? (
    <Modal title='Детали ингредиента' onClose={() => void navigate(-1)}>
      <IngredientDetails ingredient={ingredient} />
    </Modal>
  ) : (
    <div className='ingredient-wrapper'>
      <span className='text text_type_main-large'>Детали ингредиента</span>
      <IngredientDetails ingredient={ingredient} />
    </div>
  );
};
