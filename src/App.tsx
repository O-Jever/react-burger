import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

import { AppHeader } from './components/app-header';
import { BurgerConstructor } from './components/burger-constructor';
import { BurgerIngredients } from './components/burger-ingredients';

import './App.css';
import { useGetIngredientsQuery } from './api/server.api';

function App() {
  const query = useGetIngredientsQuery();

  return (
    <>
      <div className="app">
        { query.error && 'message' in query.error ?
          query.error.message :
          (<>
            <AppHeader />
            <DndProvider backend={HTML5Backend}>
              <div className='mb-10 app-content'>
                <BurgerIngredients />
                <BurgerConstructor />
              </div>
            </DndProvider>
          </>)
        }
      </div>
      <div id="react-modals"></div>
    </>
  );
}

export default App;
