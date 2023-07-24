import {
  IModalState,
  ModalAction,
  ModalActionTypes,
} from '../store/types/modal';

export const modalInitialState = {
  currentIngredient: null,
};

export const modalReducer = (
  state: IModalState = modalInitialState,
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
