import { PayloadAction, createSlice, nanoid } from '@reduxjs/toolkit';
import { TConstructorIngredient } from '../utils/types';

type TConstructorState = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
};

export const initialState: TConstructorState = {
  bun: null,
  ingredients: []
};

export const constructorSlice = createSlice({
  name: 'constructorIngredient',
  initialState,
  reducers: {
    addItem: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TConstructorIngredient) => {
        const id = nanoid();
        return { payload: { ...ingredient, id } };
      }
    },
    deleteItem: (state, action: PayloadAction<TConstructorIngredient>) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== action.payload.id
      );
    },
    clearConstructor: (state) => (state = initialState),
    moveItem: (
      state,
      action: PayloadAction<{ fromIndex: number; toIndex: number }>
    ) => {
      const { fromIndex, toIndex } = action.payload;
      const [removed] = state.ingredients.splice(fromIndex, 1);
      state.ingredients.splice(toIndex, 0, removed);
    }
  },
  selectors: {
    selectItems: (state: TConstructorState) => state
  }
});

export const { addItem, deleteItem, clearConstructor, moveItem } =
  constructorSlice.actions;
export const constructorSelector = constructorSlice.selectors;

export const constructorReducer = constructorSlice.reducer;

// updateAll: (state, action: PayloadAction<TConstructorIngredient[]>) => {
//   state.ingredients = action.payload;
// }
