import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';

import {
  constructorSlice,
  constructorReducer
} from '../slices/constructorSlice';

import { feedSlice } from '../slices/feedSlice';

import { ingredientSlice } from '../slices/ingredientSlice';

import { userOrdersHistory } from '../slices/ordersHistorySlice';
import { newOrderSlice } from '../slices/orderSlice';
import { userSlice, userSliceReducer } from '../slices/userSlice';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

export const rootReducer = combineReducers({
  [constructorSlice.name]: constructorSlice.reducer,
  [feedSlice.name]: feedSlice.reducer,
  [ingredientSlice.name]: ingredientSlice.reducer,
  [userOrdersHistory.name]: userOrdersHistory.reducer,
  [newOrderSlice.name]: newOrderSlice.reducer,
  [userSlice.name]: userSlice.reducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
