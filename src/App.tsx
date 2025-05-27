import { useEffect, useState } from 'react';

import { AppHeader } from './components/app-header';
import { BurgerConstructor } from './components/burger-constructor';
import { BurgerIngredients } from './components/burger-ingredients';
import { Cart } from './types/cart';
import { Ingredient } from './types/ingredient';

import './App.css';

const URL_INGREDIENT = 'https://norma.nomoreparties.space/api/ingredients';

function App() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [cart, setCart] = useState<Cart>({bun: undefined, fillings: []});

  useEffect(() => {
    fetch(URL_INGREDIENT).then(response => response.json())
    .then(response => setIngredients(response.data))
    .catch(error => setErrorMessage(error))
  }, []);

  useEffect(() => {
    const bun = ingredients.find((ingredient) => ingredient.type === 'bun');
    const fillings = ingredients.filter((ingredient, idx) => ingredient.type !== 'bun' && idx % 2);

    setCart({bun, fillings});
  }, [ingredients]);

  return (
    <>
      <div className="app">
        { errorMessage ?
          errorMessage :
          (<>
            <AppHeader />
            <div className='mb-10' style={{ display: 'flex', maxWidth: '1240px'}}>
              <BurgerIngredients ingredients={ingredients} cart={cart} />
              <BurgerConstructor bun={cart.bun} fillings={cart.fillings} />
            </div>
          </>)
        }
      </div>
      <div id="react-modals"></div>
    </>
  );
}

export default App;
