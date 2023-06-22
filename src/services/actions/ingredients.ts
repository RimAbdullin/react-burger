import { Dispatch } from 'redux';
import { getIngredientsRequest } from '../../utils/burger-api';
import { v4 } from 'uuid';
import {
  IngredientsAction,
  IngredientsActionTypes,
} from '../store/types/ingredients';

// thunk
export function getIngredientsItems(bunName: string) {
  return (dispatch: Dispatch<IngredientsAction>) => {
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
}
