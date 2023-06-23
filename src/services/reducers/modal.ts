import {
  IModalState,
  ModalAction,
  ModalActionTypes,
} from '../store/types/modal';

const initialState = {
  currentIngredient: null,
};

export const modalReducer = (
  state: IModalState = initialState,
  action: ModalAction
) => {
  switch (action.type) {
    case ModalActionTypes.SELECT_ITEM: {
      return {
        ...state,
        currentIngredient: action.item,
      };
    }
    case ModalActionTypes.CLEAR_ITEM: {
      return {
        ...state,
        currentIngredient: null,
      };
    }

    default: {
      return state;
    }
  }
};
