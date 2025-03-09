import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '../utils/types';
import { getIngredientsApi } from '../utils/burger-api';

export interface IIngredientsState {
  ingredients: TIngredient[];
  loading: boolean;
  error?: string | null | undefined;
}

export const initialState: IIngredientsState = {
  ingredients: [],
  loading: false,
  error: null
};

export const getAllIngredients = createAsyncThunk(
  'ingredients/getIngredients',
  getIngredientsApi
);

export const ingredientSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    getIngredientsState: (state) => state,
    getIngredientsLoadingState: (state) => state.loading,
    getIngredients: (state) => state.ingredients,
    getIngredientError: (state) => state.error,
    getIngredientById: (state) => (id: string) =>
      state.ingredients.find((ingredient) => ingredient._id === id)
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllIngredients.pending, (state) => {
        console.log('Fetching ingredients...');
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllIngredients.rejected, (state, action) => {
        console.error('Error fetching ingredients:', action.error);
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getAllIngredients.fulfilled, (state, action) => {
        console.log('Ingredients loaded:', action.payload);
        state.loading = false;
        state.ingredients = action.payload;
      });
  }
});

export const {
  getIngredientsState,
  getIngredientsLoadingState,
  getIngredients,
  getIngredientError,

  getIngredientById
} = ingredientSlice.selectors;

export default ingredientSlice;
