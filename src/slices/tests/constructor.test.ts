import {
  addItem,
  constructorSlice,
  deleteItem,
  initialState,
  constructorReducer,
  clearConstructor,
  moveItem
} from '../constructorSlice';

// import { TConstructorIngredient } from '@utils-types';

const testBun: TConstructorIngredient = {
  _id: '1',
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
  id: 'KeuPrcZ0mHFWrPH14kkH0'
};

const testIngredient: TConstructorIngredient = {
  _id: 'UgWyP-HgX4rrf08o9rGjC',
  name: 'Биокотлета из марсианской Магнолии',
  type: 'main',
  proteins: 420,
  fat: 142,
  carbohydrates: 242,
  calories: 4242,
  price: 424,
  image: 'https://code.s3.yandex.net/react/code/meat-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',

  id: '2'
};

const testIngredientOne: TConstructorIngredient = {
  calories: 100,
  carbohydrates: 100,
  fat: 99,
  image: 'https://code.s3.yandex.net/react/code/sauce-01.png',
  image_large: 'https://code.s3.yandex.net/react/code/sauce-01-large.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/sauce-01-mobile.png',
  name: 'Соус с шипами Антарианского плоскоходца',
  price: 88,
  proteins: 101,
  type: 'sauce',
  _id: '643d69a5c3f7b9001cfa0945',
  id: '1'
};

const testIngredients: TConstructorIngredient[] = [
  {
    _id: 'FnShPJQRTGGxoLrzairZI',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',

    id: '2'
  },
  {
    calories: 100,
    carbohydrates: 100,
    fat: 99,
    image: 'https://code.s3.yandex.net/react/code/sauce-01.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-01-large.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-01-mobile.png',
    name: 'Соус с шипами Антарианского плоскоходца',
    price: 88,
    proteins: 101,
    type: 'sauce',
    _id: '643d69a5c3f7b9001cfa0945',
    id: '4'
  }
];

describe('test reducer constructorSlice', () => {
  it('should add ingredient', () => {
    const newState = constructorSlice.reducer(
      initialState,
      addItem(testIngredient)
    );
    expect(newState.ingredients).toHaveLength(1);
    expect(newState.ingredients[0].name).toEqual(testIngredient.name);
  });

  it('should remove ingredient', () => {
    const state = {
      bun: null,
      ingredients: [testIngredient]
    };
    const newState = constructorSlice.reducer(
      state,
      deleteItem(testIngredient)
    );
    expect(newState.ingredients).toHaveLength(0);
  });

  it('should add bun', () => {
    const newState = constructorSlice.reducer(initialState, addItem(testBun));
    expect(newState.bun?._id).toEqual(testBun._id);
  });

  it('should remove bun', () => {
    const state = {
      bun: null,
      ingredients: []
    };
    const newState = constructorSlice.reducer(state, deleteItem(testBun));
    expect(newState.bun).toBeNull();
  });

  it('should reset the state to initial state', () => {
    const state = {
      bun: testBun,
      ingredients: [testIngredient]
    };
    const newState = constructorReducer(state, clearConstructor());
    expect(newState).toEqual(initialState);
  });

  // it('should move ingredient', () => {
  //   const state = {
  //     bun: null,
  //     ingredients: [testIngredientOne, testIngredient]
  //   };
  //   const newState = constructorReducer(
  //     state,
  //     moveItem({ fromIndex: 0, toIndex: 1 })
  //   );
  //   expect(newState.ingredients[0].id).toBe('2');
  //   expect(newState.ingredients[1].id).toBe('1');
  // });
  it('должен переместить ингредиент с позиции 0 на позицию 1', () => {
    // Начальное состояние с двумя ингредиентами
    const state = {
      ...initialState,
      ingredients: testIngredients
    };

    // Действие: перемещаем ингредиент с индексом 0 на индекс 1
    const action = moveItem({ fromIndex: 0, toIndex: 1 });
    const newState = constructorReducer(state, action);

    // Ожидаемый результат: ингредиенты поменялись местами
    expect(newState.ingredients).toEqual([
      testIngredients[1],
      testIngredients[0]
    ]);
  });

  it('должен переместить ингредиент с позиции 1 на позицию 0', () => {
    // Начальное состояние с двумя ингредиентами
    const state = {
      ...initialState,
      ingredients: testIngredients
    };

    // Действие: перемещаем ингредиент с индексом 1 на индекс 0
    const action = moveItem({ fromIndex: 1, toIndex: 0 });
    const newState = constructorReducer(state, action);

    // Ожидаемый результат: ингредиенты поменялись местами
    expect(newState.ingredients).toEqual([
      testIngredients[1],
      testIngredients[0]
    ]);
  });

  it('не должен изменить массив, если индексы одинаковые', () => {
    // Начальное состояние с двумя ингредиентами
    const state = {
      ...initialState,
      ingredients: testIngredients
    };

    // Действие: перемещаем ингредиент с индексом 0 на индекс 0 (без изменений)
    const action = moveItem({ fromIndex: 0, toIndex: 0 });
    const newState = constructorReducer(state, action);

    // Ожидаемый результат: массив не изменился
    expect(newState.ingredients).toEqual(testIngredients);
  });
});

