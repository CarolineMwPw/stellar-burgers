import {
  ingredientSlice,
  initialState,
  getAllIngredients
} from '../ingredientSlice';
import { TIngredient } from '../../utils/types';

import { expect, test, describe } from '@jest/globals';

const mockIngredients = [
  {
    _id: '1',
    name: 'Булка',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
    __v: 0
  }
];

describe('test reducer ingredientSlice', () => {
  it('should handle getAllIngredients.pending', () => {
    const newState = ingredientSlice.reducer(
      initialState,
      getAllIngredients.pending('')
    );
    expect(newState).toEqual({
      ...initialState,
      loading: true,
      error: null
    });
  });

  it('should handle getAllIngredients.fulfilled', () => {
    const newState = ingredientSlice.reducer(
      { ...initialState, loading: true },
      getAllIngredients.fulfilled(mockIngredients, '')
    );
    expect(newState).toEqual({
      loading: false,
      ingredients: mockIngredients,
      error: null
    });
  });

  it('should handle getAllIngredients.rejected', () => {
    const error = new Error('Error');
    const newState = ingredientSlice.reducer(
      { ...initialState, loading: true },
      getAllIngredients.rejected(error, '')
    );
    expect(newState).toEqual({
      ...initialState,
      loading: false,
      error: error.message
    });
  });
});
