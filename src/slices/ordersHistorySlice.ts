import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getOrdersApi } from '../utils/burger-api';
import { TOrder } from '../utils/types';

export interface IOrdersState {
  orders: TOrder[];
  loading: boolean;
}

export const initialState: IOrdersState = {
  orders: [],
  loading: true
};

export const getUserOrders = createAsyncThunk('order/getOrders', async () =>
  getOrdersApi()
);

export const userOrdersHistory = createSlice({
  name: 'ordersHistory',
  initialState,
  reducers: {},
  selectors: {
    getOrdersHistory: (state) => state.orders
    // ordersLoading: (state) => state.loading
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.loading = false;
      })

      .addCase(getUserOrders.rejected, (state) => {
        state.loading = false;
      });
  }
});

// export const { getOrdersHistory, ordersLoading } = userOrdersHistory.selectors;
export const { getOrdersHistory } = userOrdersHistory.selectors;

export default userOrdersHistory;
