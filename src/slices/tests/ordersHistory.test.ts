import { expect, test, describe } from '@jest/globals';
import {
  getUserOrders,
  userOrdersHistory,
  initialState
} from '../ordersHistorySlice';

describe('test reducer userOrdersHistory', () => {
  test('call getUserOrders.pending', () => {
    const newState = userOrdersHistory.reducer(
      initialState,
      getUserOrders.pending('')
    );

    expect(newState).toEqual({
      ...initialState,
      loading: true
    });
  });

  test('call getUserOrders.fulfilled', () => {
    const mockOrders = [
      {
        _id: '1',
        ingredients: ['643d69a5c3f7b9001cfa093c', '643d69a5c3f7b9001cfa093c'],
        status: 'done',
        name: 'Краторный бургер',
        createdAt: '2024-09-04T06:22:21.104Z',
        updatedAt: '2024-09-04T06:22:21.577Z',
        number: 51930
      },
      {
        _id: '2',
        ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa093d'],
        status: 'done',
        name: 'Флюоресцентный бургер',
        createdAt: '2024-10-24T16:18:26.559Z',
        updatedAt: '2024-10-24T16:18:27.439Z',
        number: 57396
      }
    ];

    const newState = userOrdersHistory.reducer(
      { ...initialState, loading: true },
      getUserOrders.fulfilled(mockOrders, '')
    );

    expect(newState).toEqual({
      loading: false,
      orders: mockOrders
    });
  });

  test('call getUserOrders.rejected', () => {
    const newState = userOrdersHistory.reducer(
      { ...initialState, loading: true },
      getUserOrders.rejected(null, '')
    );

    expect(newState).toEqual({
      ...initialState,
      loading: false
    });
  });
});
