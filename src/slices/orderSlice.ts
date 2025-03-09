import { orderBurgerApi, getOrderByNumberApi } from '../utils/burger-api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '../utils/types';

export interface IOrderState {
  loading: boolean;
  order: TOrder | null;
  error: string | undefined;
}

export const initialState: IOrderState = {
  loading: false,
  order: null,
  error: undefined
};

export const createOrder = createAsyncThunk('order/postOrder', orderBurgerApi);

export const fetchOrderByNumber = createAsyncThunk(
  'order/fetchOrderByNumber',
  async (number: number) => {
    const response = await getOrderByNumberApi(number);
    return response.orders[0];
  }
);

export const newOrderSlice = createSlice({
  name: 'newOrder',
  initialState,
  reducers: {
    clearOrder: (state) => (state = initialState)
  },
  selectors: {
    getOrderLoad: (state) => state.loading,
    getOrder: (state) => state.order
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload.order;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrderByNumber.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(fetchOrderByNumber.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(fetchOrderByNumber.pending, (state) => {
        state.loading = true;
      });
  }
});

export const { clearOrder } = newOrderSlice.actions;
export const { getOrderLoad, getOrder } = newOrderSlice.selectors;

export default newOrderSlice;
