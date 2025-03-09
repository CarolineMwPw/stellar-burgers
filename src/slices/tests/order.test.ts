import { expect, test, describe } from '@jest/globals';
import {
  createOrder,
  fetchOrderByNumber,
  newOrderSlice,
  initialState,
  clearOrder
} from '../orderSlice';

describe('test reducer newOrderSlice', () => {
  test('call createOrder.pending', () => {
    const newState = newOrderSlice.reducer(
      initialState,
      createOrder.pending('pending', [])
    );
    expect(newState).toEqual({
      ...initialState,
      loading: true
    });
  });

  test('call createOrder.fulfilled', () => {
    const mockOrder = {
      _id: '1',
      ingredients: ['643d69a5c3f7b9001cfa093c', '643d69a5c3f7b9001cfa093c'],
      status: 'done',
      name: 'Краторный бургер',
      createdAt: '2024-09-04T06:22:21.104Z',
      updatedAt: '2024-09-04T06:22:21.577Z',
      number: 51930
    };
    const mockResponse = {
      success: true,
      order: mockOrder,
      name: 'Краторный бургер'
    };

    const newState = newOrderSlice.reducer(
      { ...initialState, loading: true },
      createOrder.fulfilled(mockResponse, '', [])
    );

    expect(newState).toEqual({
      loading: false,
      order: mockOrder,
      error: undefined
    });
  });

  test('call createOrder.rejected', () => {
    const errorMessage = 'Failed to create order';
    const newState = newOrderSlice.reducer(
      { ...initialState, loading: false },
      createOrder.rejected(new Error(errorMessage), '', [])
    );

    expect(newState).toEqual({
      ...initialState,
      loading: false,
      error: errorMessage
    });
  });

  test('call fetchOrderByNumber.pending', () => {
    const mockOrder = {
      _id: '2',
      ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa093d'],
      status: 'done',
      name: 'Флюоресцентный бургер',
      createdAt: '2024-10-24T16:18:26.559Z',
      updatedAt: '2024-10-24T16:18:27.439Z',
      number: 57396
    };
    const newState = newOrderSlice.reducer(
      initialState,
      fetchOrderByNumber.pending('', 1)
    );

    expect(newState).toEqual({
      ...initialState,
      loading: true
    });
  });

  test('call fetchOrderByNumber.fulfilled', () => {
    const mockOrder = {
      _id: '2',
      ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa093d'],
      status: 'done',
      name: 'Флюоресцентный бургер',
      createdAt: '2024-10-24T16:18:26.559Z',
      updatedAt: '2024-10-24T16:18:27.439Z',
      number: 57396
    };

    const newState = newOrderSlice.reducer(
      { ...initialState, loading: true },
      fetchOrderByNumber.fulfilled(mockOrder, '', 57396)
    );

    expect(newState).toEqual({
      loading: false,
      order: mockOrder,
      error: undefined
    });
  });

  test('call fetchOrderByNumber.rejected', () => {
    const errorMessage = 'Failed to fetch order';
    const newState = newOrderSlice.reducer(
      { ...initialState, loading: false },
      fetchOrderByNumber.rejected(new Error(errorMessage), '', 57396)
    );

    expect(newState).toEqual({
      ...initialState,
      loading: false,
      error: errorMessage
    });
  });

  test('clearOrder action', () => {
    const state = {
      loading: false,
      order: {
        _id: '1',
        ingredients: ['643d69a5c3f7b9001cfa093c', '643d69a5c3f7b9001cfa093c'],
        status: 'done',
        name: 'Краторный бургер',
        createdAt: '2024-09-04T06:22:21.104Z',
        updatedAt: '2024-09-04T06:22:21.577Z',
        number: 51930
      },
      error: undefined
    };

    const newState = newOrderSlice.reducer(state, clearOrder());

    expect(newState).toEqual(initialState);
  });
});
