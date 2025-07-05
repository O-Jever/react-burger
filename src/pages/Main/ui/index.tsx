import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

import { BurgerIngredients } from '@/components/burger-ingredients';
import { BurgerConstructor } from '@/components/burger-constructor';

import './styles.css';

export function MainPage() {
  return (
    <>
      <div className='main-wrapper'>
        <DndProvider backend={HTML5Backend}>
          <div className='main-content'>
            <BurgerIngredients />
            <BurgerConstructor />
          </div>
        </DndProvider>
      </div>
    </>
  );
}
