import { Ingredient } from './ingredient';

export type Cart = {
    bun?: Ingredient;
    fillings?: Ingredient[];
};