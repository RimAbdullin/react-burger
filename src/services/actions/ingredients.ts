import { Action, Dispatch, ActionCreator, AnyAction } from 'redux';
import { getIngredientsRequest } from '../../utils/burger-api';
import { v4 } from 'uuid';
import {
  IBurgerIngredientsState,
  IngredientsAction,
  IngredientsActionTypes,
} from '../store/types/ingredients';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

// thunk
export const getIngredientsItems = (
  bunName: string
): ThunkAction<void, IBurgerIngredientsState, void, IngredientsAction> => {
  // ThunkAction<void, IBurgerIngredientsState, void, IngredientsAction>
  return (
    dispatch: ThunkDispatch<IBurgerIngredientsState, void, IngredientsAction>
    // ThunkDispatch<IBurgerIngredientsState, void, IngredientsAction>
  ) => {
    dispatch({
      type: IngredientsActionTypes.GET_ITEMS_REQUEST,
    });
    getIngredientsRequest()
      .then((data) => {
        dispatch({
          type: IngredientsActionTypes.GET_ITEMS_SUCCESS,
          items: data.data,
          bunName: bunName,
        });
        dispatch({
          type: IngredientsActionTypes.SET_BUN,
          bunName: bunName,
          id: v4(),
        });
        // return data.data;
      })
      .catch((err) => {
        dispatch({
          type: IngredientsActionTypes.GET_ITEMS_FAILED,
        });
      });
  };
};
