import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder, TOrdersData } from '../utils/types';
import { getFeedsApi } from '../utils/burger-api';

export interface IFeedState {
  orders: Array<TOrder>;
  total: number;
  totalToday: number;
  isLoading: boolean;
  error?: string | undefined;
}

export const initialState: IFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  isLoading: true,
  error: undefined
};

export const getAllFeed = createAsyncThunk('orders/getAll', getFeedsApi);

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  selectors: {
    getOrdersFeed: (state) => state.orders,
    getCompletedFeed: (state) => state.total,
    getCompletedTodayFeed: (state) => state.totalToday
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllFeed.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(getAllFeed.rejected, (state, action) => {
        state.orders = [];
        state.total = 0;
        state.totalToday = 0;
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(getAllFeed.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
        state.isLoading = false;
      });
  }
});

export const { getOrdersFeed, getCompletedFeed, getCompletedTodayFeed } =
  feedSlice.selectors;
