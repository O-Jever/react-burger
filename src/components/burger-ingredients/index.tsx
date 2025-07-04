import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { useMemo, useRef, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { IngredientComponent } from '../ingredient';
import { Ingredient, IngredientType } from '../../types/ingredient';
import { useAppSelector } from '../../services/hooks';
import { useGetIngredientsQuery } from '../../api/server.api';

import './styles.css';

const BUN = 'bun';
const SAUCE = 'sauce';
const MAIN = 'main';

const INGREDIENT_TYPES = [BUN, SAUCE, MAIN] as const;

type GroupedIngredients = {
  [BUN]: Ingredient[];
  [MAIN]: Ingredient[];
  [SAUCE]: Ingredient[];
};

export const BurgerIngredients = () => {
  const [currentTab, setCurrentTab] = useState<string>(BUN);
  const { data: ingredients = [] } = useGetIngredientsQuery();
  const burger = useAppSelector((state) => state.burger);
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  const bunTitleRef = useRef(null);
  const mainTitleRef = useRef(null);
  const sauceTitleRef = useRef(null);

  const getTitleRef = (type: string) => {
    switch (type) {
      case BUN:
        return bunTitleRef;
      case SAUCE:
        return sauceTitleRef;
      case MAIN:
        return mainTitleRef;
      default:
        return mainTitleRef;
    }
  };

  const groupedIngredients = useMemo(
    () =>
      ingredients.reduce<GroupedIngredients>(
        (acc, item) => {
          acc[item.type].push(item);
          return acc;
        },
        { [BUN]: [], [MAIN]: [], [SAUCE]: [] }
      ),
    [ingredients]
  );

  const isActive = (value: string): boolean => {
    return currentTab === value;
  };

  const getTitleByType = (type: IngredientType) => {
    switch (type) {
      case MAIN:
        return 'Начинки';
      case SAUCE:
        return 'Соусы';
      case BUN:
        return 'Булки';
      default:
        return '';
    }
  };

  const getCountInBurger = (ingredient: Ingredient) => {
    if (ingredient.type === BUN) {
      return burger.bun?._id === ingredient._id ? 1 : 0;
    }

    return (burger.fillings ?? []).reduce((sum, filling) => {
      if (filling._id === ingredient._id) {
        sum++;
      }

      return sum;
    }, 0);
  };

  const handleScroll = (event: any) => {
    if (
      event.target.scrollTop >= (bunTitleRef as any).current.offsetTop &&
      event.target.scrollTop < (sauceTitleRef as any).current.offsetTop
    ) {
      currentTab !== BUN && setCurrentTab(BUN);
    } else if (
      event.target.scrollTop >= (sauceTitleRef as any).current.offsetTop &&
      event.target.scrollTop < (mainTitleRef as any).current.offsetTop
    ) {
      currentTab !== SAUCE && setCurrentTab(SAUCE);
    } else if (currentTab !== MAIN) {
      currentTab !== MAIN && setCurrentTab(MAIN);
    }
  };

  const goToIngredient = (ingredient: Ingredient) => {
    void navigate(`/ingredients/${ingredient._id}`, { state: { modal: true } });
  };

  const scrollToIngredientsBlock = (type: string) => {
    const currentTitleRef = getTitleRef(type);
    (scrollRef as any).current.scrollTo({
      top: (currentTitleRef as any).current.offsetTop + 1,
      behavior: 'smooth',
    });
  };

  return (
    <div className='burger-ingredients mr-10'>
      <div className='mt-10 mb-10'>
        <h1 className='mb-5 text text_type_main-large'>Соберите бургер</h1>
        <div className='burger-ingredients-tabs'>
          {INGREDIENT_TYPES.map((type) => {
            return (
              <Tab key={type} value={type} active={isActive(type)} onClick={scrollToIngredientsBlock}>
                {getTitleByType(type)}
              </Tab>
            );
          })}
        </div>
      </div>
      <div ref={scrollRef} className='burger-ingredients-container burger-scrollbar' onScroll={handleScroll}>
        {INGREDIENT_TYPES.map((type) => {
          return (
            <div key={type}>
              <h2 ref={getTitleRef(type)} className='text text_type_main-medium'>
                {getTitleByType(type)}
              </h2>
              <div className='pt-6 pb-10 pr-4 pl-4 ingredients-wrapper'>
                {groupedIngredients[type].map((ingredient) => {
                  return (
                    <IngredientComponent
                      onClick={() => goToIngredient(ingredient)}
                      ingredient={ingredient}
                      count={getCountInBurger(ingredient)}
                      key={ingredient._id}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      <Outlet />
    </div>
  );
};
