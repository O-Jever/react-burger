import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Ingredient } from '@/types/ingredient';

export type BurgerIngredient = Ingredient & {
  uuid: string;
};

export type BurgerIngredientWithSortOrder = BurgerIngredient & {
  sortOrder: number;
};

export type Burger = {
  bun?: BurgerIngredient;
  fillings: BurgerIngredientWithSortOrder[];
};

const initialState: Burger = {
  fillings: [],
};

type SetSortOrderPayload = {
  uuid: string;
  newSortOrder: number;
};

export const burgerSlice = createSlice({
  name: 'burger',
  initialState,
  reducers: {
    setBun: (state, action: PayloadAction<BurgerIngredient>) => ({
      ...state,
      bun: action.payload,
    }),
    addFilling: (state, action: PayloadAction<BurgerIngredientWithSortOrder>) => ({
      ...state,
      fillings: [...state.fillings, action.payload],
    }),
    removeFilling: (state, action: PayloadAction<BurgerIngredientWithSortOrder>) => ({
      ...state,
      fillings: state.fillings.filter((filling) => filling.uuid !== action.payload.uuid),
    }),
    setNewSortOrder: (state, action: PayloadAction<SetSortOrderPayload>) => {
      const movedFilling = state.fillings.find((filling) => filling.uuid === action.payload.uuid);

      if (!movedFilling || movedFilling.sortOrder === action.payload.newSortOrder) {
        return state;
      }

      const oldSortOrder = movedFilling.sortOrder;

      if (oldSortOrder > action.payload.newSortOrder) {
        state.fillings.forEach((filling) => {
          if (filling.sortOrder >= action.payload.newSortOrder && filling.sortOrder < oldSortOrder) {
            filling.sortOrder++;
          }
        });
      } else {
        state.fillings.forEach((filling) => {
          if (filling.sortOrder > oldSortOrder && filling.sortOrder <= action.payload.newSortOrder) {
            filling.sortOrder--;
          }
        });
      }

      movedFilling.sortOrder = action.payload.newSortOrder;

      return state;
    },
    clearBurger: () => initialState,
  },
});

export const { setBun, addFilling, removeFilling, setNewSortOrder, clearBurger } = burgerSlice.actions;

export default burgerSlice.reducer;