import { TConstructorIngredient, TIngredient } from '../../utils/types';

export const ingredientMock: TIngredient = {
  calories: 100,
  carbohydrates: 100,
  fat: 99,
  image: 'https://code.s3.yandex.net/react/code/sauce-01.png',
  image_large: 'https://code.s3.yandex.net/react/code/sauce-01-large.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/sauce-01-mobile.png',
  name: 'Соус с шипами Антарианского плоскоходца',
  price: 88,
  proteins: 101,
  type: 'sauce',
  _id: '643d69a5c3f7b9001cfa0945'
};

export const bunIngredientMock: TIngredient = {
  calories: 643,
  carbohydrates: 85,
  fat: 26,
  image: 'https://code.s3.yandex.net/react/code/bun-01.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
  name: 'Флюоресцентная булка R2-D3',
  price: 988,
  proteins: 44,
  type: 'bun',
  _id: '643d69a5c3f7b9001cfa093d'
};

export const ingredientsConstructorMock: TConstructorIngredient[] = [
  {
    calories: 100,
    carbohydrates: 100,
    fat: 99,
    image: 'https://code.s3.yandex.net/react/code/sauce-01.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-01-large.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-01-mobile.png',
    name: 'Соус с шипами Антарианского плоскоходца',
    price: 88,
    proteins: 101,
    type: 'sauce',
    _id: '643d69a5c3f7b9001cfa0945',
    id: '123'
  },
  {
    calories: 4242,
    carbohydrates: 242,
    fat: 142,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    name: 'Биокотлета из марсианской Магнолии',
    price: 424,
    proteins: 420,
    type: 'main',
    _id: '643d69a5c3f7b9001cfa0941',
    id: '124'
  }
];

export const deletedIngredientMock: TConstructorIngredient = {
  calories: 100,
  carbohydrates: 100,
  fat: 99,
  image: 'https://code.s3.yandex.net/react/code/sauce-01.png',
  image_large: 'https://code.s3.yandex.net/react/code/sauce-01-large.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/sauce-01-mobile.png',
  name: 'Соус с шипами Антарианского плоскоходца',
  price: 88,
  proteins: 101,
  type: 'sauce',
  _id: '643d69a5c3f7b9001cfa0945',
  id: '123'
};

export const deleteConstructorMock: TConstructorIngredient[] = [
  {
    calories: 4242,
    carbohydrates: 242,
    fat: 142,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    name: 'Биокотлета из марсианской Магнолии',
    price: 424,
    proteins: 420,
    type: 'main',
    _id: '643d69a5c3f7b9001cfa0941',
    id: '124'
  }
];

export const moveDownConstructorMock: TConstructorIngredient[] = [
  {
    calories: 4242,
    carbohydrates: 242,
    fat: 142,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    name: 'Биокотлета из марсианской Магнолии',
    price: 424,
    proteins: 420,
    type: 'main',
    _id: '643d69a5c3f7b9001cfa0941',
    id: '124'
  },
  {
    calories: 100,
    carbohydrates: 100,
    fat: 99,
    image: 'https://code.s3.yandex.net/react/code/sauce-01.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-01-large.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-01-mobile.png',
    name: 'Соус с шипами Антарианского плоскоходца',
    price: 88,
    proteins: 101,
    type: 'sauce',
    _id: '643d69a5c3f7b9001cfa0945',
    id: '123'
  }
];
