import { orderInitialState, orderReducer as reducer } from './order';
import * as types from '../store/types/order';

describe('ingredients reducer', () => {
  const item = {
    _id: '60666c42cc7b410027a1a9bc',
    name: 'Плоды Фалленианского дерева',
    type: 'main',
    proteins: 20,
    fat: 5,
    carbohydrates: 55,
    calories: 77,
    price: 874,
    image: 'https://code.s3.yandex.net/react/code/sp_1.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sp_1-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sp_1-large.png',
    __v: 0,
  };

  it('Корректное состояние initial state редюсера', () => {
    expect(reducer(undefined, {} as any)).toEqual(orderInitialState);
  });

  it('GET_ORDER_REQUEST', () => {
    expect(
      reducer(
        {
          ...orderInitialState,
        },
        {
          type: types.OrderActionTypes.GET_ORDER_REQUEST,
        }
      )
    ).toEqual({
      ...orderInitialState,
      orderRequest: true,
      orderFailed: false,
    });
  });

  it('GET_ORDER_SUCCESS', () => {
    expect(
      reducer(
        {
          ...orderInitialState,
        },
        {
          type: types.OrderActionTypes.GET_ORDER_SUCCESS,
          orderNumber: 1,
        }
      )
    ).toEqual({
      ...orderInitialState,
      orderRequest: false,
      orderFailed: false,
      orderNumber: 1,
    });
  });

  it('GET_ORDER_FAILED', () => {
    expect(
      reducer(
        {
          ...orderInitialState,
        },
        {
          type: types.OrderActionTypes.GET_ORDER_FAILED,
        }
      )
    ).toEqual({
      ...orderInitialState,
      orderRequest: false,
      orderFailed: true,
    });
  });

  it('SET_ORDER_NUMBER', () => {
    expect(
      reducer(
        {
          ...orderInitialState,
        },
        {
          type: types.OrderActionTypes.SET_ORDER_NUMBER,
          orderNumber: 1,
        }
      )
    ).toEqual({
      ...orderInitialState,
      orderNumber: 1,
    });
  });
});
