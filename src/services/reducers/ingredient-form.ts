import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Ingredient } from '../../types/ingredient';

type IngredientForm = {
    ingredient: Ingredient | null;
};

const initialState: IngredientForm = {
    ingredient: null
};

export const ingredientFormSlice = createSlice({
    name: 'ingredientForm',
    initialState,
    reducers: {
        setFormIngredient: (_, action: PayloadAction<Ingredient>) => ({ingredient: action.payload}),
        removeFormIngredient: () => ({ingredient: null}),
    },
});

export const { setFormIngredient, removeFormIngredient } = ingredientFormSlice.actions;

export default ingredientFormSlice.reducer;
  