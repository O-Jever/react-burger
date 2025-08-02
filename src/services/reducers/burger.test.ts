import {describe, it, expect} from 'vitest'
import reducer, {setBun, addFilling, removeFilling, setNewSortOrder, clearBurger, BurgerIngredient, Burger, BurgerIngredientWithSortOrder} from './burger'

function mockBun(bun: Partial<Omit<BurgerIngredient, 'type'>> = {}): BurgerIngredient {
  return {
    uuid: 'uuid',
    _id: 'id',
    name: 'bun',
    type: 'bun',
    proteins: 0,
    fat: 0,
    carbohydrates: 0,
    calories: 0,
    price: 100,
    image: 'default-image',
    image_mobile: 'mobile-image',
    image_large: 'large-image',
    __v: 10,
    ...bun
  }
}

function mockFilling(filling: Partial<Omit<BurgerIngredientWithSortOrder, 'type'>> & {type: 'main' | 'sauce'}): BurgerIngredientWithSortOrder {
  return {
    uuid: 'uuid',
    sortOrder: 0,
    _id: 'id',
    name: filling.type,
    proteins: 0,
    fat: 0,
    carbohydrates: 0,
    calories: 0,
    price: 100,
    image: 'default-image',
    image_mobile: 'mobile-image',
    image_large: 'large-image',
    __v: 10,
    ...filling
  }
}

describe('burger reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {} as BurgerIngredient)).toEqual({
      fillings: []
    });
  })

  it('should handle burger/setBun action', () => {
    const bun = mockBun();
    expect(
      reducer(undefined, setBun(bun))
    ).toEqual({
      bun,
      fillings: []
    });
  });

  it('should handle burger/addFilling action', () => {
    const main = mockFilling({type: 'main'});
    let state = reducer(undefined, addFilling(main));

    expect(state).toEqual({
      fillings: [main]
    });

    const sauce = mockFilling({type: 'sauce', uuid: 'another-uuid', _id: 'id-2', sortOrder: 1});

    expect(
      reducer(state, addFilling(sauce))
    ).toEqual({
      fillings: [main, sauce]
    });
  });

  it('should handle burger/removeFilling action', () => {
    const main = mockFilling({type: 'main'});
    const sauce = mockFilling({type: 'sauce', uuid: 'another-uuid', _id: 'id-2', sortOrder: 1});

    const state: Burger = {
      fillings: [main, sauce]
    };

    expect(
      reducer(state, removeFilling(main))
    ).toEqual({
      fillings: [sauce]
    });
  });

  it('should handle burger/setNewSortOrder action', () => {
    const main = mockFilling({type: 'main', uuid: 'uuid-1', _id: 'id-1', sortOrder: 1});
    const main2 = mockFilling({type: 'main', uuid: 'uuid-2', _id: 'id-2', sortOrder: 2});
    const sauce = mockFilling({type: 'sauce', uuid: 'uuid-3', _id: 'id-3', sortOrder: 3});
    const sauce2 = mockFilling({type: 'sauce', uuid: 'uuid-4', _id: 'id-4', sortOrder: 4});

    const state: Burger = {
      fillings: [main, main2, sauce, sauce2]
    };

    expect(
      reducer(state, setNewSortOrder({uuid: 'uuid-1', newSortOrder: 3}))
    ).toEqual({
      fillings: expect.arrayContaining([
        expect.objectContaining({uuid: 'uuid-2', sortOrder: 1}),
        expect.objectContaining({uuid: 'uuid-3', sortOrder: 2}),
        expect.objectContaining({uuid: 'uuid-1', sortOrder: 3}),
        expect.objectContaining({uuid: 'uuid-4', sortOrder: 4}),
      ])
    });

    expect(
      reducer(state, setNewSortOrder({uuid: 'uuid-4', newSortOrder: 2}))
    ).toEqual({
      fillings: expect.arrayContaining([
        expect.objectContaining({uuid: 'uuid-1', sortOrder: 1}),
        expect.objectContaining({uuid: 'uuid-4', sortOrder: 2}),
        expect.objectContaining({uuid: 'uuid-2', sortOrder: 3}),
        expect.objectContaining({uuid: 'uuid-3', sortOrder: 4}),
      ])
    });
  });

  it('should handle burger/clearBurger action', () => {
    const bun = mockBun();
    const main = mockFilling({type: 'main'});
    const sauce = mockFilling({type: 'sauce', uuid: 'another-uuid', _id: 'id-2', sortOrder: 1});

    const state: Burger = {
      bun: bun,
      fillings: [main, sauce]
    };

    expect(
      reducer(state, clearBurger())
    ).toEqual({
      fillings: []
    });
  });
})