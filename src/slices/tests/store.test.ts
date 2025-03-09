import store, { rootReducer } from '../../services/store';

// describe('тест root reducer', () => {
//   it('проверяет правильную инициализацию', () => {
//     const initialState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
//     expect(initialState).toEqual(store.getState());
//   });
// });

import { constructorSlice } from '../constructorSlice';
import { feedSlice } from '../feedSlice';
import { ingredientSlice } from '../ingredientSlice';
import { userOrdersHistory } from '../ordersHistorySlice';
import { newOrderSlice } from '../orderSlice';
import { userSlice } from '../userSlice';

describe('test init rootReducer', function () {
  test('is init correctly', function () {
    const testAction = { type: 'UNKNOWN_ACTION' }; // Неизвестное действие
    const state = rootReducer(undefined, testAction); // Инициализация состояния

    // Проверяем, что состояние каждого слайса инициализировано корректно
    expect(state).toEqual({
      [constructorSlice.name]: constructorSlice.reducer(undefined, testAction),
      [feedSlice.name]: feedSlice.reducer(undefined, testAction),
      [ingredientSlice.name]: ingredientSlice.reducer(undefined, testAction),
      [userOrdersHistory.name]: userOrdersHistory.reducer(
        undefined,
        testAction
      ),
      [newOrderSlice.name]: newOrderSlice.reducer(undefined, testAction),
      [userSlice.name]: userSlice.reducer(undefined, testAction)
    });
  });
});
