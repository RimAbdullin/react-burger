import { modalInitialState, modalReducer as reducer } from './modal';
import * as types from '../store/types/modal';

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

  it('Корректное состояние initial state редюсера modalReducer', () => {
    expect(reducer(undefined, {} as any)).toEqual(modalInitialState);
  });

  it('SELECT_ITEM', () => {
    expect(
      reducer(
        {
          currentIngredient: null,
        } as types.IModalState,
        {
          type: types.ModalActionTypes.SELECT_ITEM,
          item: item,
        }
      )
    ).toEqual({
      currentIngredient: item,
    });
  });

  it('CLEAR_ITEM', () => {
    expect(
      reducer(
        {
          currentIngredient: item,
        } as types.IModalState,
        {
          type: types.ModalActionTypes.CLEAR_ITEM,
        }
      )
    ).toEqual({
      currentIngredient: null,
    });
  });
});
